// Array para armazenar os produtos cadastrados (simulando um banco de dados)
let produtos = [];

// Função para adicionar um novo produto ao array, salvar no localStorage e atualizar a tabela
function cadastrarProduto(event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    // Obtém os valores dos campos do formulário
    let nomeProduto = document.getElementById('nome-produto').value;
    let quantidade = document.getElementById('quantidade').value;
    let preco = document.getElementById('preco').value;

    // Cria um objeto representando o novo produto
    let novoProduto = {
        nome: nomeProduto,
        quantidade: parseInt(quantidade),
        preco: parseFloat(preco)
    };

    // Adiciona o novo produto ao array de produtos
    produtos.push(novoProduto);

    // Salva os produtos no localStorage
    salvarProdutosNoLocalStorage();

    // Limpa os campos do formulário
    document.getElementById('nome-produto').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('preco').value = '';

    // Atualiza a tabela de produtos
    atualizarTabela();
}

// Função para salvar os produtos no localStorage
function salvarProdutosNoLocalStorage() {
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

// Função para recuperar os produtos do localStorage ao carregar a página
function recuperarProdutosDoLocalStorage() {
    let produtosSalvos = localStorage.getItem('produtos');
    if (produtosSalvos) {
        produtos = JSON.parse(produtosSalvos);
    }
}

// Função para atualizar a tabela de produtos
function atualizarTabela() {
    let tabelaProdutos = document.getElementById('tabela-produtos');
    tabelaProdutos.innerHTML = ''; // Limpa o conteúdo atual da tabela

    // Itera sobre o array de produtos e cria as linhas da tabela dinamicamente
    produtos.forEach(produto => {
        let row = tabelaProdutos.insertRow();
        let cellNome = row.insertCell(0);
        let cellQuantidade = row.insertCell(1);
        let cellPreco = row.insertCell(2);
        let cellTotal = row.insertCell(3);
        let cellAcoes = row.insertCell(4);

        cellNome.innerText = produto.nome;
        cellQuantidade.innerText = produto.quantidade;
        cellPreco.innerText = produto.preco.toFixed(2); // Formata o preço com 2 casas decimais

        // Calcula e exibe o total do produto (quantidade * preço)
        let totalProduto = produto.quantidade * produto.preco;
        cellTotal.innerText = totalProduto.toFixed(2); // Formata o total com 2 casas decimais

        // Botão para excluir o produto
        let btnExcluir = document.createElement('button');
        btnExcluir.innerText = 'Excluir';
        btnExcluir.addEventListener('click', function() {
            excluirProduto(produto);
        });
        cellAcoes.appendChild(btnExcluir);
    });
}


// Função para calcular a soma dos preços dos produtos
function calcularTotalPreco() {
    let total = 0;
    produtos.forEach(produto => {
        total += produto.quantidade * produto.preco; // Multiplica a quantidade pelo preço de cada produto
    });
    return total;
}

// Função para atualizar o elemento HTML com o total calculado
function atualizarTotalPreco() {
    let total = calcularTotalPreco();
    document.getElementById('total-preco').innerText = 'Total: R$ ' + total.toFixed(2);
}

// Função para excluir um produto do array, salvar no localStorage e atualizar a tabela
function excluirProduto(produto) {
    let index = produtos.indexOf(produto);
    if (index !== -1) {
        produtos.splice(index, 1);

        // Salva os produtos atualizados no localStorage
        salvarProdutosNoLocalStorage();

        //Atualiza Total de estoque
        atualizarTotalPreco();

        // Atualiza a tabela de produtos
        atualizarTabela();
    }
}

// Adiciona um event listener para o evento 'submit' do formulário de cadastro
document.getElementById('cadastro-produto').addEventListener('submit', function(event) {
    cadastrarProduto(event);
    atualizarTotalPreco(); // Chama a função para atualizar o total de preços
});

// Recupera os produtos do localStorage ao carregar a página
recuperarProdutosDoLocalStorage();

// Depois de atualizar a tabela, atualize o total de preços
atualizarTotalPreco();

// Inicializa a tabela de produtos ao carregar a página
atualizarTabela()