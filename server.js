const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecommerce'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Users CRUD operations
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(results[0]);
  });
});

app.post('/users', (req, res) => {
  const { name, email, password } = req.body;
  connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: result.insertId, name, email });
  });
});

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  connection.query('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', [name, email, password, id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id, name, email });
  });
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'User deleted successfully' });
  });
});

// Products CRUD operations
app.get('/products', (req, res) => {
  connection.query('SELECT * FROM products', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(results[0]);
  });
});

app.post('/products', (req, res) => {
  const { name, description, price, stock } = req.body;
  connection.query('INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)', [name, description, price, stock], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: result.insertId, name, description, price, stock });
  });
});

app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;
  connection.query('UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?', [name, description, price, stock, id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id, name, description, price, stock });
  });
});

app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM products WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Product deleted successfully' });
  });
});

// Orders CRUD operations
app.get('/orders', (req, res) => {
  connection.query('SELECT * FROM orders', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.get('/orders/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM orders WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    res.json(results[0]);
  });
});

app.post('/orders', (req, res) => {
  const { user_id, total_amount, status } = req.body;
  connection.query('INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)', [user_id, total_amount, status], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: result.insertId, user_id, total_amount, status });
  });
});

app.put('/orders/:id', (req, res) => {
  const { id } = req.params;
  const { user_id, total_amount, status } = req.body;
  connection.query('UPDATE orders SET user_id = ?, total_amount = ?, status = ? WHERE id = ?', [user_id, total_amount, status, id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id, user_id, total_amount, status });
  });
});

app.delete('/orders/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM orders WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Order deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});