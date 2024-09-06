const mongoose = require('mongoose');


const nameSchema = new mongoose.Schema({
  name: String,
});


const Data = mongoose.model('Data', nameSchema);

module.exports = Data;
