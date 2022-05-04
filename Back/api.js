// Zmienne env
require('dotenv').config()
const DB_URL = process.env.DB_URL;

// Mongodb 
const mongoose = require('mongoose')
const Advert = require('./Models/Advert')
const User = require('./Models/User')
mongoose.connect(DB_URL).catch((err) => console.error(err))

// Express 
const express = require('express');
const { request } = require('express');
const app = express()
const port = 3000


app.post('/register', (req, res) => {
  const registerEmail = req.body.email;
  const registerPassword = req.body.password;

  const userToRegister = new User({
    email: registerEmail,
    password: registerPassword
  })

  User.findOne({ email: registerEmail }, (err, user) => {
    if (user) return res.status(404).send('Użytkownik z takim mailem już istnieje')
  })

  userToRegister.save((err) => console.log(err))
  res.status(200).send('Użytkownik zarejestrowany')
})

app.post('/login', (req, res) => {
  const loginEmail = req.body.email;
  const loginPassword = req.body.password;
})

app.listen(port, () => {
  console.log('Serwer na porcie ' + port);
});