# Consumindo APIs com HTML, CSS e JavaScript

Versão em texto dos slides da aula, preparada para leitores de tela.

## Como ler este documento

Cada slide é um título de nível 2, numerado de 1 a 19. Use a navegação por títulos do seu leitor de tela para pular entre eles: no NVDA e no JAWS, a tecla H avança para o próximo título, e no VoiceOver use o rotor.

Nos slides originais havia diagramas, setas e cores. Aqui, tudo o que era visual está descrito em palavras. Cada trecho de código aparece em um bloco separado e vem acompanhado de uma explicação linha a linha. Ao final de cada slide, a seção "Explicação do professor" traz as anotações que acompanham a apresentação.

## Sumário

- Parte 0: apresentação, slides 1 e 2
- Parte 1: fundamentos, slides 3 a 6
- Parte 2: JavaScript para APIs, slides 7 a 13
- Parte 3: projeto prático, slides 14 a 17
- Encerramento, slides 18 e 19

---

## Slide 1 de 19: Capa

**Aula prática de desenvolvimento web.**

Título: Consumindo APIs com HTML, CSS e JavaScript.

Subtítulo: Do primeiro fetch a um buscador de endereços completo, usando as APIs públicas do ViaCEP e do IBGE.

Professor: [Nome do professor]. Turma: [Turma]. Data: [Data].

No canto superior direito aparece, como decoração, o exemplo de uma requisição: "GET barra ws barra 01001000 barra json", com a resposta "200 OK".

### Explicação do professor

Quem já usou um aplicativo que preenche o endereço sozinho ao digitar o CEP? É exatamente isso que vamos construir. Pré-requisitos: HTML e CSS básicos e noções de variáveis e funções em JavaScript.

---

## Slide 2 de 19: Roteiro da aula

Título: Três etapas, do conceito ao código.

1. **Fundamentos.** O que é uma API, como o HTTP funciona e como ler JSON. Cerca de 30 minutos.
2. **JavaScript para APIs.** Assincronia, Promises, fetch, async e await, e o DOM. Cerca de 50 minutos.
3. **Projeto prático.** Explorador de Endereços com as APIs do ViaCEP e do IBGE. Cerca de 70 minutos.

Meta: sair da aula com um buscador de endereços funcionando.

### Explicação do professor

Os tempos são sugestões. A parte 3 pode ser feita em outro encontro. Os alunos recebem a pasta "inicial" do projeto, com HTML e CSS prontos e um arquivo script.js com tarefas marcadas como TODO.

---

# Parte 1: fundamentos

## Slide 3 de 19: Uma API funciona como o garçom de um restaurante

O slide mostra um diagrama com três participantes, lidos da esquerda para a direita:

1. **Você**: o site rodando no navegador, também chamado de front-end.
2. **Garçom**: a API. Recebe pedidos e entrega respostas. Este é o elemento destacado do diagrama.
3. **Cozinha**: o servidor e o banco de dados.

Entre cada participante há duas setas. Uma vai para a direita, com a palavra "pedido", e outra volta para a esquerda, com a palavra "resposta". Ou seja: você faz o pedido ao garçom, o garçom leva até a cozinha, e a resposta faz o caminho de volta.

Texto do slide: API significa Application Programming Interface, ou Interface de Programação de Aplicações. Ela é um contrato: diz o que você pode pedir, como pedir e o que vai receber. Você não precisa saber como a cozinha funciona, basta seguir o cardápio, que é a documentação.

### Explicação do professor

O cliente não entra na cozinha. Da mesma forma, o nosso JavaScript não acessa o banco de dados do ViaCEP: ele faz um pedido pela internet para a API e recebe a resposta. Outros exemplos de APIs do dia a dia: login com Google, previsão do tempo e mapas.

---

## Slide 4 de 19: Toda requisição tem um endereço e um método

### O endereço

O slide decompõe o endereço https://viacep.com.br/ws/01001000/json/ em cinco partes:

