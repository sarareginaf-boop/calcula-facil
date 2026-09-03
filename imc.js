const imcNumero = (id) => Number(document.getElementById(id).value) || 0;
document.getElementById("imc").onsubmit = (e) => {
  e.preventDefault();
  const valor = imcNumero("peso") / imcNumero("altura") ** 2;
  const faixa =
    valor < 18.5
      ? "Abaixo do peso"
      : valor < 25
        ? "Peso adequado"
        : valor < 30
          ? "Sobrepeso"
          : "Obesidade";
  document.getElementById("imcResultado").innerHTML =
    `<div class="resultado-limpo"><span>Seu IMC</span><strong>${valor.toFixed(1).replace(".", ",")}</strong><small>Classificação de referência: ${faixa}.</small></div>`;
};
document
  .querySelectorAll(".ano")
  .forEach((x) => (x.textContent = new Date().getFullYear()));
