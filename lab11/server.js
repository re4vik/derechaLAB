require('dotenv').config();
const express = require('express');
const db = require('./db'); // Імпортуємо наше підключення з db.js
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Маршрути

// GET /api/students - Отримати всіх студентів
app.get('/api/students', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM students');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Помилка сервера при отриманні студентів' });
  }
});

// GET /api/students/:id - Отримати студента за ID
app.get('/api/students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM students WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Студент не знайдений' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Помилка сервера при пошуку студента' });
  }
});

// POST /api/students - Додати нового студента
app.post('/api/students', async (req, res) => {
  const { name, age, major } = req.body;
  
  // Валідація вхідних даних
  if (!name || !age || !major) {
    return res.status(400).json({ error: 'Усі поля (name, age, major) обов\'язкові' });
  }

  try {
    const result = await db.query(
      'INSERT INTO students (name, age, major) VALUES ($1, $2, $3) RETURNING *',
      [name, age, major]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Помилка сервера при додаванні студента' });
  }
});

// PUT /api/students/:id - Оновити студента
app.put('/api/students/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, major } = req.body;

  if (!name || !age || !major) {
    return res.status(400).json({ error: 'Усі поля (name, age, major) обов\'язкові' });
  }

  try {
    const result = await db.query(
      'UPDATE students SET name = $1, age = $2, major = $3 WHERE id = $4 RETURNING *',
      [name, age, major, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Студент не знайдений' });
    }
    
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Помилка сервера при оновленні студента' });
  }
});

// DELETE /api/students/:id - Видалити студента
app.delete('/api/students/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await db.query(
      'DELETE FROM students WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Студент не знайдений' });
    }
    
    res.status(200).json({ 
      message: 'Студент успішно видалений',
      deletedStudent: result.rows[0] 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Помилка сервера при видаленні студента' });
  }
});

// Обробка неіснуючих маршрутів
app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не знайдений' });
});

// Обробка помилок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Щось пішло не так!' });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущено на http://localhost:${port}`);
  console.log('Використовуємо підключення до БД з db.js');
});
