
// Função para listar as tarefas
function listarTarefas() {
    fetch('http://localhost:8080/task/findall')  // Substitua pela URL da sua API de listar tarefas
        .then(response => response.json())
        .then(tarefas => {
            // Limpa a lista existente para evitar duplicação
            const listaTarefas = document.getElementById('lista');
            listaTarefas.innerHTML = ''; 
  
            // Adiciona cada tarefa à lista
            tarefas.forEach(tarefa => {
                const li = document.createElement('li');
                li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
                li.textContent = `Id:${tarefa.id}  ${tarefa.description}`;  // Supondo que a propriedade seja 'descricao'
  
                // Criar o grupo de botões para cada tarefa
                const buttonsContainer = document.createElement('div');
                buttonsContainer.classList.add('btn-group');
  
                // Botão de atualizar (edit)
                const editButton = document.createElement('button');
                editButton.classList.add('btn', 'btn-warning', 'btn-sm');
                editButton.textContent = 'Editar';
                editButton.addEventListener('click', () => editarTarefa(tarefa.id));
                buttonsContainer.appendChild(editButton);
  
                // Botão de deletar (delete)
                const deleteButton = document.createElement('button');
                deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'ms-2');
                deleteButton.textContent = 'Excluir';
                deleteButton.addEventListener('click', () => deletarTarefa(tarefa.id));
                buttonsContainer.appendChild(deleteButton);
  
                // Adiciona os botões à tarefa
                li.appendChild(buttonsContainer);
  
                // Adiciona a tarefa à lista
                listaTarefas.appendChild(li);
            });
        })
        .catch(error => console.error('Erro ao listar tarefas:', error));
  }
  

// Chama a função quando a página carrega
document.addEventListener('DOMContentLoaded', listarTarefas);

document.addEventListener('DOMContentLoaded', function () {
  // Selecione o formulário e o input
  const formTarefas = document.getElementById('form-tarefas');
  const inputTarefa = document.getElementById('input-tarefa');
  const erroTarefa = document.getElementById('erro-tarefa')

  // Adicione o evento de submit ao formulário
  formTarefas.addEventListener('submit', function (event) {
      event.preventDefault(); // Evita que o formulário seja enviado da maneira padrão (recarregando a página)

      // Pegue o texto da tarefa
      const tarefaTexto = inputTarefa.value.trim();
      if(!tarefaTexto){
        inputTarefa.classList.add('is-invalid');
        erroTarefa.textContent = "Por favor preencha o campo"


        return;
      }
      // Se o campo estiver preenchido, remove o erro
    inputTarefa.classList.remove('is-invalid');
    erroTarefa.textContent = "";  // Limpa a mensagem de erro

          // Envie para a API usando fetch
          fetch('http://localhost:8080/task/save', {
              method: 'POST', // Método POST
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  description: tarefaTexto, // Enviando o texto da tarefa para o backend
              }),
          })
          .then(response => response.json()) // A resposta da API (supondo que seja um JSON)
          .then(data => {
              // Exibir ou processar a resposta aqui (opcional)
              console.log('Tarefa adicionada:', data);
              listarTarefas();
          })
          .catch(error => {
              // Lidar com erros
              console.error('Erro ao adicionar tarefa:', error);
          });
          
          // Limpe o campo de input após o envio
          inputTarefa.value = '';
  });
});
function editarTarefa(id) {
  // Suponha que você tenha um campo de edição ou modal
  const novaDescricao = prompt("Digite a nova descrição da tarefa:");
  if (novaDescricao && novaDescricao.trim() !== "") {
      fetch(`http://localhost:8080/task/update/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description: novaDescricao })  // Atualiza com a nova descrição
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Erro ao atualizar tarefa');
          }
          return response.json();
      })
      .then(data => {
          console.log('Tarefa atualizada com sucesso:', data);
          listarTarefas();  // Atualiza a lista de tarefas após a atualização
      })
      .catch(error => console.error('Erro ao atualizar tarefa:', error));
  }
}
function deletarTarefa(id) {
    // Exibe uma janela de confirmação
    const confirmar = window.confirm('Tem certeza que deseja deletar esta tarefa?');
    
    if (confirmar) {
      fetch(`http://localhost:8080/task/delete/${id}`, {
          method: 'DELETE',
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Erro ao deletar tarefa');
          }
          return response.json();
      })
      .then(data => {
          console.log('Tarefa deletada com sucesso:', data);
          listarTarefas();  // Atualiza a lista de tarefas após a exclusão
      })
      .catch(error => console.error('Erro ao deletar tarefa:', error));
    } else {
      console.log('A tarefa não foi deletada');
    }
  }
  
