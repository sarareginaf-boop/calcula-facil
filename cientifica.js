document.getElementById("cientifica").onsubmit = (e) => {
  e.preventDefault();
  try {
    let x = document
      .getElementById("expressao")
      .value.replace(/,/g, ".")
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/\^/g, "**");
    if (!/^[0-9+\-*/().\s_a-z]+$/i.test(x)) throw 0;
    x = x
      .replace(/sqrt\(/g, "Math.sqrt(")
      .replace(/log\(/g, "Math.log10(")
      .replace(/ln\(/g, "Math.log(")
      .replace(/sin\(([^()]*)\)/g, "Math.sin(($1)*Math.PI/180)")
      .replace(/cos\(([^()]*)\)/g, "Math.cos(($1)*Math.PI/180)")
      .replace(/tan\(([^()]*)\)/g, "Math.tan(($1)*Math.PI/180)");
    const r = Function("return " + x)();
    if (!Number.isFinite(r)) throw 0;
    document.getElementById("cResultado").innerHTML =
      `<div class="resultado-limpo"><span>Resultado</span><strong>${Number(r.toFixed(10)).toLocaleString("pt-BR")}</strong></div>`;
  } catch {
    document.getElementById("cResultado").textContent =
      "Não foi possível calcular. Confira a expressão e tente novamente.";
  }
};
document
  .querySelectorAll(".ano")
  .forEach((x) => (x.textContent = new Date().getFullYear()));
