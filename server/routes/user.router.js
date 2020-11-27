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
router.post('/register', (req, res, next) => {
  const {
    // extracting values from re.body
    username,
    email,
    first_name,
    last_name,
    role_id,
  } = req.body;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password, email, first_name, last_name, role_id)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
  pool
    .query(queryText, [
      // data from client
      username,
      password,
      email,
      first_name,
      last_name,
      role_id,
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// pulled from https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
function generateUUID() {
  // Public Domain/MIT
  let d = new Date().getTime(); //Timestamp
  let d2 = (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

// Save a new user and send them a notification
router.post('/register/internal', rejectUnauthenticated, (req, res) => {
  // STEP 1: generate unique id for temporary user
  const uuidForReg = generateUUID();
  console.log('UUID:', uuidForReg);
  // STEP 2: create new user with information provided and temp unique id
  // STEP 3: send an email off to the new user
  // STEP 4: if there is not enough info or an error saving user surface and error

  res.sendStatus(201);
});

// GET a user that has the matched temporary ID
router.get('/register/:tempId', (req, res) => {
  // STEP 1: see if there is a user that matches the "tempId"
  // STEP 2: send back user info for matched user
  // STEP 3: if there is no match then send back error 403
});

// Update USER registration with password and username
router.put('/register/:tempId', (req, res) => {
  // STEP 1: does the a user exist with this "tempId"
  // STEP 2: update user with new username and password
  // STEP 3: if there is no match then send back error 403
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

module.exports = router;
