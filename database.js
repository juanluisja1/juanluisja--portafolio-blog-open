// database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('blog.db');

db.serialize(() => {
  // Create a table for users
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT)');

  // Create a table for posts
  db.run('CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT NOT NULL)');

  // Create a table for comments, with foreign keys to users and posts
  db.run('CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, postId INTEGER, comment TEXT, FOREIGN KEY (postId) REFERENCES posts(id))');
});

module.exports = db;