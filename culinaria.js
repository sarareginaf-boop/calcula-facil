const ingredientes = [
  ["Açúcar refinado", 198],
  ["Açúcar mascavo compactado", 213],
  ["Açúcar de confeiteiro", 113],
  ["Farinha de trigo", 120],
  ["Farinha de amêndoas", 96],
  ["Farinha de arroz", 142],
  ["Polvilho ou fécula de tapioca", 113],
  ["Amido de milho", 112],
  ["Cacau em pó", 84],
  ["Aveia em flocos", 89],
  ["Arroz cru", 198],
  ["Manteiga", 226],
  ["Leite", 227],
  ["Óleo vegetal", 198],
  ["Mel", 336],
  ["Sal de mesa", 288],
  ["Coco ralado adoçado", 85],
  ["Gotas de chocolate", 170],
  ["Banana amassada", 227],
  ["Purê de maçã", 255],
];

const ingrediente = document.getElementById("ingrediente");
const quantidade = document.getElementById("quantidade");
const capacidade = document.getElementById("capacidade");

for (const [nome, gramasPorXicaraPadrao] of ingredientes) {
  ingrediente.add(new Option(nome, gramasPorXicaraPadrao));
}

const form = document.getElementById("culinaria");
const resultado = document.getElementById("resultado");
const formatar = (n) => new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 }).format(n);

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const qtd = Number(quantidade.value);
  const ml = Number(capacidade.value);
  if (![qtd, ml].every((n) => Number.isFinite(n) && n > 0)) {
    resultado.textContent = "Informe uma quantidade e uma capacidade válidas.";
    return;
  }
  const gramas = qtd * ml * (Number(ingrediente.value) / 240);
  const nome = ingrediente.options[ingrediente.selectedIndex].text;
  resultado.innerHTML = `<div class="resultado-limpo"><span>${formatar(qtd)} xícara(s) de ${formatar(ml)} mL de ${nome}</span><strong>${formatar(gramas)} g</strong><small>Equivalência aproximada; pode variar conforme o ingrediente é acomodado.</small></div>`;
});
document.querySelectorAll(".ano").forEach((x) => (x.textContent = new Date().getFullYear()));
