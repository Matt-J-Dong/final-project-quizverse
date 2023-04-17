const express = require('express');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const router = express.Router();
const jwtSecret = '4j92$ds#Dsd*&2dSscS0!29^fS0s8y&2e9@';

const usersFilePath = path.join(__dirname, '../public/users.json');

function authenticateJWT(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).send({ status: 'error', message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ status: 'error', message: 'Invalid token.' });
    }
    req.user = decoded;
    next();
  });
}

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
      return;
    }

    const users = JSON.parse(data);
    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      const token = jwt.sign({ username: foundUser.username }, jwtSecret, { expiresIn: '1h' });
      res.send({ status: 'success', message: 'Logged in successfully', token });
    } else {
      res.status(401).send({ status: 'error', message: 'Invalid username or password' });
    }
  });
});

router.post('/register', (req, res) => {
  const { username, password } = req.body;

  fs.readFile ( usersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
      return;
    }

    const users = JSON.parse(data);
    const existingUser = users.find((user) => user.username === username);

    if (existingUser) {
      res.status(400).send({ status: 'error', message: 'Username already exists' });
      return;
    }

    users.push({ username, password });
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal server error');
        return;
      }

      res.send({ status: 'success', message: 'User registered successfully' });
    });
  });
});

router.post('/logout', authenticateJWT, (req, res) => {
  res.send({ message: 'Logged out!' });
});

module.exports = router;

