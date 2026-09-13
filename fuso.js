const zonas = [
  ["São Paulo", "America/Sao_Paulo"], ["Buenos Aires", "America/Argentina/Buenos_Aires"],
  ["Nova York", "America/New_York"], ["Los Angeles", "America/Los_Angeles"],
  ["Cidade do México", "America/Mexico_City"], ["Lisboa", "Europe/Lisbon"],
  ["Londres", "Europe/London"], ["Madri", "Europe/Madrid"], ["Paris", "Europe/Paris"],
  ["Roma", "Europe/Rome"], ["Dubai", "Asia/Dubai"], ["Tóquio", "Asia/Tokyo"],
  ["Xangai", "Asia/Shanghai"], ["Sydney", "Australia/Sydney"], ["UTC", "UTC"],
];
const origem = document.getElementById("origem");
const destino = document.getElementById("destino");
for (const [nome, zona] of zonas) { origem.add(new Option(nome, zona)); destino.add(new Option(nome, zona)); }
destino.value = "Europe/Lisbon";

function deslocamento(data, zona) {
  const parte = new Intl.DateTimeFormat("en-US", { timeZone: zona, timeZoneName: "longOffset", hour: "2-digit" })
    .formatToParts(data).find((item) => item.type === "timeZoneName").value;
  if (parte === "GMT" || parte === "UTC") return 0;
  const achado = parte.match(/GMT([+-])(\d{2}):(\d{2})/);
  if (!achado) throw new Error("Fuso não reconhecido");
  return (achado[1] === "+" ? 1 : -1) * (Number(achado[2]) * 60 + Number(achado[3]));
}

function localParaUtc(valor, zona) {
  const [data, hora] = valor.split("T");
  const [ano, mes, dia] = data.split("-").map(Number);
  const [h, minuto] = hora.split(":").map(Number);
  const base = Date.UTC(ano, mes - 1, dia, h, minuto);
  let utc = base;
  for (let i = 0; i < 3; i += 1) utc = base - deslocamento(new Date(utc), zona) * 60000;
  return new Date(utc);
}

const formatar = (data, zona) => new Intl.DateTimeFormat("pt-BR", {
  timeZone: zona, dateStyle: "full", timeStyle: "short",
}).format(data);

document.getElementById("fuso").addEventListener("submit", (evento) => {
  evento.preventDefault();
  const valor = document.getElementById("momento").value;
  if (!valor) return;
  try {
    const instante = localParaUtc(valor, origem.value);
    const nomeOrigem = origem.options[origem.selectedIndex].text;
    const nomeDestino = destino.options[destino.selectedIndex].text;
    document.getElementById("resultado").innerHTML = `<p>${nomeOrigem}<strong>${formatar(instante, origem.value)}</strong></p><p>${nomeDestino}<strong>${formatar(instante, destino.value)}</strong></p>`;
  } catch (erro) {
    document.getElementById("resultado").textContent = "Não foi possível converter esse horário neste navegador.";
  }
});
const agora = new Date();
agora.setMinutes(agora.getMinutes() - agora.getTimezoneOffset());
document.getElementById("momento").value = agora.toISOString().slice(0, 16);
document.querySelectorAll(".ano").forEach((x) => (x.textContent = new Date().getFullYear()));
