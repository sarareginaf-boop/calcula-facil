const form = document.getElementById("viagem");
const resultado = document.getElementById("resultado");
const distancia = document.getElementById("distancia");
const unidadeDistancia = document.getElementById("unidadeDistancia");
const trajeto = document.getElementById("trajeto");
const consumo = document.getElementById("consumo");
const unidadeConsumo = document.getElementById("unidadeConsumo");
const preco = document.getElementById("preco");
const unidadePreco = document.getElementById("unidadePreco");
const moeda = document.getElementById("moeda");
const pedagios = document.getElementById("pedagios");
const GALAO_US_LITROS = 3.785411784;
const MILHA_KM = 1.609344;

const numero = (valor, casas = 2) =>
  new Intl.NumberFormat("pt-BR", { maximumFractionDigits: casas }).format(valor);
const dinheiro = (valor, codigo) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: codigo }).format(valor);

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const distanciaInformada = Number(distancia.value);
  const consumoInformado = Number(consumo.value);
  const precoInformado = Number(preco.value);
  const totalPedagios = Number(pedagios.value);
  if (![distanciaInformada, consumoInformado, precoInformado].every((n) => Number.isFinite(n) && n > 0) || !Number.isFinite(totalPedagios) || totalPedagios < 0) {
    resultado.textContent = "Confira os valores informados.";
    return;
  }
  const distanciaKm = distanciaInformada * (unidadeDistancia.value === "mi" ? MILHA_KM : 1) * Number(trajeto.value);
  let litros;
  if (unidadeConsumo.value === "kml") litros = distanciaKm / consumoInformado;
  if (unidadeConsumo.value === "l100") litros = (distanciaKm * consumoInformado) / 100;
  if (unidadeConsumo.value === "mpg") litros = (distanciaKm / MILHA_KM / consumoInformado) * GALAO_US_LITROS;
  const custoCombustivel = precoInformado * (unidadePreco.value === "galao" ? litros / GALAO_US_LITROS : litros);
  const custoTotal = custoCombustivel + totalPedagios;
  resultado.innerHTML = `<p>Distância total<strong>${numero(distanciaKm)} km</strong></p><p>Combustível estimado<strong>${numero(litros)} L</strong></p><p>Custo do combustível<strong>${dinheiro(custoCombustivel, moeda.value)}</strong></p><p>Pedágios<strong>${dinheiro(totalPedagios, moeda.value)}</strong></p><p>Custo total da viagem<strong>${dinheiro(custoTotal, moeda.value)}</strong></p><small>Estimativa baseada nos dados informados.</small>`;
});
document.querySelectorAll(".ano").forEach((x) => (x.textContent = new Date().getFullYear()));
