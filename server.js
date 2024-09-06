const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Data = require('./model'); // Import the Data model

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://322103312083:951509290@cluster0.8iess.mongodb.net/movie', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// POST endpoint to save data
app.post('/name', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  console.log('Received name:', name);

  try {
    const newData = new Data({ name });
    await newData.save();

    console.log('Data saved:', newData);
    res.status(201).json(newData);
  } catch (err) {
    console.error('Error saving data:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
