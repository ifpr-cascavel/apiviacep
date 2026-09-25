/* =========================================================
   Explorador de Endereços — versão INICIAL (para a aula)

   O HTML e o CSS já estão prontos. Sua missão é completar os TODOs.
   Vá na ordem, salve e teste no navegador a cada passo.
   Deixe o DevTools aberto (F12): abas Console e Network (Rede).

   APIs usadas:
   - ViaCEP:  https://viacep.com.br/ws/{cep}/json/
   - IBGE:    https://servicodados.ibge.gov.br/api/v1/localidades/estados
              https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios
   ========================================================= */


/* ---------- 1. Constantes e referências ao DOM (pronto) ---------- */

const URL_VIACEP = "https://viacep.com.br/ws";
const URL_IBGE = "https://servicodados.ibge.gov.br/api/v1/localidades";

const formulario = document.querySelector("#form-cep");
const campoCep = document.querySelector("#campo-cep");
const botaoBuscar = document.querySelector("#botao-buscar");
const statusCep = document.querySelector("#status-cep");
const resultadoCep = document.querySelector("#resultado-cep");
const botaoVerCidades = document.querySelector("#botao-ver-cidades");

const selectEstado = document.querySelector("#select-estado");
const filtroMunicipio = document.querySelector("#filtro-municipio");
const statusIbge = document.querySelector("#status-ibge");
const contagem = document.querySelector("#contagem");
const listaMunicipios = document.querySelector("#lista-municipios");

let municipiosCarregados = [];


/* ---------- 2. Funções que conversam com as APIs ---------- */

/**
 * PASSO 1 — Faz um GET na URL e devolve o JSON convertido em objeto.
 *
 * TODO:
 *  a) Use await fetch(url) dentro de um try/catch.
 *     Se cair no catch, lance: new Error("Não foi possível conectar à API...")
 *  b) Se resposta.ok for false, lance um Error com resposta.status na mensagem.
 *  c) Devolva resposta.json()
 */
async function requisitarJson(url) {
  // seu código aqui
}

/**
 * PASSO 2 — Busca um endereço no ViaCEP.
 *
 * TODO:
 *  a) Monte a URL com template string: `${URL_VIACEP}/${cep}/json/`
 *  b) Chame requisitarJson(url) com await.
 *  c) ATENÇÃO: CEP inexistente volta com status 200 e { "erro": true }.
 *     Se dados.erro existir, lance new Error("CEP não encontrado...").
 *  d) Devolva os dados.
 *
 *  Teste rápido no console:  buscarCep("01001000").then(console.log)
 */
async function buscarCep(cep) {
  // seu código aqui
}

/** PASSO 5 (bônus) — TODO: devolva requisitarJson(`${URL_IBGE}/estados`) */
async function buscarEstados() {
  // seu código aqui
}

/** PASSO 6 (bônus) — TODO: devolva requisitarJson(`${URL_IBGE}/estados/${uf}/municipios`) */
async function buscarMunicipios(uf) {
  // seu código aqui
}


/* ---------- 3. Funções que atualizam a tela (prontas) ---------- */

function formatarCep(cep) {
  return cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");
}