1. **Protocolo**: https, dois pontos, barra, barra.
2. **Domínio**: viacep.com.br.
3. **Rota**: barra ws barra.
4. **Parâmetro**: 01001000, que é o CEP consultado.
5. **Formato**: barra json barra, indicando que a resposta virá em JSON.

### Os métodos

| Método | Para que serve | Exemplo |
|---|---|---|
| GET | buscar dados | consultar um CEP |
| POST | criar algo novo | cadastrar um usuário |
| PUT ou PATCH | atualizar | editar um perfil |
| DELETE | remover | apagar um comentário |

Nesta aula usamos só GET, porque as duas APIs do projeto são de leitura.

### Explicação do professor

Abra o endereço acima em uma aba do navegador. O navegador faz um GET e mostra o JSON. Isso prova que uma API é só um endereço que devolve dados. O método é o verbo do pedido.

---

## Slide 5 de 19: A resposta chega com um código de status

Os códigos são agrupados em três famílias, pelo primeiro número:

### Família 200: deu certo

- **200 OK**: os dados vieram.
- **201 Created**: o item foi criado.

### Família 400: erro do cliente, ou seja, de quem fez o pedido

- **400 Bad Request**: pedido mal formatado.
- **404 Not Found**: o recurso não existe.

### Família 500: erro do servidor

- **500**: falha interna da API.
- **503**: serviço fora do ar.

No ViaCEP, um CEP com letras ou com tamanho errado devolve 400. Vamos tratar esse caso no projeto.

### Explicação do professor

Demonstração: abra https://viacep.com.br/ws/abc/json/ e veja o código 400 na aba Rede (Network) das ferramentas do desenvolvedor, que abrem com a tecla F12.

---

## Slide 6 de 19: JSON, o formato em que os dados viajam

O slide mostra a resposta do ViaCEP para o CEP 01001-000, de forma resumida:

```json
{
  "cep": "01001-000",
  "logradouro": "Praça da Sé",
  "complemento": "lado ímpar",
  "bairro": "Sé",
  "localidade": "São Paulo",
  "uf": "SP",
  "ibge": "3550308",
  "ddd": "11"
}
```

Leitura do código: é um objeto, que começa e termina com chaves. Dentro dele há oito pares de nome e valor, separados por vírgula. Por exemplo, o nome "bairro" tem o valor "Sé", e o nome "uf" tem o valor "SP". Todos os nomes e valores estão entre aspas duplas.

Três ideias do slide:

1. **Parece objeto, mas é texto.** As chaves, isto é, os nomes, ficam sempre entre aspas duplas.
2. **Poucos tipos.** Textos, números, verdadeiro e falso (true e false), null, listas entre colchetes e objetos entre chaves.
3. **Vira objeto no JavaScript.** O comando resposta.json() converte o texto. Depois disso, dados.bairro vale "Sé".

### Explicação do professor

Tudo chega como texto pela rede e precisa ser convertido. A resposta real traz mais campos, como unidade, estado, regiao, gia e siafi.

---

# Parte 2: JavaScript para APIs

## Slide 7 de 19: Por que o código é assíncrono

Slide de destaque, com uma única frase grande:

**Buscar dados na rede leva tempo. O JavaScript não fica parado esperando.**

Por isso, o código que conversa com uma API é assíncrono: faz o pedido, segue executando e trata a resposta quando ela chegar.

### Explicação do professor

Analogia: pedir pizza por telefone. Você não fica parado na porta; continua fazendo outras coisas até a campainha tocar. Se o JavaScript ficasse esperando a rede, a página congelaria.

---

## Slide 8 de 19: Síncrono e assíncrono, a ordem muda

O slide compara dois códigos lado a lado.

### Código síncrono: uma coisa por vez

```javascript
console.log("1. Pedi a pizza");
console.log("2. Pizza chegou");
console.log("3. Vou ver TV");
```

Três linhas que escrevem mensagens no console, em sequência.

Saída no console: 1, depois 2, depois 3.

