const val = id => Number(document.getElementById(id).value) || 0;
document.getElementById('calc').addEventListener('submit', event => {
  event.preventDefault();
  const bruta = val('largura') * val('altura') * val('paredes');
  const aberturas = val('portas') * 1.47 + val('janelas') * 1.44;
  const area = Math.max(0, bruta - aberturas);
  const litros = (area * val('demaos') / val('rendimento')) * 1.1;
  const latas36 = Math.ceil(litros / 3.6);
  document.getElementById('area').textContent = area.toFixed(2).replace('.', ',') + ' m²';
  document.getElementById('litros').textContent = litros.toFixed(2).replace('.', ',') + ' L';
  document.getElementById('latas').textContent = latas36 + (latas36 === 1 ? ' lata de 3,6 L' : ' latas de 3,6 L');
  document.getElementById('vazio').hidden = true;
  document.getElementById('resposta').hidden = false;
});
document.getElementById('ano').textContent = new Date().getFullYear();
