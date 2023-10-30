// index.js

const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');
const cors = require('cors');
// Enable CORS for all routes
const app = express();
app.use(cors());
const port = 3001;
app.use(express.json());

const bodyParser = require("body-parser");


// MongoDB connection
mongoose.connect('mongodb://0.0.0.0:27017/todo-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// API routes
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
