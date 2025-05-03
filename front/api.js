const API_URL = 'http://localhost:3000/tasks'; // URL da tua API

// Buscar todas as tarefas
export async function buscarTarefas() {
  const res = await fetch(API_URL);
  return res.json();
}

// Criar nova tarefa
export async function criarTarefa(tarefa) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tarefa)
  });
  return res.json();
}

// Deletar tarefa
export async function deletarTarefa(id) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
}
