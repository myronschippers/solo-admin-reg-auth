const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * Retrieve all roles that are available
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryForAllRoles = `SELECT * FROM "roles" ORDER BY "label" ASC;`;

  pool
    .query(queryForAllRoles)
    .then((dbResponse) => {
      res.send(dbResponse.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
