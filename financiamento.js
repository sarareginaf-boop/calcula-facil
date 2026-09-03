const fn = (id) => Number(document.getElementById(id).value) || 0;
const brl = (v) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
document.getElementById("financiamento").onsubmit = (e) => {
  e.preventDefault();
  const v = fn("valor"),
    i = fn("taxa") / 100,
    n = fn("prazo"),
    price = i ? (v * (i * (1 + i) ** n)) / ((1 + i) ** n - 1) : v / n;
  let primeiro = price,
    ultimo = price,
    total = price * n;
  if (document.getElementById("sistema").value === "sac") {
    const a = v / n;
    primeiro = a + v * i;
    ultimo = a + a * i;
    total = (n * (primeiro + ultimo)) / 2;
  }
  document.getElementById("fResultado").innerHTML =
    `<p>Primeira parcela<strong>${brl(primeiro)}</strong></p><p>Última parcela<strong>${brl(ultimo)}</strong></p><p>Total estimado<strong>${brl(total)}</strong></p>`;
};
document
  .querySelectorAll(".ano")
  .forEach((x) => (x.textContent = new Date().getFullYear()));
