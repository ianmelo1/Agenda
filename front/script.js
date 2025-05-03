import { buscarTarefas, criarTarefa, deletarTarefa } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const tarefas = await buscarTarefas();
  tarefas.forEach(adicionarNaTela);
  renderizarCalendario(dataAtual); // chama o calendário
});

// Define o input de data como hoje (com ano fixo em 2025)
document.addEventListener('DOMContentLoaded', () => {
  const hoje = new Date();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  const ano = hoje.getFullYear();
  const dataFormatada = `${ano}-${mes}-${dia}`;
  document.getElementById('data').value = dataFormatada;
});

document.getElementById('form-tarefa').addEventListener('submit', async function (e) {
  e.preventDefault();

  const tarefa = {
    titulo: document.getElementById('titulo').value,
    data: document.getElementById('data').value,
    hora: document.getElementById('hora').value,
    categoria: document.getElementById('categoria').value,
  };

  const nova = await criarTarefa(tarefa);
  adicionarNaTela(nova);
  this.reset();

  const hoje = new Date();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  const ano = '2025';
  const dataFormatada = `${ano}-${mes}-${dia}`;
  document.getElementById('data').value = dataFormatada;
});

function adicionarNaTela(tarefa) {
  const lista = document.getElementById('lista-tarefas');

  // Armazena localmente (poderia ser em um estado/global)
  if (!window._tarefas) window._tarefas = [];
  window._tarefas.push(tarefa);

  // Agrupa por data
  const tarefasAgrupadas = window._tarefas.reduce((acc, t) => {
    if (!acc[t.data]) acc[t.data] = [];
    acc[t.data].push(t);
    return acc;
  }, {});

  // Limpa a lista antes de redesenhar
  lista.innerHTML = '';

  // Ordena datas
  const datasOrdenadas = Object.keys(tarefasAgrupadas).sort();

  datasOrdenadas.forEach(data => {
    const tarefasDoDia = tarefasAgrupadas[data];

    // Ordena tarefas por hora
    tarefasDoDia.sort((a, b) => a.hora.localeCompare(b.hora));

    // Adiciona título da data
    const tituloData = document.createElement('h3');
    const [ano, mes, dia] = data.split('-');
    const dataObj = new Date(ano, mes - 1, dia); // Aqui é mês - 1 porque começa do zero (jan = 0)

    const opcoes = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' };
    tituloData.textContent = `📅 ${dataObj.toLocaleDateString('pt-BR', opcoes)}`;
    tituloData.style.marginTop = '1rem';
    lista.appendChild(tituloData);

    tarefasDoDia.forEach(tarefa => {
      const item = document.createElement('div');
      item.innerHTML = `
        <strong>${tarefa.titulo}</strong> - ${tarefa.data} ${tarefa.hora} [${tarefa.categoria}]
        <button onclick="removerTarefa('${tarefa._id}', this)">Remover</button>
      `;
      lista.appendChild(item);
    });
  });
}


window.removerTarefa = async function (id, botao) {
  await deletarTarefa(id);

  // Remove da lista local
  window._tarefas = window._tarefas.filter(t => t._id !== id);

  // Re-renderiza
  document.getElementById('lista-tarefas').innerHTML = '';
  window._tarefas.forEach(adicionarNaTela);
};

// ======================
// CALENDÁRIO VISUAL
// ======================

let dataAtual = new Date();

function renderizarCalendario(dataBase) {
  const diasMes = document.getElementById('dias-mes');
  const titulo = document.getElementById('titulo-calendario');
  diasMes.innerHTML = '';

  const ano = dataBase.getFullYear();
  const mes = dataBase.getMonth();
  const primeiroDia = new Date(ano, mes, 1);
  const ultimoDia = new Date(ano, mes + 1, 0);

  titulo.textContent = `${primeiroDia.toLocaleString('default', { month: 'long' })} ${ano}`;

  const inicioSemana = primeiroDia.getDay();
  for (let i = 0; i < inicioSemana; i++) {
    diasMes.innerHTML += `<span></span>`;
  }

  for (let d = 1; d <= ultimoDia.getDate(); d++) {
    const span = document.createElement('span');
    span.textContent = d;
    span.addEventListener('click', () => {
      const dia = String(d).padStart(2, '0');
      const mesStr = String(mes + 1).padStart(2, '0');
      document.getElementById('data').value = `${ano}-${mesStr}-${dia}`;
    });
    diasMes.appendChild(span);
  }
}

document.getElementById('prev').addEventListener('click', () => {
  dataAtual.setMonth(dataAtual.getMonth() - 1);
  renderizarCalendario(dataAtual);
});

document.getElementById('next').addEventListener('click', () => {
  dataAtual.setMonth(dataAtual.getMonth() + 1);
  renderizarCalendario(dataAtual);
});
