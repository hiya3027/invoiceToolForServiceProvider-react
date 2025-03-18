const pool = require("../db");

// Create User
const createUser = async (name, email, password) => {
  const query = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3) RETURNING *`;
  const values = [name, email, password];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Find User by Email
const findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

module.exports = { createUser, findUserByEmail };