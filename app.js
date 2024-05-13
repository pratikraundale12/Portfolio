// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/contactDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// MongoDB schema and model
const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  message: String
});
const Contact = mongoose.model('Contact', contactSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.post('/api/contact', (req, res) => {
  const { firstName, lastName, phone, email, message } = req.body;
  const newContact = new Contact({
    firstName,
    lastName,
    phone,
    email,
    message
  });
  newContact.save((err, contact) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while saving the contact.' });
    } else {
      res.status(200).json(contact);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
