const Task = require('../models/task');

// Buscar todas as tarefas
exports.getAll = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

// Criar nova tarefa
exports.create = async (req, res) => {
  const newTask = await Task.create(req.body);
  res.json(newTask);
};

// Deletar tarefa por ID
exports.remove = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).end();
};


