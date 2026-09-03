const moeda = (n) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    n,
  );
const r = document.getElementById("pResultado");
const destaque = (titulo, valor, descricao) =>
  `<div class="resultado-limpo"><span>${titulo}</span><strong>${valor}</strong><small>${descricao}</small></div>`;
document.querySelectorAll(".aba").forEach(
  (b) =>
    (b.onclick = () => {
      document
        .querySelectorAll(".aba")
        .forEach((x) => x.classList.remove("ativa"));
      b.classList.add("ativa");
      document
        .querySelectorAll(".painel")
        .forEach((x) => (x.hidden = x.id !== b.dataset.painel));
      r.textContent = "Preencha os dados e calcule.";
    }),
);
document.getElementById("p1").onsubmit = (e) => {
  e.preventDefault();
  let x = +perc.value,
    y = +base.value;
  r.innerHTML = destaque(
    `${x}% de ${moeda(y)}`,
    moeda((y * x) / 100),
    "Valor correspondente à porcentagem informada.",
  );
};
document.getElementById("p2").onsubmit = (e) => {
  e.preventDefault();
  let x = +valor2.value,
    y = +perc2.value,
    op = operacao.value,
    z = op === "desconto" ? x * (1 - y / 100) : x * (1 + y / 100);
  r.innerHTML = destaque(
    `Valor final com ${op} de ${y}%`,
    moeda(z),
    `Valor inicial: ${moeda(x)}.`,
  );
};
document.getElementById("p3").onsubmit = (e) => {
  e.preventDefault();
  let x = +inicial.value,
    y = +final.value,
    z = ((y - x) / x) * 100;
  r.innerHTML = destaque(
    "Variação percentual",
    `${z.toFixed(2).replace(".", ",")}%`,
    `${z >= 0 ? "Aumento" : "Redução"} de ${moeda(Math.abs(y - x))}.`,
  );
};
document
  .querySelectorAll(".ano")
  .forEach((x) => (x.textContent = new Date().getFullYear()));
