
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalItems = document.getElementById("total-items");
const totalPrice = document.getElementById("total-price");

// Recupera os produtos armazenados
function obterCarrinho() {

    try {
        return JSON.parse(localStorage.getItem("carrinho")) || [];
    } catch {
        return [];
    }

}

// Formata os preços em reais
function formatarPreco(valor) {

    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}

// Atualiza o carrinho na tela
function carregarCarrinho() {

    const carrinho = obterCarrinho();

    cartItems.innerHTML = "";

    let quantidade = 0;
    let total = 0;

    if (carrinho.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <span>🛒</span>
                <h3>Seu carrinho está vazio!</h3>
                <p>Que tal escolher um doce para começar?</p>
            </div>
        `;

    }

    carrinho.forEach((produto, index) => {

        const preco = Number(produto.preco);
        const qtd = Number(produto.quantidade);

        quantidade += qtd;
        total += preco * qtd;

        cartItems.innerHTML += `

            <div class="cart-item">

                <div class="item-image">
                    🧁
                </div>

                <div class="item-info">

                    <h3>${escaparHTML(produto.nome)}</h3>

                    <p>
                        ${formatarPreco(preco)}
                    </p>

                    <span class="item-quantity">
                        Quantidade: ${qtd}
                    </span>

                </div>

                <button
                    class="remove-button"
                    data-index="${index}"
                    type="button">

                    Remover

                </button>

            </div>

        `;

    });

    // Atualiza os valores do resumo
    totalItems.textContent = quantidade;
    totalPrice.textContent = formatarPreco(total);
    cartCount.textContent = quantidade;

}

// Remove um produto inteiro do carrinho
function removerProduto(index) {

    const carrinho = obterCarrinho();

    carrinho.splice(index, 1);

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

    carregarCarrinho();

}

// Evita interpretar o nome como HTML
function escaparHTML(valor) {

    return String(valor).replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[caractere]);

}

// Identifica os cliques nos botões de remover
cartItems.addEventListener("click", function(event) {

    const botao = event.target.closest(".remove-button");

    if (!botao) return;

    const index = Number(botao.dataset.index);

    removerProduto(index);

});

// Carrega os produtos ao abrir a página
carregarCarrinho();
