const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const { generateUUID } = require('../services/uuid.service');
const nodemailer = require('nodemailer');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/unique-unicorn', (req, res, next) => {
  const { username, first_name, last_name, email, role_id } = req.body;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password, first_name, last_name, email, role_id)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
  pool
    .query(queryText, [
      username,
      password,
      first_name,
      last_name,
      email,
      role_id,
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

//
// NEW REGISTRATION PROCESS
// ------------------------------

// PROCESS STEP 1: admin create a new user (POST) [secure]
router.post('/pre-register', rejectUnauthenticated, (req, res) => {
  const queryForUserRole = `SELECT * FROM "user"
  JOIN "roles" ON "user".role_id = "roles".id
  WHERE "user".id = $1;`;
  pool
    .query(queryForUserRole, [req.user.id])
    .then((dbResp) => {
      const userWithRole = dbResp.rows[0];

      if (userWithRole.access_level === 0) {
        // TODO - STEP 1: create temporary registration id
        const tempRegId = generateUUID();
        console.log('UUID: ', tempRegId);
        // TODO - STEP 2: create a new temporary user
        const { first_name, last_name, role_id, email } = req.body;
        const queryCreateTempUser = `INSERT INTO "user" (first_name, last_name, role_id, email, temp_reg_id)
        VALUES ($1, $2, $3, $4, $5);`;

        pool
          .query(queryCreateTempUser, [
            first_name,
            last_name,
            role_id,
            email,
            tempRegId,
          ])
          .then((dbResp) => {
            // TODO - STEP 3: send a message to the temporary user (nodemailer)
            const transportConfig = {
              service: 'gmail',
              auth: {
                user: process.env.MAILER_EMAIL,
                pass: process.env.MAILER_EMAIL_PASS,
              },
            };
            let transporter = nodemailer.createTransport(transportConfig);

            // create link url for user
            let registerLinkBase = process.env.HOST_ENV;
            const registerLink = `${registerLinkBase}/#/register/${tempRegId}`;

            const mailOptions = {
              from: req.user.email, // sender address
              to: email, // list of receivers
              subject: 'Welcome to The System', // Subject line
              html: `<div>
                <h1>Welcome</h1>
                <p>Please finalize your registration to The System by following the link below</p>
                <a href="${registerLink}" target="_blank">Continue Registration</a>
              </div>`, // plain text body
            };
            transporter.sendMail(mailOptions, (err, info) => {
              if (err != null) {
                res.sendStatus(500);
                return;
              }

              res.sendStatus(201);
            });
          })
          .catch((err) => {
            console.log(err);
            res.sendStatus(500);
          });
        return;
      }

      console.log('not admin');
      res.sendStatus(403);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(403);
    });
});

// PROCESS STEP 2: validate that a user is pre-registered (GET) [public]
router.get('/register/:tempId', (req, res) => {
  // TODO - STEP 1: GET temporary user info matching tempId
  const queryForTempUser = `SELECT id, first_name, last_name, email FROM "user"
  WHERE temp_reg_id = $1;`;

  pool
    .query(queryForTempUser, [req.params.tempId])
    .then((dbResp) => {
      // TODO - STEP 2: send back the user info
      const tempUser = dbResp.rows[0];

      if (tempUser != null) {
        res.send(tempUser);
        // terminate function early
        return;
      }

      // TODO - STEP 3: reject the user if no match is found
      res.sendStatus(403);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// PROCESS STEP 3: save the username & password for the pre-registered user (PUT) [public]
router.put('/register/:tempId', (req, res) => {
  // TODO - STEP 1: make sure a user matches tempId
  // TODO - STEP 2: update specific temporary user with username & password (remove temp_reg_id)
  // TODO - STEP 3: reject when there is no match
  res.sendStatus(200);
});

module.exports = router;