### Código assíncrono: a espera fica de lado

```javascript
console.log("1. Pedi a pizza");
setTimeout(() => {
  console.log("2. Pizza chegou");
}, 2000);
console.log("3. Vou ver TV");
```

Leitura linha a linha:

1. Escreve "1. Pedi a pizza".
2. O setTimeout agenda uma função para rodar depois de 2000 milissegundos, ou seja, 2 segundos.
3. Essa função, quando rodar, vai escrever "2. Pizza chegou".
4. Fecha a função agendada e informa o tempo de espera.
5. Escreve "3. Vou ver TV" imediatamente, sem esperar.

Saída no console: 1, depois 3 e, dois segundos depois, 2.

O fetch se comporta como o setTimeout: a resposta chega depois.

### Explicação do professor

Rode os dois trechos no console do navegador. Antes de executar o segundo, peça para a turma prever a ordem da saída.

---

## Slide 9 de 19: Promise, a promessa de um valor futuro

O slide mostra um diagrama de estados. Uma Promise começa em um estado e termina em um de outros dois:

1. **Pendente**, em inglês pending: o pedido ainda está a caminho. É o estado inicial.
2. Do estado pendente, uma seta leva a **Resolvida**, em inglês fulfilled: os dados chegaram. Tratamos esse caso com .then().
3. Outra seta leva a **Rejeitada**, em inglês rejected: a conexão falhou. Tratamos esse caso com .catch().

Texto do slide: fetch() e resposta.json() devolvem Promises. Usamos .then() ou await para pegar o valor quando ele chegar.

### Explicação do professor

Uma Promise termina uma única vez, resolvida ou rejeitada. Existe também o .finally(), que roda nos dois casos e é útil para esconder um indicador de carregamento.

---

## Slide 10 de 19: fetch com .then, a primeira requisição

```javascript
fetch("https://viacep.com.br/ws/01001000/json/")
  .then((resposta) => resposta.json())
  .then((dados) => {
    console.log(dados.logradouro);
  })
  .catch((erro) => {
    console.error("Falhou:", erro);
  });
```

O slide explica o código em quatro passos:

1. **fetch()** dispara o pedido para o endereço do ViaCEP e devolve uma Promise.
2. O primeiro **.then()** recebe a resposta e chama resposta.json(), que converte o corpo em objeto. Isso também é uma Promise.
3. O segundo **.then()** recebe os dados prontos e escreve no console o logradouro: Praça da Sé.
4. O **.catch()** recebe o erro se a conexão falhar e escreve "Falhou" no console.

### Explicação do professor

Cada .then() recebe o que o anterior devolveu, formando uma corrente. Pergunte à turma o que acontece se o CEP for trocado por "abc".

---

## Slide 11 de 19: async e await, o mesmo pedido lido de cima para baixo

```javascript
async function buscarCep(cep) {
  try {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const resposta = await fetch(url);
    if (!resposta.ok) {
      throw new Error(`Erro HTTP ${resposta.status}`);
    }
    const dados = await resposta.json();
    return dados;
  } catch (erro) {
    console.error(erro.message);
  }
}
```

Leitura do código:

1. Declara uma função assíncrona chamada buscarCep, que recebe um cep.
2. Abre um bloco try, onde erros podem acontecer.
3. Monta a URL com uma template string, que é um texto entre crases. O trecho cifrão, abre chaves, cep, fecha chaves é substituído pelo valor do CEP.
4. Espera, com await, a resposta do fetch.
5. Se resposta.ok for falso, ou seja, se o status não estiver entre 200 e 299,
6. lança um erro com o código de status na mensagem.
7. Fecha o if.
8. Espera, com await, a conversão da resposta em objeto.
9. Devolve os dados.
10. Se algo deu errado dentro do try, o bloco catch recebe o erro
11. e escreve a mensagem no console.

Três destaques do slide:

