function fecharMenu() {
    document.getElementById("menu").checked = false;
  }
  
// Variável global para controlar o incremento do ID
let idCount = 1;

function adicionarLinha() {
    const tabela = document.getElementById("tabela-user").getElementsByTagName("tbody")[0]; // Acesse o tbody diretamente
    const novaLinha = tabela.insertRow(); // Insira uma nova linha na tabela

    // Cria células para a nova linha
    const cellId = novaLinha.insertCell(0);
    const cellNome = novaLinha.insertCell(1);
    const cellEmail = novaLinha.insertCell(2);
    const cellTelefone = novaLinha.insertCell(3);
    const cellAcoes = novaLinha.insertCell(4);

    // Preenche as células com dados fictícios (pode ser alterado para dados reais ou capturados)
    cellId.textContent = idCount++;
    cellNome.textContent = "Novo Nome";
    cellEmail.textContent = "exemplo@gmail.com";
    cellTelefone.textContent = "71-11111-1111";

    // Criando os botões de ação (Editar e Excluir)
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.classList.add("btn-edit", "btn-warning", "btn-sm", "me-2");
    btnEditar.onclick = function () {
        editarLinha(novaLinha);
    };

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.classList.add("btn-excluir", "btn-danger", "btn-sm");
    btnExcluir.onclick = function () {
        excluirLinha(novaLinha);
    };

    // Adiciona os botões na célula de ações
    cellAcoes.appendChild(btnEditar);
    cellAcoes.appendChild(btnExcluir);
}

// Função para editar uma linha
function editarLinha(linha) {
    const nome = prompt("Digite o novo nome:", linha.cells[1].textContent);
    const email = prompt("Digite o novo Email:", linha.cells[2].textContent);
    const telefone = prompt("Digite o novo telefone:", linha.cells[3].textContent);

    if (nome && email && telefone) {
        linha.cells[1].textContent = nome;
        linha.cells[2].textContent = email;
        linha.cells[3].textContent = telefone;
    }
}

// Função para excluir uma linha
function excluirLinha(linha) {
    if (confirm("Tem certeza que deseja excluir a linha?")) {
        linha.remove();
    }
}
// Função para validar login
document.addEventListener('DOMContentLoaded', function() {
document.getElementById('login-form').addEventListener('submit', function (event) {
  // Previne o envio do formulário até que a validação seja concluída
  event.preventDefault();

  // Obter valores dos campos de entrada
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  // Validações
  if (email.trim() === '') {
    alert("O campo email é obrigatório");
  } else if (senha.trim() === '') {
    alert("O campo senha é obrigatório");
  } else if (senha.length < 6) {
    alert("O tamanho mínimo da senha é 6 caracteres");
  } else {
    // Se passar por todas as validações, redireciona
    window.location.href = '../pages/pagina-usuarios.html';
  }
});

});
// java script para pagina de tarefas
document.addEventListener('DOMContentLoaded', () => {
  const formTarefas = document.getElementById('form-tarefas');
  const inputTarefa = document.getElementById('input-tarefa');
  const lista = document.getElementById('lista');

  // Função para adicionar uma nova tarefa
  formTarefas.addEventListener('submit', (e) => {
    e.preventDefault();
    const tarefa = inputTarefa.value.trim();
    if (tarefa === '') {
      alert('Digite uma tarefa!');
      return;
    }

    const li = document.createElement('li');
    li.innerHTML = `
      <span class="tarefa-texto">${tarefa}</span>
      <button class="editar-tarefa btn-warning btn-sm editar-tarefa me-1">Editar</button>
      <button class="remover-tarefa btn-danger btn-sm remover-tarefa">Remover</button>
    `;

    lista.appendChild(li);
    inputTarefa.value = '';
    inputTarefa.focus();
  });

  // Função para editar ou remover tarefas
  lista.addEventListener('click', (e) => {
    if (e.target.classList.contains('remover-tarefa')) {
      const li = e.target.parentElement;
      lista.removeChild(li);
    } else if (e.target.classList.contains('editar-tarefa')) {
      const li = e.target.parentElement;
      const span = li.querySelector('.tarefa-texto');
      const novaTarefa = prompt('Edite a tarefa:', span.textContent);
      if (novaTarefa !== null && novaTarefa.trim() !== '') {
        span.textContent = novaTarefa.trim();
      }
    }
  });
});
  