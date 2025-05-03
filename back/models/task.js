const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  titulo: String,
  data: String,
  hora: String,
  categoria: String
});

module.exports = mongoose.model('Task', TaskSchema);
