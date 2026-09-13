const formulario = document.getElementById("temperatura");
const valor = document.getElementById("valor");
const origem = document.getElementById("origem");
const destino = document.getElementById("destino");
const resultado = document.getElementById("resultado");

const unidades = {
  C: { nome: "Celsius", simbolo: "°C", minimo: -273.15 },
  F: { nome: "Fahrenheit", simbolo: "°F", minimo: -459.67 },
  K: { nome: "Kelvin", simbolo: "K", minimo: 0 },
};

const paraCelsius = (numero, unidade) => {
  if (unidade === "F") return (numero - 32) / 1.8;
  if (unidade === "K") return numero - 273.15;
  return numero;
};

const deCelsius = (numero, unidade) => {
  if (unidade === "F") return numero * 1.8 + 32;
  if (unidade === "K") return numero + 273.15;
  return numero;
};

const formatar = (numero) => {
  const semZeroNegativo = Object.is(numero, -0) ? 0 : numero;
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 2,
  }).format(semZeroNegativo);
};

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const numero = Number(valor.value);
  const unidadeOrigem = unidades[origem.value];
  const unidadeDestino = unidades[destino.value];

  if (!Number.isFinite(numero)) {
    resultado.textContent = "Informe uma temperatura válida.";
    return;
  }

  if (numero < unidadeOrigem.minimo) {
    resultado.textContent = `O menor valor possível em ${unidadeOrigem.nome} é ${formatar(unidadeOrigem.minimo)} ${unidadeOrigem.simbolo}.`;
    return;
  }

  const convertido = deCelsius(paraCelsius(numero, origem.value), destino.value);
  resultado.innerHTML = `<div class="resultado-limpo"><span>${formatar(numero)} ${unidadeOrigem.simbolo} equivalem a</span><strong>${formatar(convertido)} ${unidadeDestino.simbolo}</strong><small>Conversão entre ${unidadeOrigem.nome} e ${unidadeDestino.nome}.</small></div>`;
});

document
  .querySelectorAll(".ano")
  .forEach((elemento) => (elemento.textContent = new Date().getFullYear()));
