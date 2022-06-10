function seleciona(prato, pratos, foiSelecionado) {
  if (prato.lastElementChild.classList[0] == "corretoSelecionado") {
    prato.lastElementChild.classList.remove("corretoSelecionado");
    prato.lastElementChild.classList.add("correto");
    prato.classList.toggle("selecionado");
    foiSelecionado = 0;
  } else {
    for (const x of pratos) {
      x.className = "prato";
      x.lastElementChild.classList.remove("corretoSelecionado");
      x.lastElementChild.classList.add("correto");
    }

    foiSelecionado = 1;
    prato.classList.toggle("selecionado");
    prato.lastElementChild.classList.remove("correto");
    prato.lastElementChild.classList.add("corretoSelecionado");
  }
  return foiSelecionado;
}

function liberaBotao(botao, numSelecionados, botaoEstaAtivado) {
  if (numSelecionados == 3) {
    botao.classList.add("botaoLiberado");
    botao.innerHTML = "Fechar pedido";
    botaoEstaAtivado = true;
  } else {
    botao.classList.remove("botaoLiberado");
    botao.innerHTML = "Selecione os 3 itens <br />para fechar o pedido";
    botaoEstaAtivado = false;
  }
}

const pratos = document.querySelectorAll("div.secaoPrato div.prato");
console.log(pratos);

const bebidas = document.querySelectorAll("div.secaoBebida div.prato");
console.log(bebidas);

const sobremesas = document.querySelectorAll("div.secaoSobremesa div.prato");
console.log(bebidas);

const botao = document.querySelector("button");

let numSelecionados = 0;
let a = 0;
let b = 0;
let c = 0;

let botaoEstaAtivado = false;
let carrinho = {
  pratoSelecionado: [],
  preco: [],
};

for (let prato of pratos) {
  prato.addEventListener("click", function () {
    a = seleciona(prato, pratos, a);
    if (a === 1) {
      carrinho.pratoSelecionado[0] = prato.children[1].innerText;
      carrinho.preco[0] = prato.children[3].innerText;
      //converte para numero
      carrinho.preco[0] = Number(
        carrinho.preco[0].substring(3).replace(",", ".")
      );
    } else if (a === 0) {
      carrinho.pratoSelecionado[0] = "";
      carrinho.preco[0] = "";
    }

    numSelecionados = a + b + c;
    liberaBotao(botao, numSelecionados, botaoEstaAtivado);
  });
}

for (let bebida of bebidas) {
  bebida.addEventListener("click", function () {
    b = seleciona(bebida, bebidas, b);
    if (b === 1) {
      carrinho.pratoSelecionado[1] = bebida.children[1].innerText;
      carrinho.preco[1] = bebida.children[3].innerText;
      //converte para numero
      carrinho.preco[1] = Number(
        carrinho.preco[1].substring(3).replace(",", ".")
      );
    } else if (b === 0) {
      carrinho.pratoSelecionado[1] = "";
      carrinho.preco[1] = "";
    }

    numSelecionados = a + b + c;
    liberaBotao(botao, numSelecionados, botaoEstaAtivado);
  });
}

for (let sobremesa of sobremesas) {
  sobremesa.addEventListener("click", function () {
    c = seleciona(sobremesa, sobremesas, c);
    if (c === 1) {
      carrinho.pratoSelecionado[2] = sobremesa.children[1].innerText;
      carrinho.preco[2] = sobremesa.children[3].innerText;
      //converte para numero
      carrinho.preco[2] = Number(
        carrinho.preco[2].substring(3).replace(",", ".")
      );
    } else if (c === 0) {
      carrinho.pratoSelecionado[2] = "";
      carrinho.preco[2] = "";
    }

    numSelecionados = a + b + c;
    liberaBotao(botao, numSelecionados, botaoEstaAtivado);
  });
}
let frase = "";
let linkWpp = "";

botao.addEventListener("click", function () {
  //adiciona HTML dos pratos
  pedidos = document.querySelectorAll(".pedido");
  for (let i = 0; i < pedidos.length; i++) {
    pedidos[i].children[0].innerHTML = carrinho.pratoSelecionado[i];
    pedidos[i].children[1].innerHTML =
      "R$ " + carrinho.preco[i].toFixed(2).replace(".", ",");
  }

  valorTotal = document.querySelector(".valorTotal");
  valorTotal.innerHTML = `R$ ${(
    carrinho.preco[0] +
    carrinho.preco[1] +
    carrinho.preco[2]
  )
    .toFixed(2)
    .replace(".", ",")}`;

  //Tela de confirmacao de compra
  painelConfirmacao = document.querySelector(".sobretela");
  painelConfirmacao.classList.toggle("apagado");
});

botaoConfirmar = document.querySelector(".confirmar");
botaoCancelar = document.querySelector(".cancelar");

botaoCancelar.addEventListener("click", function () {
  painelConfirmacao.classList.toggle("apagado");
});

botaoConfirmar.addEventListener("click", function () {
  // Pergunta o endereco
  let nome = "";
  let endereco = "";

  while (nome == "") {
    nome = prompt("Qual é o seu nome? ");

    if (nome == "") alert("Digite seu nome corretamente");
  }

  while (endereco == "") {
    endereco = prompt("Qual seu endereço? ");

    if (endereco == "") alert("Digite seu endereco corretamente");
  }

  // Envia a mensagem
  if (numSelecionados === 3 && nome && endereco) {
    frase = `Olá, gostaria de fazer o pedido: \n
  - Prato: ${carrinho.pratoSelecionado[0]}  \n
  - Bebida: ${carrinho.pratoSelecionado[1]}  \n
  - Sobremesa: ${carrinho.pratoSelecionado[2]}  \n
  Total: R$ ${(carrinho.preco[0] + carrinho.preco[1] + carrinho.preco[2])
    .toFixed(2)
    .replace(".", ",")} \n \n
  Nome: ${nome} \n
  Endereço: ${endereco}
    `;

    pedido = encodeURIComponent(frase);

    linkWpp = "https://wa.me/5531993605558?text=" + pedido;

    open(linkWpp);
  }
});
