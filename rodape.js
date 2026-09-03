const n = (id) => Number(document.getElementById(id).value) || 0;
document.getElementById("rodape").onsubmit = (e) => {
  e.preventDefault();
  const linear = Math.max(0, n("perimetro") - n("vaos")),
    comPerda = linear * (1 + n("perda") / 100),
    pecas = Math.ceil(comPerda / n("comprimento"));
  document.getElementById("rodResultado").innerHTML =
    `<p>Rodapé necessário<strong>${linear.toFixed(2).replace(".", ",")} m lineares</strong></p><p>Com margem de recorte<strong>${comPerda.toFixed(2).replace(".", ",")} m</strong></p><p>Peças estimadas<strong>${pecas} peças</strong></p>`;
};
document
  .querySelectorAll(".ano")
  .forEach((x) => (x.textContent = new Date().getFullYear()));