1. **async** marca a função como assíncrona. Ela sempre devolve uma Promise.
2. **await** pausa só esta função até a Promise resolver. A página continua respondendo.
3. **fetch() só rejeita em falha de rede.** Para 404 ou 500, confira resposta.ok e lance o erro.

### Explicação do professor

O ponto mais esquecido: um 404 não cai no catch sozinho, porque a rede funcionou. Por isso verificamos resposta.ok.

---

## Slide 12 de 19: DOM, onde os dados viram tela

DOM é a árvore de elementos da página que o JavaScript consegue ler e alterar.

| Comando | O que faz | No projeto |
|---|---|---|
| document.querySelector("#cep") | encontra um elemento | pegar o campo do CEP |
| form.addEventListener("submit", fn) | reage a um evento | enviar a busca |
| campo.value | lê o que foi digitado | o CEP informado |
| el.textContent = "..." | escreve texto com segurança | mensagens e endereço |
| el.classList.add("ativo") | liga um estilo do CSS | estado de carregando |
| document.createElement("li") | cria um elemento novo | lista de municípios |

Prefira textContent a innerHTML para exibir dados vindos de fora: assim nenhum HTML estranho é executado na sua página.

---

## Slide 13 de 19: Recursos do JavaScript que vamos usar

Seis recursos, cada um com um exemplo curto:

1. **const e let.** Exemplo: `const api = "viacep";`. Use const para o que não muda e let para o que muda.
2. **Template strings.** Exemplo: `` `CEP ${cep} inválido` ``. Monta textos com variáveis dentro de cifrão e chaves. O texto fica entre crases.
3. **Arrow functions**, ou funções de seta. Exemplo: `const dobro = (n) => n * 2;`. Um jeito curto de escrever funções; esta devolve o dobro de n.
4. **Desestruturação.** Exemplo: `const { uf, bairro } = dados;`. Tira várias propriedades de um objeto de uma vez; aqui cria as variáveis uf e bairro.
5. **map, filter e forEach.** Exemplo: `estados.map((e) => e.nome)`. Percorrem listas, como a de estados e a de municípios; este exemplo cria uma lista só com os nomes.
6. **Expressão regular.** Exemplo: `cep.replace(/\D/g, "")`. Remove tudo o que não é número do CEP. A expressão barra, barra invertida D maiúsculo, barra, g significa "qualquer caractere que não seja dígito, em todo o texto".

---

# Parte 3: projeto prático

## Slide 14 de 19: Explorador de Endereços

Digite um CEP e veja o endereço completo. Escolha um estado e liste todos os seus municípios.

O projeto usa duas APIs:

### ViaCEP: consulta de CEP

- Endereço: https://viacep.com.br/ws/{cep}/json/, trocando {cep} pelos 8 números.
- Gratuita, sem cadastro e sem chave de acesso.

### IBGE Localidades: estados e municípios

- Endereço: https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios, trocando {UF} pela sigla do estado, como PR.
- Dados oficiais e abertos, também sem chave.

### Explicação do professor

As duas APIs permitem chamadas direto do navegador, recurso chamado CORS. Por isso não precisamos de um servidor próprio.

---

## Slide 15 de 19: O caminho de um CEP até a tela

O slide mostra um fluxo de cinco etapas em sequência:

1. **Digitar**: o usuário informa o CEP.
2. **Validar**: o CEP tem 8 números? Se não tiver, avisa.
3. **Buscar**: fetch na URL do ViaCEP.
4. **Converter**: resposta.json() transforma o texto em objeto.
5. **Mostrar**: preenche o cartão na tela.

Aviso destacado: se qualquer etapa falhar, a tela mostra o que aconteceu e como resolver.

Os três arquivos do projeto:

- **index.html**: a estrutura, com formulário, campos e áreas de resultado.
- **style.css**: a aparência e os estados visuais.
- **script.js**: o comportamento, com eventos, pedidos e a exibição dos dados.

---

## Slide 16 de 19: O coração do projeto, o envio do formulário

