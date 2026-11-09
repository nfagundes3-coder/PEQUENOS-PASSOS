# Pequenos Passos

Protótipo educativo para acompanhar **crescimento, conquistas e memórias** de crianças de 0 a 4 anos, com
**orientações por fase** baseadas na Caderneta da Criança (Ministério da Saúde) e na Sociedade Brasileira de Pediatria (SBP).
Tem acesso para **responsáveis** e para **médicos** (somente leitura, só dados de saúde).

> **Aviso:** protótipo educativo. Não substitui consulta nem atendimento de urgência (SAMU: 192).
> O conteúdo de saúde ainda precisa de revisão por profissional antes de qualquer uso real.

## Estrutura

| Pasta/arquivo | O que é |
|---|---|
| `public/index.html` | O app inteiro (HTML, CSS e JavaScript em um arquivo) |
| `public/img/` | Mascote e ícones (logo, favicon, ícone de tela inicial) |
| `assets/logo-512.png` | Logo em alta resolução para cartaz, apresentação e redes |
| `public/fonts/` | Fontes Nunito e Nunito Sans (licença livre OFL), hospedadas junto com o app |
| `supabase/setup.sql` | Banco de dados das contas na nuvem (opcional) |
| `docs/` | Documentação: projeto, teste na feira e publicação |
| `tests/smoke.test.js` | Teste automático que simula o uso do app |
| `tools/gerar_qr.py` | Gera o QR code do endereço final do app |
| `netlify.toml` | Configuração de publicação (publica só a pasta `public`) |

## Como usar

- **Ver no computador:** abra `public/index.html` no navegador. Para simular a publicação: `npm start`.
- **Testar:** `npm install` e depois `npm test`.
- **Publicar:** veja `docs/03-publicacao.md`.

## Dois modos

1. **Demonstração (padrão):** contas e dados ficam só no aparelho de quem usa. Não há coleta. Tem botões de **exemplo**
   com uma criança fictícia. A senha do modo demonstração não tem proteção de servidor: não use dados reais.
2. **Nuvem (opcional):** preencha `CFG` no início do script em `public/index.html` com a URL e a chave **anon** do seu
   projeto Supabase (veja `docs/03-publicacao.md`). Nunca coloque a chave `service_role` no código.

## Configurações no `public/index.html`

- `CFG={url:'',key:''}`: conexão com a nuvem (vazio = modo demonstração).
- `FEEDBACK_URL`: link do formulário de opinião (por exemplo, Google Forms). Aparece no menu de perfil.
- `VER`: número da versão, mostrado no menu de perfil.

## Licenças

As fontes têm licença SIL OFL 1.1 (arquivos em `public/fonts/`). Defina a licença do código antes de tornar o repositório público.
