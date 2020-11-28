const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Retrieve all possible roles for the user.
 */
router.get('/', (req, res) => {
  const queryForAllRoles = `SELECT * FROM "roles" ORDER BY "label" ASC;`;

  pool
    .query(queryForAllRoles)
    .then((dbResp) => {
      res.send(dbResp.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
