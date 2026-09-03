const moedas = {BRL:'Real brasileiro (BRL)', USD:'Dólar americano (USD)', EUR:'Euro (EUR)', GBP:'Libra esterlina (GBP)', ARS:'Peso argentino (ARS)', CAD:'Dólar canadense (CAD)', CHF:'Franco suíço (CHF)'};
for (const [sigla,nome] of Object.entries(moedas)) {
  for (const id of ['de','para']) document.getElementById(id).add(new Option(nome,sigla));
}
document.getElementById('de').value = 'USD';
document.getElementById('para').value = 'BRL';
const fmt = (numero, moeda) => new Intl.NumberFormat('pt-BR',{style:'currency',currency:moeda}).format(numero);
async function taxaParaReal(sigla) {
  if (sigla === 'BRL') return 1;
  const resposta = await fetch(`https://economia.awesomeapi.com.br/json/last/${sigla}-BRL`);
  if (!resposta.ok) throw new Error('Cotação indisponível');
  const dados = await resposta.json();
  return Number(dados[`${sigla}BRL`].ask);
}
document.getElementById('conversor').addEventListener('submit', async event => {
  event.preventDefault();
  const botao = event.submitter; botao.disabled = true; botao.textContent = 'Consultando cotação…';
  try {
    const de = document.getElementById('de').value, para = document.getElementById('para').value;
    const valor = Number(document.getElementById('valor').value), percentual = Number(document.getElementById('taxa').value) || 0;
    const [origem, destino] = await Promise.all([taxaParaReal(de), taxaParaReal(para)]);
    const cotacao = origem / destino, convertido = valor * cotacao, taxa = convertido * percentual / 100;
    document.getElementById('cotacao').textContent = `1 ${de} = ${fmt(cotacao, para)}`;
    document.getElementById('convertido').textContent = fmt(convertido, para);
    document.getElementById('linha-taxa').hidden = percentual === 0;
    document.getElementById('linha-total').hidden = percentual === 0;
    document.getElementById('valor-taxa').textContent = fmt(taxa, para);
    document.getElementById('total').textContent = fmt(convertido + taxa, para);
    document.getElementById('atualizacao').textContent = `Cotação consultada em ${new Date().toLocaleString('pt-BR')}.`;
    document.getElementById('aguarde').hidden = true; document.getElementById('resultado-conversao').hidden = false;
  } catch (erro) { document.getElementById('aguarde').textContent = 'Não foi possível consultar a cotação agora. Tente novamente em alguns instantes.'; }
  finally { botao.disabled = false; botao.textContent = 'Converter agora'; }
});
document.getElementById('ano').textContent = new Date().getFullYear();
