const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

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
        // TODO - STEP 2: create a new temporary user
        // TODO - STEP 3: send a message to the temporary user (nodemailer)
        res.sendStatus(201);
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
  // TODO - STEP 2: send back the user info
  // TODO - STEP 3: reject the user if no match is found
  res.send({});
});

// PROCESS STEP 3: save the username & password for the pre-registered user (PUT) [public]
router.put('/register/:tempId', (req, res) => {
  // TODO - STEP 1: make sure a user matches tempId
  // TODO - STEP 2: update specific temporary user with username & password (remove temp_reg_id)
  // TODO - STEP 3: reject when there is no match
  res.sendStatus(200);
});

module.exports = router;
