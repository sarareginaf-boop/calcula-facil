const val = (id) => Number(document.getElementById(id).value) || 0;
const dimensao = (select, l, a) => {
  const x = document.getElementById(select).value;
  if (x === "custom") return val(l) * val(a);
  return x
    .split("x")
    .map(Number)
    .reduce((p, n) => p * n, 1);
};
const alterna = (select, bloco) =>
  document
    .getElementById(select)
    .addEventListener(
      "change",
      (e) =>
        (document.getElementById(bloco).hidden = e.target.value !== "custom"),
    );
alterna("medidaPorta", "portaCustom");
alterna("medidaJanela", "janelaCustom");
document.getElementById("adicionarAbertura").onclick = () => {
  const item = document.createElement("div");
  item.className = "abertura-extra";
  item.innerHTML =
    '<label>Quantidade<input class="extra-qtd" type="number" min="1" placeholder="Ex.: 1"></label><label>Largura (m)<input class="extra-l" type="number" step="0.01" placeholder="Ex.: 1,20"></label><label>Altura (m)<input class="extra-a" type="number" step="0.01" placeholder="Ex.: 2,10"></label><button class="remover-extra" type="button">Remover</button>';
  item.querySelector(".remover-extra").onclick = () => item.remove();
  document.getElementById("extras").append(item);
};
document.getElementById("calc").addEventListener("submit", (event) => {
  event.preventDefault();
  const bruta = val("largura") * val("altura") * val("paredes");
  let aberturas =
    val("portas") * dimensao("medidaPorta", "portaL", "portaA") +
    val("janelas") * dimensao("medidaJanela", "janelaL", "janelaA");
  document
    .querySelectorAll(".abertura-extra")
    .forEach(
      (x) =>
        (aberturas +=
          (Number(x.querySelector(".extra-qtd").value) || 0) *
          (Number(x.querySelector(".extra-l").value) || 0) *
          (Number(x.querySelector(".extra-a").value) || 0)),
    );
  const area = Math.max(0, bruta - aberturas),
    litros = ((area * val("demaos")) / val("rendimento")) * 1.1,
    latas36 = Math.ceil(litros / 3.6);
  document.getElementById("area").textContent =
    area.toFixed(2).replace(".", ",") + " m²";
  document.getElementById("litros").textContent =
    litros.toFixed(2).replace(".", ",") + " L";
  document.getElementById("latas").textContent =
    latas36 + (latas36 === 1 ? " lata de 3,6 L" : " latas de 3,6 L");
  document.getElementById("vazio").hidden = true;
  document.getElementById("resposta").hidden = false;
});
document.getElementById("ano").textContent = new Date().getFullYear();
