const UM_DIA = 86400000;
const lerData = (valor) => { const [a, m, d] = valor.split("-").map(Number); return new Date(Date.UTC(a, m - 1, d)); };
const adicionarMes = (data, diaPreferido = data.getUTCDate()) => {
  const ano = data.getUTCFullYear(), mes = data.getUTCMonth();
  const ultimo = new Date(Date.UTC(ano, mes + 2, 0)).getUTCDate();
  return new Date(Date.UTC(ano, mes + 1, Math.min(diaPreferido, ultimo)));
};
const adicionarAno = (data) => {
  const ano = data.getUTCFullYear(), mes = data.getUTCMonth(), dia = data.getUTCDate();
  const ultimo = new Date(Date.UTC(ano + 1, mes + 1, 0)).getUTCDate();
  return new Date(Date.UTC(ano + 1, mes, Math.min(dia, ultimo)));
};
const copiar = (data) => new Date(data.getTime());

document.getElementById("datas").addEventListener("submit", (evento) => {
  evento.preventDefault();
  let inicial = lerData(document.getElementById("inicio").value);
  let final = lerData(document.getElementById("fim").value);
  if (final < inicial) [inicial, final] = [final, inicial];
  const incluiFinal = document.getElementById("incluir").value === "sim";
  const total = Math.round((final - inicial) / UM_DIA) + (incluiFinal ? 1 : 0);
  let uteis = 0;
  for (let cursor = copiar(inicial); cursor < final || (incluiFinal && cursor <= final); cursor.setUTCDate(cursor.getUTCDate() + 1)) {
    const dia = cursor.getUTCDay();
    if (dia !== 0 && dia !== 6) uteis += 1;
  }
  const diaPreferido = inicial.getUTCDate();
  let cursor = copiar(inicial), anos = 0, meses = 0;
  while (adicionarAno(cursor) <= final) { cursor = adicionarAno(cursor); anos += 1; }
  while (adicionarMes(cursor, diaPreferido) <= final) { cursor = adicionarMes(cursor, diaPreferido); meses += 1; }
  const dias = Math.round((final - cursor) / UM_DIA) + (incluiFinal ? 1 : 0);
  const partes = [anos && `${anos} ano(s)`, meses && `${meses} mês(es)`, `${dias} dia(s)`].filter(Boolean).join(", ");
  document.getElementById("resultado").innerHTML = `<p>Total corrido<strong>${total} dia(s)</strong></p><p>Em semanas<strong>${Math.floor(total / 7)} semana(s) e ${total % 7} dia(s)</strong></p><p>Período de calendário<strong>${partes}</strong></p><p>Dias úteis, sem feriados<strong>${uteis} dia(s)</strong></p>`;
});
const hoje = new Date();
const depois = new Date(hoje); depois.setDate(depois.getDate() + 30);
const isoLocal = (data) => new Date(data.getTime() - data.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
document.getElementById("inicio").value = isoLocal(hoje);
document.getElementById("fim").value = isoLocal(depois);
document.querySelectorAll(".ano").forEach((x) => (x.textContent = new Date().getFullYear()));
