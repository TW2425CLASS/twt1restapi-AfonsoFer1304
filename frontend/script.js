// JS para operações CRUD com Fetch API

// URL para a API real no Render (Express + MongoDB)
const API_URL = "https://tw-restapi-afonsofer1304.onrender.com/api/alunos";
const CURSOS_API_URL = "https://tw-restapi-afonsofer1304.onrender.com/api/cursos";

const form = document.getElementById("alunoForm");
const nome = document.getElementById("nome");
const apelido = document.getElementById("apelido");
const curso = document.getElementById("curso");
const anoCurricular = document.getElementById("anoCurricular");
const cancelarBtn = document.getElementById("cancelarBtn");
const lista = document.getElementById("listaAlunos");
const pesquisa = document.getElementById("pesquisa");

let idEditando = null;

// Carrega os cursos disponíveis
async function carregarCursos() {
  try {
    const res = await fetch(CURSOS_API_URL);
    if (!res.ok) throw new Error("Erro ao carregar cursos");
    const cursos = await res.json();

    curso.innerHTML = '<option value="">-- Selecione o curso --</option>';
    cursos.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c.nomeDoCurso;
      opt.textContent = c.nomeDoCurso;
      curso.appendChild(opt);
    });
  } catch (error) {
    console.error(error);
    alert("Não foi possível carregar os cursos.");
  }
}

// Carrega a lista de alunos da API
async function carregarAlunos() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Erro ao carregar alunos");
    const alunos = await res.json();
    mostrarAlunos(alunos);
  } catch (error) {
    console.error(error);
    alert("Não foi possível carregar os alunos.");
  }
}

// Mostra a lista de alunos no HTML
function mostrarAlunos(alunos) {
  lista.innerHTML = "";

  alunos.forEach(aluno => {
    const li = document.createElement("li");

    // Cria a div para informações do aluno com emojis
    const info = document.createElement("div");
    info.className = "aluno-info";
    info.innerHTML = `
      <p>👤 <strong>Nome:</strong> ${aluno.nome} ${aluno.apelido}</p>
      <p>🎓 <strong>Curso:</strong> ${aluno.curso}</p>
      <p>📅 <strong>Ano:</strong> ${aluno.anoCurricular}º ano</p>
    `;

    // Cria os botões de ação
    const botoes = document.createElement("div");
    botoes.className = "actions";

    const btnEditar = document.createElement("button");
    btnEditar.innerText = "✏️ Editar";
    btnEditar.addEventListener("click", () => editarAluno(aluno));

    const btnApagar = document.createElement("button");
    btnApagar.innerText = "🗑️ Apagar";
    btnApagar.addEventListener("click", () => apagarAluno(aluno._id));

    botoes.appendChild(btnEditar);
    botoes.appendChild(btnApagar);

    // Junta tudo ao item da lista
    li.appendChild(info);
    li.appendChild(botoes);
    lista.appendChild(li);
  });
}

// Submeter formulário (adicionar ou atualizar)
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const aluno = {
    nome: nome.value.trim(),
    apelido: apelido.value.trim(),
    curso: curso.value.trim(),
    anoCurricular: parseInt(anoCurricular.value)
  };

  if (!aluno.nome || !aluno.apelido || !aluno.curso || !aluno.anoCurricular) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    if (idEditando) {
      await fetch(`${API_URL}/${idEditando}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aluno)
      });
      idEditando = null;
      cancelarBtn.style.display = "none";
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aluno)
      });
    }

    form.reset();
    carregarAlunos();
  } catch (error) {
    console.error(error);
    alert("Erro ao salvar o aluno.");
  }
});

// Preencher formulário com dados de aluno existente
function editarAluno(aluno) {
  nome.value = aluno.nome;
  apelido.value = aluno.apelido;
  curso.value = aluno.curso;
  anoCurricular.value = aluno.anoCurricular;
  idEditando = aluno._id;
  cancelarBtn.style.display = "inline-block";
}

// Apagar aluno
async function apagarAluno(id) {
  mostrarModal(id);
}

// Cancelar edição
cancelarBtn.addEventListener("click", () => {
  form.reset();
  idEditando = null;
  cancelarBtn.style.display = "none";
});

// Normalizar texto para pesquisa (remover acentos)
function normalizarTexto(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Filtro de pesquisa por nome ou apelido
pesquisa.addEventListener("input", async () => {
  const termo = normalizarTexto(pesquisa.value);
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Erro ao carregar alunos para pesquisa");
    const alunos = await res.json();

    const alunosFiltrados = alunos.filter(aluno =>
      normalizarTexto(aluno.nome).includes(termo) ||
      normalizarTexto(aluno.apelido).includes(termo)
    );

    mostrarAlunos(alunosFiltrados);
  } catch (error) {
    console.error(error);
    alert("Erro na pesquisa.");
  }
});

const modal = document.getElementById("modal");
const btnConfirmDelete = document.getElementById("confirmDelete");
const btnCancelDelete = document.getElementById("cancelDelete");

let idParaApagar = null;

function mostrarModal(id) {
  idParaApagar = id;
  modal.classList.remove("hidden");
}

function esconderModal() {
  idParaApagar = null;
  modal.classList.add("hidden");
}

btnConfirmDelete.addEventListener("click", async () => {
  if (idParaApagar) {
    try {
      await fetch(`${API_URL}/${idParaApagar}`, { method: "DELETE" });
      carregarAlunos();
      esconderModal();
    } catch (error) {
      console.error(error);
      alert("Erro ao apagar aluno.");
    }
  }
});

btnCancelDelete.addEventListener("click", () => {
  esconderModal();
});

// Atualiza a função apagarAluno para mostrar o modal em vez do confirm()
function apagarAluno(id) {
  mostrarModal(id);
}

// Inicialização
carregarCursos();
carregarAlunos();
