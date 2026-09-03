const tn = (id) => Number(document.getElementById(id).value) || 0;
const tbrl = (v) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
document.getElementById("trabalhista").onsubmit = (e) => {
  e.preventDefault();
  const s = tn("salario"),
    m = tn("meses"),
    dec = (s * m) / 12,
    ferias = (dec * 4) / 3,
    fgts = s * 0.08;
  document.getElementById("tResultado").innerHTML =
    `<p>13º proporcional (bruto)<strong>${tbrl(dec)}</strong></p><p>Férias proporcionais + 1/3 (bruto)<strong>${tbrl(ferias)}</strong></p><p>FGTS mensal estimado<strong>${tbrl(fgts)}</strong></p>`;
};
document
  .querySelectorAll(".ano")
  .forEach((x) => (x.textContent = new Date().getFullYear()));
