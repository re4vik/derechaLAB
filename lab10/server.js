const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// Middleware для парсингу JSON
app.use(express.json());

// Налаштування підключення до PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'library',
  password: '0507107511Pasha',
  port: 5432,
});

// CREATE (POST) - Додати нову книгу
app.post('/books', async (req, res) => {
  try {
    const { title, author, published_year } = req.body;
    const query = 'INSERT INTO books (title, author, published_year) VALUES ($1, $2, $3) RETURNING *';
    const values = [title, author, published_year];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Помилка при додаванні книги' });
  }
});

// READ ALL (GET) - Отримати всі книги
app.get('/books', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Помилка при отриманні книг' });
  }
});

// READ ONE (GET) - Отримати книгу за ID
app.get('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Книга не знайдена' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Помилка при отриманні книги' });
  }
});

// UPDATE (PUT) - Оновити книгу за ID
app.put('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, published_year } = req.body;
    const query = 'UPDATE books SET title = $1, author = $2, published_year = $3 WHERE id = $4 RETURNING *';
    const values = [title, author, published_year, id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Книга не знайдена' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Помилка при оновленні книги' });
  }
});

// DELETE (DELETE) - Видалити книгу за ID
app.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Книга не знайдена' });
    }
    res.json({ message: 'Книга успішно видалена', book: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Помилка при видаленні книги' });
  }
});

// Тестовий маршрут для перевірки підключення до БД
app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    res.send(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
});

// Обробка неіснуючих маршрутів
app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не знайдено' });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущено на http://localhost:${port}`);
});
