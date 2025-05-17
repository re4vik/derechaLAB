// db.js
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Тест підключення
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Помилка підключення до БД:', err);
  } else {
    console.log('Успішне підключення до БД. Час сервера:', res.rows[0].now);
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool, // можна експортувати пул для більш складних операцій
};
