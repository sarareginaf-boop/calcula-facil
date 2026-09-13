const conjuntos = {
  comprimento: {
    unidades: [
      ["Milímetro (mm)", 0.001],
      ["Centímetro (cm)", 0.01],
      ["Metro (m)", 1],
      ["Quilômetro (km)", 1000],
      ["Polegada (in)", 0.0254],
      ["Pé (ft)", 0.3048],
      ["Jarda (yd)", 0.9144],
      ["Milha (mi)", 1609.344],
    ],
    padrao: ["Metro (m)", "Pé (ft)"],
  },
  peso: {
    unidades: [
      ["Miligrama (mg)", 0.000001],
      ["Grama (g)", 0.001],
      ["Quilograma (kg)", 1],
      ["Tonelada (t)", 1000],
      ["Onça (oz)", 0.028349523125],
      ["Libra (lb)", 0.45359237],
    ],
    padrao: ["Quilograma (kg)", "Libra (lb)"],
  },
  area: {
    unidades: [
      ["Centímetro quadrado (cm²)", 0.0001],
      ["Metro quadrado (m²)", 1],
      ["Quilômetro quadrado (km²)", 1000000],
      ["Hectare (ha)", 10000],
      ["Pé quadrado (ft²)", 0.09290304],
      ["Jarda quadrada (yd²)", 0.83612736],
      ["Acre (ac)", 4046.8564224],
    ],
    padrao: ["Metro quadrado (m²)", "Pé quadrado (ft²)"],
  },
  volume: {
    unidades: [
      ["Mililitro (mL)", 0.001],
      ["Litro (L)", 1],
      ["Metro cúbico (m³)", 1000],
      ["Onça líquida EUA (fl oz)", 0.0295735295625],
      ["Xícara EUA (cup)", 0.2365882365],
      ["Pinta EUA (pt)", 0.473176473],
      ["Galão EUA (gal)", 3.785411784],
      ["Galão imperial (UK gal)", 4.54609],
    ],
    padrao: ["Litro (L)", "Galão EUA (gal)"],
  },
};

const categoria = document.body.dataset.categoria;
const configuracao = conjuntos[categoria];
const formulario = document.getElementById("conversor");
const valor = document.getElementById("valor");
const origem = document.getElementById("origem");
const destino = document.getElementById("destino");
const resultado = document.getElementById("resultado");

for (const [rotulo, fator] of configuracao.unidades) {
  origem.add(new Option(rotulo, fator));
  destino.add(new Option(rotulo, fator));
}

origem.selectedIndex = configuracao.unidades.findIndex(
  ([rotulo]) => rotulo === configuracao.padrao[0],
);
destino.selectedIndex = configuracao.unidades.findIndex(
  ([rotulo]) => rotulo === configuracao.padrao[1],
);

const formatar = (numero) =>
  new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 8,
  }).format(Math.abs(numero) < 1e-12 ? 0 : numero);

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const numero = Number(valor.value);
  if (!Number.isFinite(numero)) {
    resultado.textContent = "Informe um valor válido.";
    return;
  }
  const convertido = (numero * Number(origem.value)) / Number(destino.value);
  resultado.innerHTML = `<div class="resultado-limpo"><span>${formatar(numero)} ${origem.options[origem.selectedIndex].text}</span><strong>${formatar(convertido)}</strong><small>${destino.options[destino.selectedIndex].text}</small></div>`;
});

document
  .querySelectorAll(".ano")
  .forEach((elemento) => (elemento.textContent = new Date().getFullYear()));
