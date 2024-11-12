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
    btnEditar.classList.add("btn-edit");
    btnEditar.onclick = function () {
        editarLinha(novaLinha);
    };

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.classList.add("btn-excluir");
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
  