function calcularExpressao(texto) {
  const tokens = texto
    .replace(/,/g, ".")
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .match(/sqrt|sin|cos|tan|log|ln|\d*\.?\d+|[()+\-*/^]/gi);
  if (
    !tokens ||
    tokens.join("") !==
      texto.replace(
        /[\s,×÷]/g,
        (c) => ({ ",": ".", "×": "*", "÷": "/" })[c] || "",
      )
  )
    throw new Error();
  let posicao = 0;
  const proximo = () => tokens[posicao];
  const consumir = () => tokens[posicao++];
  const expressao = () => {
    let valor = termo();
    while (["+", "-"].includes(proximo()))
      valor = consumir() === "+" ? valor + termo() : valor - termo();
    return valor;
  };
  const termo = () => {
    let valor = potencia();
    while (["*", "/"].includes(proximo()))
      valor = consumir() === "*" ? valor * potencia() : valor / potencia();
    return valor;
  };
  const potencia = () => {
    let valor = fator();
    if (proximo() === "^") {
      consumir();
      valor **= potencia();
    }
    return valor;
  };
  const fator = () => {
    const token = consumir();
    if (token === "+") return fator();
    if (token === "-") return -fator();
    if (token === "(") {
      const valor = expressao();
      if (consumir() !== ")") throw new Error();
      return valor;
    }
    if (/^\d/.test(token)) return Number(token);
    if (
      ["sqrt", "sin", "cos", "tan", "log", "ln"].includes(
        token.toLowerCase(),
      ) &&
      consumir() === "("
    ) {
      const valor = expressao();
      if (consumir() !== ")") throw new Error();
      const nome = token.toLowerCase();
      if (nome === "sqrt") return Math.sqrt(valor);
      if (nome === "log") return Math.log10(valor);
      if (nome === "ln") return Math.log(valor);
      const radianos = (valor * Math.PI) / 180;
      return nome === "sin"
        ? Math.sin(radianos)
        : nome === "cos"
          ? Math.cos(radianos)
          : Math.tan(radianos);
    }
    throw new Error();
  };
  const resultado = expressao();
  if (posicao !== tokens.length || !Number.isFinite(resultado))
    throw new Error();
  return resultado;
}

document.getElementById("cientifica").onsubmit = (e) => {
  e.preventDefault();
  try {
    const r = calcularExpressao(document.getElementById("expressao").value);
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
