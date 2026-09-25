# Explorador de Endereços — projeto prático

Projeto da aula **Consumindo APIs com HTML, CSS e JavaScript**.
Um buscador de endereços por CEP (API do **ViaCEP**) e um navegador de estados e
municípios (API de Localidades do **IBGE**), feito só com HTML, CSS e JavaScript puro.

## Pastas

| Pasta | Para quem | O que tem |
|---|---|---|
| `inicial/` | alunos | HTML e CSS prontos; `script.js` com TODOs numerados |
| `final/` | professor / gabarito | projeto completo e comentado |

## Como rodar

1. Abra a pasta no **VS Code**.
2. Instale a extensão **Live Server** e clique em *Go Live* com o `index.html` aberto
   (ou simplesmente dê dois cliques no `index.html`).
3. Abra o DevTools com **F12** e deixe as abas **Console** e **Network (Rede)** visíveis.

Não precisa de chave de API nem de servidor: o ViaCEP e o IBGE são abertos e liberam
chamadas direto do navegador (CORS).

## As APIs

| API | Endpoint | Retorna |
|---|---|---|
| ViaCEP | `https://viacep.com.br/ws/{cep}/json/` | objeto com logradouro, bairro, localidade, uf, ddd, ibge… |
| IBGE | `https://servicodados.ibge.gov.br/api/v1/localidades/estados` | lista (array) dos 27 estados |
| IBGE | `https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios` | lista dos municípios do estado |

Abra essas URLs direto no navegador antes de programar: é o melhor jeito de conhecer o formato do JSON.

## Roteiro da parte prática (pasta `inicial/`)

| Passo | O que fazer | Como testar |
|---|---|---|
| 1 | `requisitarJson(url)`: fetch + `resposta.ok` + `resposta.json()` | no console: `requisitarJson("https://viacep.com.br/ws/01001000/json/").then(console.log)` |
| 2 | `buscarCep(cep)`: montar a URL e tratar o `{ "erro": true }` | `buscarCep("01001000").then(console.log)` e `buscarCep("99999999").catch(console.error)` |
| 3 | Evento `submit` do formulário | digitar um CEP e clicar em *Buscar endereço* |
| 4 | Preencher o cartão em `mostrarEndereco` | o endereço aparece na etiqueta |
| 5 | Bônus: `buscarEstados` + `carregarEstados` | o seletor de estados é preenchido |
| 6 | Bônus: `buscarMunicipios` + `carregarMunicipios` + evento `change` | escolher um estado lista os municípios |
| 7 | Bônus: filtro com `filter` + `includes` | digitar "sao" encontra "São…" |
| 8 | Bônus: botão *Ver municípios* no cartão do CEP | liga os dois painéis |

Travou? Compare com o arquivo equivalente em `final/`.

## Casos para testar

- `01001-000` → Praça da Sé, São Paulo/SP (sucesso)
- `99999-999` → CEP bem formatado, mas inexistente (status 200 com `erro`)
- `123` → validação local, nem chega a chamar a API
- DevTools › Network › **Offline** → erro de conexão (cai no `catch` do fetch)

## Desafios

1. **Busca automática (fácil):** buscar sozinho quando o campo completar 8 números.
   *Dica:* no evento `input`, confira se `numeros.length === 8` e chame `formulario.requestSubmit()`.
2. **Ver no mapa (fácil):** um link que abre o endereço no OpenStreetMap.
   *Dica:* `https://www.openstreetmap.org/search?query=` + `encodeURIComponent(...)`.
3. **Histórico (médio):** guardar as 5 últimas buscas no `localStorage` e mostrá-las como atalhos.
   *Dica:* `JSON.stringify` para salvar, `JSON.parse` para ler.
4. **Busca reversa (difícil):** descobrir o CEP por UF, cidade e rua.
   *Dica:* `https://viacep.com.br/ws/RS/Porto Alegre/Domingos/json/` devolve um **array**;
   cidade e rua precisam de pelo menos 3 caracteres.
5. **Tempo limite (difícil):** cancelar a busca se demorar mais de 5 segundos com `AbortController`.

## Conceitos praticados

`fetch`, Promises, `async/await`, `try/catch`, `resposta.ok` e status HTTP, JSON,
manipulação do DOM (`querySelector`, `addEventListener`, `textContent`, `createElement`),
template strings, desestruturação, arrow functions, `map`/`filter`/`sort`, expressões regulares
e estados de interface (vazio, carregando, sucesso, erro).