function normalizar(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function mostrarCarregando() {
  botaoBuscar.disabled = true;
  botaoBuscar.textContent = "Buscando…";
  statusCep.className = "status carregando";
  statusCep.textContent = "Consultando o ViaCEP…";
  resultadoCep.hidden = true;
}

function encerrarCarregamento() {
  botaoBuscar.disabled = false;
  botaoBuscar.textContent = "Buscar endereço";
}

function mostrarErro(mensagem) {
  encerrarCarregamento();
  statusCep.className = "status erro";
  statusCep.textContent = mensagem;
  resultadoCep.hidden = true;
}

/**
 * PASSO 4 — Mostra o endereço no cartão.
 * A parte de estado da tela já está pronta; complete o preenchimento.
 */
function mostrarEndereco(endereco) {
  encerrarCarregamento();
  statusCep.className = "status";
  statusCep.textContent = "";

  // TODO: use desestruturação para pegar cep, logradouro, bairro, localidade, uf, ddd, ibge
  // TODO: preencha com textContent os elementos:
  //   #res-cep, #res-logradouro, #res-bairro, #res-cidade ("Cidade / UF"), #res-ddd, #res-ibge
  // Dica: alguns CEPs de cidades pequenas não têm logradouro. Use || para um texto alternativo.

  // TODO (bônus): botaoVerCidades.dataset.uf = uf;
  //               botaoVerCidades.textContent = `Ver municípios de ${uf}`;

  resultadoCep.hidden = false;
}

function mostrarStatusIbge(mensagem, tipo) {
  statusIbge.className = tipo ? `status ${tipo}` : "status";
  statusIbge.textContent = mensagem;
}

function renderizarMunicipios(nomes) {
  const itens = nomes.map((nome) => {
    const li = document.createElement("li");
    li.textContent = nome;
    return li;
  });
  listaMunicipios.replaceChildren(...itens);

  const total = municipiosCarregados.length;
  if (nomes.length === 0) {
    contagem.textContent = "Nenhum município com esse nome.";
  } else if (nomes.length === total) {
    contagem.textContent = `${total} municípios`;
  } else {
    contagem.textContent = `${nomes.length} de ${total} municípios`;
  }
}

/**
 * PASSO 5 (bônus) — Preenche o <select> com os estados.
 * TODO:
 *  a) const estados = await buscarEstados();
 *  b) Ordene: estados.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
 *  c) Transforme em opções com map: new Option(`${estado.nome} (${estado.sigla})`, estado.sigla)
 *  d) selectEstado.replaceChildren(new Option("Escolha um estado", ""), ...opcoes);
 *  e) selectEstado.disabled = false;
 *  f) Coloque tudo em try/catch e, no erro, chame mostrarStatusIbge(erro.message, "erro").
 */
async function carregarEstados() {
  // seu código aqui
}

/**
 * PASSO 6 (bônus) — Carrega e mostra os municípios de um estado.
 * TODO:
 *  a) Limpe a lista, a contagem e o filtro (veja a versão final se travar).
 *  b) Se uf estiver vazio, pare (return).
 *  c) mostrarStatusIbge("Buscando municípios no IBGE…", "carregando");
 *  d) const municipios = await buscarMunicipios(uf);
 *  e) municipiosCarregados = municipios.map((m) => m.nome).sort(...);
 *  f) mostrarStatusIbge(""); renderizarMunicipios(municipiosCarregados);
 *  g) filtroMunicipio.disabled = false;
 *  h) try/catch com mensagem de erro.
 */
async function carregarMunicipios(uf) {
  // seu código aqui
}


/* ---------- 4. Eventos ---------- */

// Máscara do CEP (pronto)
campoCep.addEventListener("input", () => {
  const numeros = campoCep.value.replace(/\D/g, "").slice(0, 8);
  campoCep.value = numeros.length > 5 ? `${numeros.slice(0, 5)}-${numeros.slice(5)}` : numeros;
});

/**
 * PASSO 3 — O envio do formulário.
 * TODO:
 *  a) evento.preventDefault();
 *  b) const cep = campoCep.value.replace(/\D/g, "");
 *  c) Se cep.length !== 8, chame mostrarErro("Digite um CEP com 8 números.") e return.
 *  d) mostrarCarregando();
 *  e) try { const endereco = await buscarCep(cep); mostrarEndereco(endereco); }
 *     catch (erro) { mostrarErro(erro.message); }
 */
formulario.addEventListener("submit", async (evento) => {
  // seu código aqui
});

// PASSO 6 (bônus) — TODO: no evento "change" do selectEstado, chame carregarMunicipios(selectEstado.value)

// PASSO 7 (bônus) — TODO: no evento "input" do filtroMunicipio:
//   normalize o termo digitado, filtre municipiosCarregados com filter + includes
//   e chame renderizarMunicipios(filtrados)

// PASSO 8 (bônus) — TODO: no clique do botaoVerCidades:
//   pegue botaoVerCidades.dataset.uf, coloque no selectEstado.value e chame carregarMunicipios(uf)


/* ---------- 5. Inicialização ---------- */

// PASSO 5 (bônus) — TODO: descomente quando carregarEstados estiver pronta
// carregarEstados();
