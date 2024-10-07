const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());
app.use(cors());

const playerRouter = require('./controllers/players');
const usersRouter = require('./controllers/users');
const teamRouter = require('./controllers/teams');

app.use('/players', playerRouter);
app.use('/users', usersRouter);
app.use('/teams', teamRouter)

app.listen(3000, () => {
  console.log('The express app is ready!');
});