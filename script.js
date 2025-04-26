// Selecionando elementos
const form = document.getElementById("client-form");
const tableBody = document.querySelector("#client-table tbody");

// Recuperar clentes  do localStorage ou iniciar vazio
let clients = JSON.parse(localStorage.getItem("clients")) || [];

// Salvar clientes no localSorage
function saveClients() {
  localStorage.setItem("clients", JSON.stringify(clients));
}

//Renderizar a tabela
function renderTable() {
  tableBody.innerHTML = "";
  clients.forEach((client, index) => {
    const row = `
        <tr>

        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.telefone}</td>
        <td>${client.cpf}</td>
<td class = "actions">
    <button class="edit" onclick="editClient(${index})">Editar</button>
    <button class="delete" onclick="deleteClient(${index})">Delete</button>
    </td>
    </tr>
    `;

    tableBody.innerHTML += row;
  });
}

// Adicionar ou atualizar cliente
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;
  const cpf = document.getElementById("cpf").value;

  if (form.dataset.editing !== undefined) {
    const index = form.dataset.editing;
    clients[index] = { nome, email, telefone, cpf };
    delete form.dataset.editing;
  } else {
    clients.push({ nome, email, telefone, cpf });
  }

  saveClients();
  renderTable();
  form.reset();
});

// Editar cliente
function editClient(index) {
  const client = clients[index];
  document.getElementById("nome").value = client.nome;
  document.getElementById("email").value = client.email;
  document.getElementById("telefone").value = client.telefone;
  document.getElementById("cpf").value = client.cpf;
  form.dataset.editing = index;
}

// Excluir cliente
function deleteClient(index) {
  if (confirm("Deseja realmente excluir este cliente?")) {
    clients.splice(index, 1);
    saveClients();
    renderTable();
  }
}

// Inicializar
renderTable();
