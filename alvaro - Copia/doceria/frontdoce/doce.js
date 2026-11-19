
const API_URL = "http://localhost:3000/produtos";

const productsContainer = document.getElementById("products");
const productStatus = document.getElementById("product-status");
const cartCount = document.getElementById("cart-count");

// Recupera os produtos do carrinho
function obterCarrinho() {

    try {
        return JSON.parse(localStorage.getItem("carrinho")) || [];
    } catch {
        return [];
    }

}

// Atualiza o contador do cabeçalho
function atualizarContador() {

    const carrinho = obterCarrinho();

    const quantidade = carrinho.reduce(
        (total, produto) => total + Number(produto.quantidade),
        0
    );

    cartCount.textContent = quantidade;

}

// READ - buscar produtos no backend
async function carregarProdutos() {

    try {

        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar produtos");
        }

        const produtos = await resposta.json();

        productsContainer.innerHTML = "";

        if (produtos.length === 0) {

            productStatus.textContent = "Nenhum doce cadastrado.";

            return;
        }

        productStatus.textContent = "";

        // Mostra somente o primeiro produto
        const produto = produtos[0];

        productsContainer.innerHTML = `

            <div class="product">

                <div class="product-image">
                🧁
                </div>

                <h3>${escaparHTML(produto.nome)}</h3>

                <p class="product-price">
                    ${formatarPreco(produto.preco)}
                </p>

                <button class="add-button" id="add-button">
                    🛒 Adicionar ao carrinho
                </button>

            </div>

        `;

        document.getElementById("add-button")
            .addEventListener("click", () => adicionarCarrinho(produto));

    } catch (erro) {

        console.error("Erro:", erro);

        productStatus.textContent =
            "Não foi possível conectar ao servidor.";

    }

}

// CREATE - adicionar produto ao carrinho
function adicionarCarrinho(produto) {

    const carrinho = obterCarrinho();

    // Verifica se o produto já existe
    const existente = carrinho.find(
        item => String(item.id) === String(produto.id)
    );

    if (existente) {

        existente.quantidade++;

    } else {

        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: Number(produto.preco),
            quantidade: 1
        });

    }

    // Salva o carrinho
    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

    atualizarContador();

    alert("Produto adicionado ao carrinho!");

}

// Formata os preços
function formatarPreco(valor) {

    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}

// Protege a exibição do nome
function escaparHTML(valor) {

    return String(valor).replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[caractere]);

}

// Inicializa a página
atualizarContador();
carregarProdutos();
