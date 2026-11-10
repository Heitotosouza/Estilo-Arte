const produtos = [
    {
        id: 1,
        nome: "Camiseta Basic Algodão",
        categoria: "masculino",
        preco: 59.90,
        imagem: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 2,
        nome: "Jaqueta Jeans Classic",
        categoria: "masculino",
        preco: 189.90,
        imagem: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 3,
        nome: "Calça Jeans Slim",
        categoria: "masculino",
        preco: 129.90,
        imagem: "https://images.unsplash.com/photo-1542272604-780c36856d62?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 4,
        nome: "Vestido Floral de Verão",
        categoria: "feminino",
        preco: 119.90,
        imagem: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 5,
        nome: "Blusa Elegante Satin",
        categoria: "feminino",
        preco: 89.90,
        imagem: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 6,
        nome: "Saia Midi Plissada",
        categoria: "feminino",
        preco: 99.90,
        imagem: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 7,
        nome: "Conjunto Infantil Verão",
        categoria: "infantil",
        preco: 69.90,
        imagem: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 8,
        nome: "Casaco Infantil Moletom",
        categoria: "infantil",
        preco: 79.90,
        imagem: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 9,
        nome: "Macacão Bebê Confort",
        categoria: "infantil",
        preco: 49.90,
        imagem: "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&q=80&w=400"
    }
];

let carrinho = [];

document.addEventListener("DOMContentLoaded", () => {
    renderizarProdutos(produtos);
});

function renderizarProdutos(listaProdutos) {
    const container = document.getElementById("produtos-container");
    container.innerHTML = "";

    if (listaProdutos.length === 0) {
        container.innerHTML = "<p>Nenhum produto encontrado nesta categoria.</p>";
        return;
    }

    listaProdutos.forEach(produto => {
        const card = document.createElement("div");
        card.className = "produto-card";

        let classeCategoria = "";
        if (produto.categoria === "masculino") classeCategoria = "cat-masculino";
        if (produto.categoria === "feminino") classeCategoria = "cat-feminino";
        if (produto.categoria === "infantil") classeCategoria = "cat-infantil";

        card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" class="produto-img">
            <div class="produto-info">
                <span class="tag-categoria ${classeCategoria}">${produto.categoria}</span>
                <h3 class="produto-title">${produto.nome}</h3>
                <div class="produto-preco">R$ ${produto.preco.toFixed(2).replace('.', ',')}</div>
                <button class="btn-primary" onclick="adicionarAoCarrinho(${produto.id})">
                    <i class="fa-solid fa-cart-plus"></i> Adicionar
                </button>
            </div>
        `;

        container.appendChild(card);
    });
}

function filtrarProdutos(categoria) {
    const botoes = document.querySelectorAll(".filter-btn");
    botoes.forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");

    if (categoria === "todos") {
        renderizarProdutos(produtos);
    } else {
        const produtosFiltrados = produtos.filter(p => p.categoria === categoria);
        renderizarProdutos(produtosFiltrados);
    }
}

function navegarPara(paginaId) {
    const paginas = document.querySelectorAll(".page");
    paginas.forEach(p => p.classList.remove("active"));

    const links = document.querySelectorAll("nav a");
    links.forEach(l => l.classList.remove("active"));

    document.getElementById(`page-${paginaId}`).classList.add("active");
    document.getElementById(`nav-${paginaId}`).classList.add("active");

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function adicionarAoCarrinho(idProduto) {
    const produto = produtos.find(p => p.id === idProduto);
    const itemExistente = carrinho.find(item => item.id === idProduto);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }

    atualizarCarrinho();
    mostrarToast();
}

function removerDoCarrinho(idProduto) {
    carrinho = carrinho.filter(item => item.id !== idProduto);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const cartCount = document.getElementById("cart-count");
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    cartCount.innerText = totalItens;

    const carrinhoItensContainer = document.getElementById("carrinho-itens");
    const carrinhoTotal = document.getElementById("carrinho-total");

    if (carrinho.length === 0) {
        carrinhoItensContainer.innerHTML = "<p style='text-align:center; color: var(--text-light);'>Seu carrinho está vazio.</p>";
        carrinhoTotal.innerText = "R$ 0,00";
        return;
    }

    carrinhoItensContainer.innerHTML = "";
    let valorTotal = 0;

    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        valorTotal += subtotal;

        const itemDiv = document.createElement("div");
        itemDiv.className = "carrinho-item";
        itemDiv.innerHTML = `
            <div>
                <strong>${item.nome}</strong><br>
                <small>${item.quantidade}x R$ ${item.preco.toFixed(2).replace('.', ',')}</small>
            </div>
            <div>
                <span style="font-weight:bold; margin-right: 10px;">R$ ${subtotal.toFixed(2).replace('.', ',')}</span>
                <button class="btn-remove" onclick="removerDoCarrinho(${item.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        carrinhoItensContainer.appendChild(itemDiv);
    });

    carrinhoTotal.innerText = `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
}

function toggleCarrinho() {
    const modal = document.getElementById("carrinho-modal");
    modal.style.display = (modal.style.display === "flex") ? "none" : "flex";
}

window.onclick = function(event) {
    const modal = document.getElementById("carrinho-modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

function mostrarToast() {
    const toast = document.getElementById("toast");
    toast.className = "toast show";
    setTimeout(() => {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    alert("Obrigado pela compra! Pedido finalizado com sucesso (Simulação).");
    carrinho = [];
    atualizarCarrinho();
    toggleCarrinho();
}

function enviarMensagem(event) {
    event.preventDefault();
    document.getElementById("form-contato").reset();
    const mensagemSucesso = document.getElementById("contato-sucesso");
    mensagemSucesso.style.display = "block";
    setTimeout(() => {
        mensagemSucesso.style.display = "none";
    }, 4000);
}

                                                                              
