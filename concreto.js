const form = document.getElementById("concreto");
const resultado = document.getElementById("resultado");
const formato = document.getElementById("formato");
const retangular = document.getElementById("retangular");
const cilindrico = document.getElementById("cilindrico");
const quantidade = document.getElementById("quantidade");
const margem = document.getElementById("margem");
const comprimento = document.getElementById("comprimento");
const largura = document.getElementById("largura");
const espessura = document.getElementById("espessura");
const diametro = document.getElementById("diametro");
const altura = document.getElementById("altura");
formato.addEventListener("change", () => {
  retangular.hidden = formato.value !== "retangular";
  cilindrico.hidden = formato.value !== "cilindrico";
});
const n = (valor) => new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 3 }).format(valor);
form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const qtd = Number(quantidade.value);
  const adicional = Number(margem.value);
  let unitario;
  if (formato.value === "retangular") {
    const c = Number(comprimento.value), l = Number(largura.value), e = Number(espessura.value) / 100;
    if (![c, l, e].every((x) => Number.isFinite(x) && x > 0)) return (resultado.textContent = "Informe todas as dimensões retangulares.");
    unitario = c * l * e;
  } else {
    const raio = Number(diametro.value) / 200, h = Number(altura.value);
    if (![raio, h].every((x) => Number.isFinite(x) && x > 0)) return (resultado.textContent = "Informe o diâmetro e a altura.");
    unitario = Math.PI * raio ** 2 * h;
  }
  if (!Number.isFinite(qtd) || qtd < 1 || !Number.isFinite(adicional) || adicional < 0) return (resultado.textContent = "Confira a quantidade e a margem.");
  const liquido = unitario * qtd;
  const total = liquido * (1 + adicional / 100);
  resultado.innerHTML = `<p>Volume geométrico<strong>${n(liquido)} m³</strong></p><p>Margem adicional<strong>${n(total - liquido)} m³</strong></p><p>Total estimado<strong>${n(total)} m³</strong></p><small>Arredonde a compra conforme o fornecimento disponível.</small>`;
});
document.querySelectorAll(".ano").forEach((x) => (x.textContent = new Date().getFullYear()));
