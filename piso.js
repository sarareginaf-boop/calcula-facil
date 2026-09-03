const numero = (id) => Number(document.getElementById(id).value) || 0;
const texto = (valor, unidade = "") =>
  `${valor.toFixed(2).replace(".", ",")}${unidade}`;

document.getElementById("piso").onsubmit = (evento) => {
  evento.preventDefault();
  const area = numero("comp") * numero("larg");
  const fator = 1 + numero("perda") / 100;
  const areaComPerda = area * fator;
  const comprimentoPeca = numero("pecaC");
  const larguraPeca = numero("pecaL");
  const areaPeca = (comprimentoPeca / 100) * (larguraPeca / 100);
  const pecas = Math.ceil(areaComPerda / areaPeca);
  const caixas = Math.ceil(areaComPerda / numero("caixa"));
  const pc = comprimentoPeca * 10;
  const pl = larguraPeca * 10;
  const rejunte =
    ((pc + pl) / (pc * pl)) *
    numero("junta") *
    numero("esp") *
    1.6 *
    areaComPerda;
  let rodape = "";
  const perimetro = numero("perimetro");
  const alturaRodape = numero("alturaRodape");
  if (
    perimetro > 0 &&
    alturaRodape > 0 &&
    (comprimentoPeca > 0 || larguraPeca > 0)
  ) {
    const metrosLineares = Math.max(0, perimetro - numero("vaos"));
    const ladoMaior = Math.max(comprimentoPeca, larguraPeca) / 100;
    const tirasPorPeca = Math.floor(
      Math.max(comprimentoPeca, larguraPeca) / alturaRodape,
    );
    const pecasRodape =
      tirasPorPeca > 0
        ? Math.ceil((metrosLineares * fator) / (ladoMaior * tirasPorPeca))
        : 0;
    rodape = `<p>Rodapé estimado<strong>${texto(metrosLineares, " m lineares")}</strong></p><p>Peças extras para o rodapé<strong>${pecasRodape} peças</strong></p>`;
  }
  document.getElementById("prResultado").innerHTML =
    `<p>Área do ambiente<strong>${texto(area, " m²")}</strong></p><p>Área com perda<strong>${texto(areaComPerda, " m²")}</strong></p><p>Peças estimadas<strong>${pecas} peças</strong></p><p>Caixas de piso<strong>${caixas} caixas</strong></p><p>Rejunte aproximado<strong>${texto(rejunte, " kg")}</strong></p>${rodape}`;
};

document
  .querySelectorAll(".ano")
  .forEach((elemento) => (elemento.textContent = new Date().getFullYear()));
