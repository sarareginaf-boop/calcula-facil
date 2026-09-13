const form = document.getElementById("economia");
const resultado = document.getElementById("resultado");
const formatarDinheiro = (valor, codigo) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: codigo }).format(valor);

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const alvo = Number(document.getElementById("meta").value);
  const saldo = Number(document.getElementById("inicial").value);
  const prazo = Number(document.getElementById("meses").value);
  const anual = Number(document.getElementById("taxa").value || 0);
  const codigo = document.getElementById("moeda").value;
  if (![alvo, saldo, prazo, anual].every(Number.isFinite) || alvo <= 0 || saldo < 0 || prazo < 1 || anual < 0) {
    resultado.textContent = "Confira os valores informados.";
    return;
  }
  if (saldo >= alvo) {
    resultado.innerHTML = `<div class="resultado-limpo"><span>Sua meta já foi alcançada.</span><strong>${formatarDinheiro(saldo, codigo)}</strong></div>`;
    return;
  }
  const mensal = (1 + anual / 100) ** (1 / 12) - 1;
  const saldoFuturo = saldo * (1 + mensal) ** prazo;
  const fatorAportes = mensal === 0 ? prazo : ((1 + mensal) ** prazo - 1) / mensal;
  const aporte = (alvo - saldoFuturo) / fatorAportes;
  const aporteSeguro = Math.max(0, aporte);
  const aportado = aporteSeguro * prazo;
  const saldoFinal = saldoFuturo + aporteSeguro * fatorAportes;
  const rendimento = saldoFinal - saldo - aportado;
  resultado.innerHTML = `<p>Guardar por mês<strong>${formatarDinheiro(aporteSeguro, codigo)}</strong></p><p>Total dos depósitos mensais<strong>${formatarDinheiro(aportado, codigo)}</strong></p><p>Rendimento estimado<strong>${formatarDinheiro(Math.max(0, rendimento), codigo)}</strong></p><p>Saldo final estimado<strong>${formatarDinheiro(saldoFinal, codigo)}</strong></p>`;
});
document.querySelectorAll(".ano").forEach((x) => (x.textContent = new Date().getFullYear()));
