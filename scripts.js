function seleciona(prato, pratos) {
  if (prato.lastElementChild.classList[0] == "corretoSelecionado") {
    prato.lastElementChild.classList.remove("corretoSelecionado");
    prato.lastElementChild.classList.add("correto");
    prato.classList.toggle("selecionado");
  } else {
    for (const x of pratos) {
      x.className = "prato";
      x.lastElementChild.classList.remove("corretoSelecionado");
      x.lastElementChild.classList.add("correto");
    }

    prato.classList.toggle("selecionado");
    prato.lastElementChild.classList.remove("correto");
    prato.lastElementChild.classList.add("corretoSelecionado");
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

for (let prato of pratos) {
  prato.addEventListener("click", function () {
    seleciona(prato, pratos);
    a = 1;
    numSelecionados = a + b + c;
    if (numSelecionados >= 3) {
      botao.classList.add("botaoLiberado");
      botao.innerText = "Fechar pedido";
    }
  });
}

for (let bebida of bebidas) {
  bebida.addEventListener("click", function () {
    seleciona(bebida, bebidas);
    b = 1;
    numSelecionados = a + b + c;
    if (numSelecionados >= 3) {
      botao.classList.add("botaoLiberado");
      botao.innerText = "Fechar pedido";
    }
  });
}

for (let sobremesa of sobremesas) {
  sobremesa.addEventListener("click", function () {
    seleciona(sobremesa, sobremesas);
    c = 1;
    numSelecionados = a + b + c;
    if (numSelecionados >= 3) {
      botao.classList.add("botaoLiberado");
      botao.innerText = "Fechar pedido";
    }
  });
}
