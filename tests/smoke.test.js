// Teste de fumaça: simula o uso do app em modo demonstração (sem nuvem).
// Rodar: npm install && npm test
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');
const errs = [];
let falhas = 0;
const ok = (msg, cond) => { console.log((cond ? 'OK     ' : 'FALHOU ') + msg); if (!cond) falhas++; };

const dom = new JSDOM(html, {
  url: 'https://exemplo.netlify.app/', runScripts: 'dangerously', pretendToBeVisual: true,
  beforeParse(w) {
    w.confirm = () => true; w.scrollTo = () => {};
    Object.defineProperty(w, 'crypto', { value: require('crypto').webcrypto });
    w.TextEncoder = TextEncoder;
    w.HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); };
    w.HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); };
    w.addEventListener('error', e => errs.push(e.message));
    w.addEventListener('unhandledrejection', e => errs.push(String(e.reason)));
  },
});
const w = dom.window, d = w.document, $ = i => d.getElementById(i);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const click = async s => { const el = typeof s === 'string' ? d.querySelector(s) : s; if (!el) throw new Error('não achei ' + s); el.dispatchEvent(new w.MouseEvent('click', { bubbles: true })); await sleep(60); };
const iso = x => x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0');

(async () => {
  try {
    await sleep(200);
    ok('tela de entrada com exemplo', $('app').textContent.includes('Quer só conhecer o app?'));
    ok('nome Pequenos Passos e nenhum resquício do nome antigo', html.includes('<title>Pequenos Passos</title>') && !html.includes('Crescer Junto'));
    ok('logo e ícones existem', ['logo-96.webp','logo-320.webp','favicon-64.png','apple-touch-icon.png'].every(f => fs.existsSync(path.join(__dirname, '..', 'public', 'img', f))));
    ok('mascote na tela de entrada', !!d.querySelector('.mascot img') && d.querySelector('.top').classList.contains('lo'));
    ok('fontes locais (sem Google Fonts)', !html.includes('fonts.googleapis.com'));
    ok('subtítulo do cabeçalho com cor própria e legível', html.includes('.top small{color:var(--hs)'));
    await click('[data-a=eye]'); ok('mostrar/ocultar senha', $('ap').type === 'text');
    $('ae').value = 'x@y.com'; await click('[data-a=forgot]'); ok('recuperar senha explica o modo demonstração', $('ar').textContent.includes('demonstração'));

    // responsável (exemplo)
    await click('[data-a=demo][data-v=responsavel]');
    ok('exemplo do responsável abre', $('h1').textContent.includes('Bia'));
    ok('início mostra crescimento e próxima consulta', $('app').textContent.includes('Crescimento') && $('app').textContent.includes('Próxima consulta'));
    ok('cabeçalho grande no Início', !d.querySelector('.top').classList.contains('sm'));
    await click('[data-a=tab][data-v=e]'); ok('gráfico de crescimento', !!d.querySelector('svg.ch polyline'));
    ok('cabeçalho compacto nas outras abas', d.querySelector('.top').classList.contains('sm'));
    await click('[data-a=tab][data-v=g]');
    ok('guia: cartões em camadas (lista + bloco do pediatra)', d.querySelectorAll('details.cd').length === 4 && !!d.querySelector('.cd ul') && !!d.querySelector('.cd .when'));
    await click('[data-a=ph][data-v="0"]');
    ok('guia: sinais de perigo com destaque', !!d.querySelector('details.cd.al'));
    await click('[data-a=sub][data-k=g][data-v=a]'); ok('apoio traz o CVV 188', $('app').textContent.includes('188'));

    // tema claro, lembretes, vacinas e livro Premium
    ok('tema claro por padrão', d.documentElement.getAttribute('data-theme') === 'light' && html.includes('--ha:#DCE7FF'));
    await click('[data-a=tab][data-v=i]'); ok('lembretes no Início', $('app').textContent.includes('Lembretes'));
    await click('[data-a=tab][data-v=h]'); await click('[data-a=sub][data-k=s][data-v=v]');
    ok('tabela de vacinas do SUS preenchida', d.querySelectorAll('.vc').length > 25 && d.querySelectorAll('.vc.ok').length > 10);
    const conferir = d.querySelectorAll('.vc.chk').length; ok('doses "para conferir" aparecem (' + conferir + ')', conferir >= 1);
    await click('.vc.chk'); ok('abre o registro da dose', $('dlg').hasAttribute('open') && $('dlg').textContent.includes('Data em que foi aplicada'));
    $('f1').value = iso(new Date()); await click('[data-a=vsave]'); ok('registrar uma dose reduz o "para conferir"', d.querySelectorAll('.vc.chk').length === conferir - 1);
    await click('.vc.now, .vc.fut'); ok('dose futura oferece lembrete (Google Agenda e .ics)', $('dlg').textContent.includes('Google Agenda') && $('dlg').textContent.includes('.ics')); await click('[data-a=x]');
    await click('[data-a=vt][data-v=p]'); ok('tabela de particulares com meningocócica B registrada', d.querySelector('.vt').textContent.includes('Meningocócica B') && d.querySelectorAll('.vc.ok').length >= 3);
    await click('[data-a=vcustom]'); $('f2').value = 'Vacina teste'; await click('[data-a=vsave]'); ok('outra vacina registrada', $('app').textContent.includes('Outras vacinas registradas'));
    await click('[data-a=tab][data-v=m]'); ok('livro: convite ao Premium', $('app').textContent.includes('1 ano de assinatura Premium'));
    await click('[data-a=prem]'); await click('[data-a=premgo]'); ok('Premium simulado ativo com contagem', $('app').textContent.includes('Premium ativo (simulação)') && $('app').textContent.includes('Faltam'));
    await click('[data-a=premsim]'); ok('após 1 ano: pedir o livro', $('app').textContent.includes('Pedir meu livro'));
    await click('[data-a=book]'); ok('pedido registra interesse (sem compra real)', $('dlg').textContent.includes('ainda não existe neste protótipo')); await click('[data-a=premno]');
    ok('cancelar volta ao convite', $('app').textContent.includes('Conhecer o Premium'));

    // várias crianças + menu de perfil
    await click('[data-a=pf]'); ok('menu de perfil abre', $('dlg').hasAttribute('open') && $('dlg').textContent.includes('Crianças'));
    ok('perfil traz código do médico', /[0-9a-f]{8}/.test($('dlg').textContent));
    await click('[data-a=addch]'); $('cn').value = 'Leo'; $('cb').value = iso(new Date(new Date().getFullYear(), new Date().getMonth() - 3, 10)); await click('[data-a=savech]');
    ok('segunda criança cadastrada', $('h1').textContent === 'Leo');
    ok('fichas de crianças no Início', d.querySelectorAll('.av').length === 2);
    await click('.av[data-v]:not([aria-pressed=true])'); ok('troca de criança', $('h1').textContent.includes('Bia'));

    // médico (exemplo)
    await click('[data-a=pf]'); await click('[data-a=logout]');
    ok('saiu', $('app').textContent.includes('Entrar'));
    await click('[data-a=demo][data-v=medico]');
    ok('área do médico', $('sub').textContent === 'Área do médico');
    const cartao = d.querySelector('.card.row'); ok('lista de pacientes usa o estilo corrigido', !!cartao && html.includes('.card.row{padding:14px 16px'));
    await click('[data-a=view]');
    const txt = $('app').textContent;
    ok('médico vê medidas e dúvidas', txt.includes('Peso') && txt.includes('introdução de novos alimentos'));
    ok('médico NÃO vê memórias', !txt.includes('Primeiro aniversário'));
    ok('médico vê as vacinas registradas', txt.includes('Vacinas registradas') && txt.includes('Meningocócica B'));
    ok('visão somente leitura', d.body.classList.contains('ro'));
  } catch (e) { falhas++; console.log('FALHA GERAL: ' + e.message + '\n' + e.stack); }
  console.log('erros de página:', errs.length ? errs : 'nenhum');
  if (errs.length) falhas++;
  console.log(falhas ? '\n' + falhas + ' problema(s)' : '\nTudo certo.');
  process.exit(falhas ? 1 : 0);
})();
