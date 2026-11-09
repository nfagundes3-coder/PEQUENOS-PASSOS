# Publicação: GitHub, Netlify, nuvem (opcional) e QR code

## 1. Visão geral

`GitHub` guarda os arquivos → `Netlify` publica o app e gera o endereço → `QR code` aponta para esse endereço.
O Netlify publica só a pasta `public` (definido em `netlify.toml`), então documentos, testes e SQL ficam fora do site.

## 2. Enviar o projeto para o GitHub (GitHub Desktop)

1. Extraia a pasta `pequenos-passos` em um local fixo (por exemplo, Documentos).
2. No GitHub Desktop: **File → Add local repository** e escolha a pasta (se pedir, clique em "create a repository").
3. Confira que os arquivos aparecem em "Changes", escreva a mensagem **"Versão 1.0 do protótipo"** e clique em **Commit to main**.
4. Clique em **Publish repository**. Escolha **Keep this code private** (privado) enquanto não definirem a licença do código.
5. A cada mudança: salve, volte ao GitHub Desktop, faça o **commit** e clique em **Push origin**.

**Atenção:** nunca coloque senhas nem a chave `service_role` do Supabase no código. A chave **anon** é pública por projeto e é a única que vai no app.

## 3. Publicar no Netlify a partir do GitHub

1. Entre em app.netlify.com e crie a conta gratuita (pode entrar com o GitHub).
2. **Add new site → Import an existing project → GitHub** e escolha o repositório.
3. Deixe o comando de build **vazio**. A pasta publicada (`public`) já vem do `netlify.toml`. Clique em **Deploy**.
4. Em **Site configuration → Change site name**, escolha um nome fácil. O endereço final fica `https://nome-escolhido.netlify.app`.
5. A cada push no GitHub, o Netlify publica a versão nova sozinho (aguarde cerca de 1 minuto).

*Alternativa sem GitHub:* arraste a **pasta `public`** inteira em app.netlify.com/drop e reivindique o site (senão ele sai do ar).

## 3. Contas na nuvem (opcional, só se precisarem)

Para a feira, **recomendamos o modo demonstração** (sem nuvem): menos risco de privacidade e nada para configurar.
Use a nuvem só para demonstrar o médico em **aparelho diferente**, com **dados fictícios**.

1. Crie um projeto gratuito no Supabase.
2. **SQL Editor:** cole `supabase/setup.sql` e clique em Run.
3. **Authentication:** desative a confirmação de e-mail (apenas para o teste).
4. **Project Settings → API:** copie a **URL** e a chave **anon public**.
5. Em `public/index.html`, procure `const CFG={url:'',key:''}` e preencha.
6. Faça o commit e o push. Teste cadastro, criança, código, médico e "Esqueci minha senha".

**Limites:** a parte da nuvem **não foi testada contra um projeto real**; confira os limites atuais do plano gratuito no site do Supabase (projetos parados podem ser pausados).

## 4. Gerar o QR code

Só depois do endereço **final e estável** (nome definitivo do site, ou domínio próprio):

```
pip install "qrcode[pil]"
python tools/gerar_qr.py https://nome-escolhido.netlify.app
```

Saem `qr/qr-app.png` (tela e impressão pequena) e `qr/qr-app.svg` (impressão grande, sem perder qualidade).

**Boas práticas**
- Imprima escuro sobre fundo claro, com **margem branca** em volta; não coloque logo por cima.
- Escreva o **endereço por extenso** embaixo do QR code, para quem não conseguir ler.
- Não use encurtadores de link desconhecidos nem links temporários.
- Teste em **pelo menos um iPhone e um Android**, na distância real do estande.
- Se mudar o endereço do site, o QR code precisa ser gerado e impresso de novo.

## 5. Testes e verificação

- `npm install` e `npm test`: simula cadastro, várias crianças, exemplo, Guia, perfil, médico e acesso restrito. Rode antes de cada versão importante.
- O teste **não** substitui abrir o app em celulares de verdade.

## 6. Checklist final antes do QR code

- [ ] Revisão profissional do conteúdo de saúde (ao menos os cartões de sinais de perigo, fala e apoio) e **conferência do calendário de vacinas** com a UBS ou o pediatra (o calendário muda).
- [ ] Endereço final definido; `VER` atualizado; `FEEDBACK_URL` preenchido.
- [ ] Teste em iPhone e Android: cadastro, medida, foto de objeto, SOS 192, link do Meu SUS Digital.
- [ ] Aviso de protótipo visível e dados fictícios no estande.
- [ ] Licença do código definida antes de tornar o repositório público.
