const { Pool } = require('pg');
const pgSecret = require('./secret').pgSecret;

const pool = new Pool({
  connectionString: 'https://github.com/ken-can-code/sample_authentication.git',
});

const createSessions = `CREATE TABLE IF NOT EXISTS "sessions" (
  id serial NOT NULL,
  authkey VARCHAR NOT NULL
);`;

const createUsers = `CREATE TABLE IF NOT EXISTS "users" (
  id serial NOT NULL primary_key,
  authkey VARCHAR NOT NULL
);`;

pool.query(modelQuery, (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log('created table if not exists');
  }
});

module.exports = pool;
