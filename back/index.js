const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');
require('./db'); // Importa a conexão com o banco

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // Permite JSON no body da requisição

app.use('/tasks', taskRoutes); // Prefixo para as rotas

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
