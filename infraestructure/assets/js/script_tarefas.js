
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
              li.classList.add('list-group-item');
              li.textContent = tarefa.description;  // Supondo que a propriedade seja 'descricao'

              // Criar o grupo de ícones para cada tarefa
              const iconsContainer = document.createElement('span');
              iconsContainer.classList.add('icons-container'); // Pode adicionar uma classe para estilizar os ícones

              // Ícone de atualizar (edit)
              const editIcon = document.createElement('i');
              editIcon.classList.add('fa', 'fa-edit', 'mx-2');  // Ícone FontAwesome
              editIcon.style.cursor = 'pointer';
              editIcon.addEventListener('click', () => editarTarefa(tarefa.id));  // Passa o id da tarefa para edição
              iconsContainer.appendChild(editIcon);

              // Ícone de deletar (delete)
              const deleteIcon = document.createElement('i');
              deleteIcon.classList.add('fa', 'fa-trash', 'mx-2');  // Ícone FontAwesome
              deleteIcon.style.cursor = 'pointer';
              deleteIcon.addEventListener('click', () => deletarTarefa(tarefa.id));  // Passa o id da tarefa para deletar
              iconsContainer.appendChild(deleteIcon);

              // Adiciona os ícones à tarefa
              li.appendChild(iconsContainer);

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

  // Adicione o evento de submit ao formulário
  formTarefas.addEventListener('submit', function (event) {
      event.preventDefault(); // Evita que o formulário seja enviado da maneira padrão (recarregando a página)

      // Pegue o texto da tarefa
      const tarefaTexto = inputTarefa.value.trim();

      // Verifique se o campo não está vazio
      if (tarefaTexto !== "") {
          // Envie para a API usando fetch
          fetch('http://localhost:8080/task/save', {
              method: 'POST', // Método POST
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  tarefa: tarefaTexto, // Enviando o texto da tarefa para o backend
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
          
      } else {
          // por favor insira uma tarefa
          alert('Por favor, insira uma tarefa.');
      }
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
          body: JSON.stringify({ descricao: novaDescricao })  // Atualiza com a nova descrição
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
  fetch(`SUA_API_URL/tarefas/${id}`, {
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
}
