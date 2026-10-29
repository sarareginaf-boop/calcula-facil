'use strict';
function calcularVenda({custo,outros,fixa,taxas,impostos,modo,preco,margem}) {
  const valores=[custo,outros,fixa,taxas,impostos];
  if(valores.some(v=>!Number.isFinite(v)||v<0)) throw Error('Preencha os custos e as taxas com números válidos, iguais ou maiores que zero.');
  const percentual=(taxas+impostos)/100, custos=custo+outros+fixa;
  if(!Number.isFinite(custos)||percentual>=1) throw Error('A soma das taxas e dos impostos deve ser menor que 100%.');
  if(modo==='preco') {
    if(!Number.isFinite(margem)||margem<0||percentual+margem/100>=1) throw Error('Taxas, impostos e margem desejada devem somar menos de 100%.');
    if(custos===0) throw Error('Informe algum custo em reais para calcular um preço a partir da margem desejada.');
    preco=Math.ceil((custos/(1-percentual-margem/100))*100-1e-8)/100;
  }
  if(!Number.isFinite(preco)||preco<=0) throw Error('Informe um preço de venda maior que zero.');
  const valorTaxas=preco*taxas/100,valorImpostos=preco*impostos/100;
  const lucro=preco-custos-valorTaxas-valorImpostos;
  const equilibrio=Math.ceil(custos/(1-percentual)*100-1e-8)/100;
  if(![lucro,equilibrio,valorTaxas,valorImpostos].every(Number.isFinite)) throw Error('Os valores informados são muito altos. Reduza os valores e tente novamente.');
  return {preco,custos,valorTaxas,valorImpostos,lucro,margem:lucro/preco*100,equilibrio,total:preco-lucro};
}
if(typeof module!=='undefined') module.exports={calcularVenda};
if(typeof document!=='undefined') {
 const $=id=>document.getElementById(id), form=$('calculadora'), modo=$('modo');
 const inicial='Preencha os campos e clique em calcular.';
 const limpar=()=>{$('resultado').textContent=inicial;$('erro').hidden=true;};
 document.getElementById('ano').textContent=new Date().getFullYear();
 modo.addEventListener('change',()=>{
   const definir=modo.value==='preco';
   $('campo-preco').hidden=definir;$('preco').disabled=definir;$('preco').required=!definir;
   $('campo-margem').hidden=!definir;$('margem').disabled=!definir;$('margem').required=definir;
   form.querySelector('[type=submit]').textContent=definir?'Calcular preço de venda':'Calcular lucro';limpar();
 });
 form.addEventListener('input',limpar);
 $('exemplo').addEventListener('click',()=>{for(const [k,v] of Object.entries({custo:20,outros:5,fixa:2,taxas:10,impostos:5,preco:50,margem:30}))$(k).value=v;limpar();form.requestSubmit();});
 const moeda=v=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
 form.addEventListener('submit',e=>{
   e.preventDefault();limpar();
   try {
     const d={modo:modo.value};for(const id of ['custo','outros','fixa','taxas','impostos','preco','margem'])d[id]=$(id).value.trim()===''?NaN:Number($(id).value);
     const r=calcularVenda(d), resultado=$('resultado');resultado.textContent='';
     const linhas=[['Preço de venda',moeda(r.preco)],['Custos em reais (inclui tarifa fixa)',moeda(r.custos)],['Taxas da plataforma',moeda(r.valorTaxas)],['Impostos',moeda(r.valorImpostos)],['Total dos custos informados',moeda(r.total)],['Lucro por venda',moeda(r.lucro)],['Margem sobre o preço',r.margem.toLocaleString('pt-BR',{maximumFractionDigits:2})+'%'],['Preço para cobrir os custos',moeda(r.equilibrio)]];
     for(const [nome,valor] of linhas){const linha=document.createElement('div');linha.className='resultado-limpo';const label=document.createElement('span'),numero=document.createElement('strong');label.textContent=nome;numero.textContent=valor;if(nome==='Lucro por venda'&&r.lucro<0)numero.style.color='#a32424';linha.append(label,numero);resultado.append(linha);}
     const resumo=document.createElement('p');resumo.textContent=r.lucro<0?`A cada venda de ${moeda(r.preco)}, faltam ${moeda(-r.lucro)} para cobrir os custos informados.`:`A cada venda de ${moeda(r.preco)}, sobram ${moeda(r.lucro)} após os custos informados.`;resultado.prepend(resumo);
   } catch(err){$('erro').textContent=err.message;$('erro').hidden=false;}
 });
}
