// main.js
let express = require('express');

// database.js

let db = require('./database.js').db;




const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/get-comments', (req, res) => {
  db.all('SELECT * FROM comments', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(rows);
  });
});

app.post('/add-comment', (req, res) => {
  const { name, comment } = req.body;
  if (!name || !comment) {
    res.status(400).json({ error: 'Name and Comment are required' });
    return;
  }

  db.run('INSERT INTO comments (name, comment) VALUES (?, ?)', [name, comment], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.status(201).json({ message: 'Comment added successfully' });
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