```javascript
formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  const cep = campoCep.value.replace(/\D/g, "");
  if (cep.length !== 8) {
    mostrarErro("Digite um CEP com 8 números.");
    return;
  }
  mostrarCarregando();
  try {
    const endereco = await buscarCep(cep);
    mostrarEndereco(endereco);
  } catch (erro) {
    mostrarErro(erro.message);
  }
});
```

Leitura do código:

1. Quando o formulário for enviado, roda uma função assíncrona que recebe o evento.
2. preventDefault impede que a página recarregue.
3. Lê o valor do campo e remove tudo o que não é número.
4. Se o CEP não tiver exatamente 8 caracteres,
5. mostra o erro "Digite um CEP com 8 números"
6. e para a função com return.
7. Fecha o if.
8. Mostra o estado de carregando.
9. Abre um bloco try.
10. Espera o endereço da função buscarCep.
11. Mostra o endereço na tela.
12. Se deu erro, o catch recebe o erro
13. e mostra a mensagem dele na tela.

Três destaques do slide:

1. **preventDefault()** impede o formulário de recarregar a página.
2. **Validar antes** de chamar a API evita pedidos inúteis e responde na hora.
3. **Funções pequenas** com nomes claros: cada uma faz uma coisa só.

---

## Slide 17 de 19: Uma pegadinha do ViaCEP e os estados da tela

### A pegadinha

Um CEP bem formatado que não existe volta com status 200, ou seja, "deu certo", mas o corpo da resposta é:

```json
{ "erro": true }
```

O resposta.ok não pega esse caso. Precisamos conferir assim:

```javascript
const dados = await resposta.json();
if (dados.erro) {
  throw new Error("CEP não encontrado.");
}
```

Leitura: depois de converter a resposta, se existir a propriedade erro, lançamos um erro com a mensagem "CEP não encontrado".

### Os quatro estados da tela

1. **Vazio**: convida a digitar um CEP.
2. **Carregando**: botão desabilitado e texto "Buscando".
3. **Sucesso**: cartão com o endereço completo.
4. **Erro**: mensagem que diz o que fazer.

### Explicação do professor

Teste com o CEP 99999-999: status 200, mas sem endereço. Cada API tem suas particularidades, e por isso é importante ler a documentação.

---

# Encerramento

## Slide 18 de 19: Desafios para depois da aula

1. **Busca automática.** Nível fácil. Buscar sozinho quando o campo completar 8 números, sem clicar no botão.
2. **Ver no mapa.** Nível fácil. Adicionar um link que abre o endereço encontrado no OpenStreetMap.
3. **Histórico de buscas.** Nível médio. Guardar as 5 últimas buscas no localStorage e mostrá-las como atalhos.
4. **Busca reversa.** Nível difícil. Descobrir o CEP a partir de estado, cidade e rua. Exemplo de endereço: https://viacep.com.br/ws/RS/Porto Alegre/Domingos/json/.

### Explicação do professor

A busca reversa exige pelo menos 3 caracteres na cidade e na rua, e devolve uma lista de endereços em vez de um só.

---

## Slide 19 de 19: O que levamos desta aula

1. Uma API é um contrato de pedido e resposta, e o HTTP é a língua que ela fala.
2. fetch() devolve uma Promise; async e await deixam o código legível.
3. resposta.ok e try/catch cobrem os erros que o fetch sozinho não pega.
4. Toda tela que depende de rede precisa de estados: carregando, sucesso e erro.



---

## Dicas para acompanhar a parte prática com leitor de tela

- No VS Code, ative o modo de acessibilidade com Shift+Alt+F1 (no Mac, Shift+Option+F1). Ele melhora a leitura do editor pelo NVDA, JAWS e VoiceOver.
- Os erros e mensagens do JavaScript aparecem no Console das ferramentas do desenvolvedor (F12). Um console.log com uma frase clara ajuda a conferir cada passo pela leitura.
- Na página do projeto, as mensagens de carregamento e de erro são anunciadas automaticamente pelo leitor de tela, porque as áreas de status usam o atributo aria-live.
