# Pequenos Passos: documentação do projeto

*Versão 1.0 do protótipo. Documento para o grupo, a banca e a feira de negócios.*

## 1. Resumo

O **Pequenos Passos** é um app que acompanha a criança de 0 a 4 anos e muda sozinho a cada fase (0 a 12 meses, 1 a 2 anos,
2 a 3 anos e 3 a 4 anos). O responsável registra **medidas, conquistas, memórias e consultas**, consulta **orientações
por fase** baseadas em fontes oficiais e tem um **atalho de emergência (SAMU 192)**. O médico, com conta própria, vê
**somente os dados de saúde** que o responsável decidir compartilhar.

## 2. Problema e pesquisa

**Base:** 12 vídeos de canais de maternidade no YouTube (3 por fase) e cerca de 320 comentários de pais, mães e cuidadores.

**Limites da base (importante para a banca):** amostra pequena, só YouTube, só crianças de 0 a 4 anos, sem dados de idade,
renda ou região de quem comenta, e vídeos escolhidos pelo grupo. Os números abaixo vêm de uma contagem automática por
palavras-chave e são **ordens de grandeza**, não estatística.

| Tema recorrente | Estimativa de comentários | Onde aparece mais |
|---|---|---|
| "Meu filho está dentro do esperado?" (fala, atraso, comparação) | ~60 (cerca de 1 em 5) | 1 a 3 anos |
| Cuidados do recém-nascido (umbigo, amamentação, assadura, cólica) | ~40 | 0 a 11 meses |
| Birra, choro, agressividade, limites | ~38 | 1 a 4 anos |
| Esgotamento, culpa e ansiedade de quem cuida | ~26, crescendo com a idade | 2 a 4 anos |
| Escola e creche | ~24 | 2 a 4 anos |
| Desfralde e alimentação | ~23 | 2 a 3 anos |
| Sono | ~22 | 0 a 2 anos |
| Autismo, neuropediatra, diagnóstico | ~15 | 2 a 4 anos |

**Também apareceram:** orientações contraditórias entre fontes (caso claro: o umbigo), falta de rede de apoio, pais homens e
avós participando, e angústia com listas do que a criança "deveria" fazer.

**O que a pesquisa NÃO prova (hipóteses a testar):** que as pessoas queiram comunidade ou chat, lembretes, perguntas a
profissionais pelo app, álbum de memórias, ou que paguem por isso. Nenhum comentário pede essas coisas diretamente.

## 3. Público-alvo

- **Primário:** mães, pais e cuidadores principais (inclusive avós que cuidam) de crianças de 0 a 4 anos, no Brasil.
- **Perfis (agrupamentos do grupo, a validar no teste):** (A) inseguro de primeira viagem, 0 a 12 meses; (B) cuidador sobrecarregado
  com birras e limites, 1 a 4 anos; (C) cuidador preocupado com o desenvolvimento, 1 a 4 anos.
- **Secundário (hipótese):** médicos e profissionais de saúde que acompanham a criança.
- **Fora do público:** crianças acima de 4 anos (a pesquisa não cobre) e quem busca diagnóstico.

## 4. Proposta de valor

> Para quem cuida de uma criança pequena e se sente perdido a cada fase nova, o app mostra, na idade certa, o que esperar e o
> que fazer agora, guarda a história da criança e leva você ao serviço de saúde certo na hora certa.

**Diferenciais:** (1) muda com a idade da criança; (2) orientações com base na Caderneta da Criança do Ministério da Saúde e na
SBP, com as divergências sinalizadas; (3) registro de evolução e memórias no mesmo lugar; (4) visão separada para o médico,
só com dados de saúde; (5) acolhimento a quem cuida, sem comparar crianças nem cobrar prazos.

**O que o app não é:** não diagnostica, não classifica a criança como "atrasada", não substitui o pediatra e não é serviço de emergência.

## 5. Funcionalidades

**Responsável**
- Cadastro de **várias crianças** (nome e data de nascimento); fase calculada e atualizada automaticamente.
- **Início:** registrar medidas, conquistas e memórias; resumo; consultas; "nesta fase".
- **Evolução:** peso, altura e perímetro cefálico com gráfico; conquistas por fase, sem prazo.
- **Memórias:** linha do tempo com fotos, textos, conquistas e medidas, com a idade da criança em cada registro, e o **Livro Pequenos Passos**: convite ao Premium e, depois de **1 ano de assinatura**, pedido do livro impresso com as memórias (assinatura e pedido são **simulados** no protótipo).
- **Saúde:** agenda de consultas de rotina do Ministério da Saúde (datas calculadas), dúvidas para levar ao pediatra e **tabela visual de vacinas** do Calendário Nacional 2026 (SUS), com doses registradas, "na época" e "para conferir", e uma segunda tabela com as **vacinas particulares** recomendadas pela SBP. Dá para registrar também outras vacinas.
- **Lembretes:** o Início mostra o que está previsto nos próximos 60 dias (vacinas e consultas). Cada dose futura pode ser levada ao calendário do celular pelo **Google Agenda** ou por arquivo **.ics** com alerta 2 dias antes. Não há notificação push nesta versão.
- **Guia:** 17 cartões de orientação por fase e a página **Apoio** (cuidador, tristeza após o parto, CVV 188, CRAS, UBS).
- **Menu de perfil:** trocar criança, código para o médico, parar de compartilhar, cópia de segurança, compartilhar o app, sair.
- **SOS 192** sempre visível no topo.

**Médico:** lista de pacientes (adicionados por um **código de 8 caracteres** dado pelo responsável) e ficha somente leitura com
medidas, gráfico, conquistas, consultas e dúvidas. **Memórias e fotos nunca são compartilhadas.** O responsável pode encerrar o acesso a qualquer momento, e um novo código é gerado.

## 6. Jornada do usuário

1. **Gatilho:** algo acontece (birra, dúvida de fala, umbigo) e a pessoa procura ajuda.
2. **Entrada:** abre o app pelo QR code ou link; entra ou vê o **exemplo**.
3. **Cadastro mínimo:** nome e data de nascimento da criança.
4. **Resposta:** o Guia mostra, para a fase, o que costuma acontecer, o que tentar e quando conversar com o pediatra.
5. **Registro:** anota medida, conquista, memória ou dúvida.
6. **Acolhimento:** em dias difíceis, a página Apoio.
7. **Retorno:** a cada consulta ou conquista; a cada aniversário, o app avisa da nova fase.
8. **Médico:** recebe o código, adiciona o paciente e consulta a ficha antes da consulta.
9. **Urgência:** o botão SOS abre o discador do 192. O app **não avalia gravidade**.

## 7. Conteúdo e fontes

- **Principal:** *Caderneta da Criança*, Ministério da Saúde (6ª edição, 2023): umbigo, amamentação, assadura, sono, sinais de perigo, birra, limites, alimentação, desfralde, creche, sinais de alerta do desenvolvimento, calendário de consultas, saúde bucal.
- **Vacinas:** Calendário Nacional de Vacinação 2026, Ministério da Saúde (atualizado em 30/01/2026), com as mudanças de junho de 2026 (pneumocócica 20-valente) e agosto de 2026 (reforço de pólio aos 4 anos) divulgadas pelo PNI e pela SBP; Calendário de Vacinação da SBP 2026/2027 (vacinas da rede privada). Conferido em 8 de novembro de 2026: **o calendário muda, então confirme na UBS**.
- **Complementar:** SBP (cuidados com a pele do recém-nascido, sono seguro, cólica, telas); *Cartilha de Desenvolvimento* SBP/CDC ("Aja cedo": marcos de fala e comportamento); linha de cuidado do autismo do Ministério da Saúde (2025: rastreio M-CHAT entre 16 e 30 meses na atenção primária); Lei 13.010/2014 (castigo físico).
- **Divergências sinalizadas no app:** umbigo (Ministério: álcool 70%; SBP 2021: só limpo e seco).
- **Pendências:** revisão por profissional de saúde de todos os cartões; os quadros de marcos da Caderneta (págs. 81 a 86) não foram lidos, e os marcos de fala vêm da cartilha SBP/CDC; a lista de "conquistas" é sugestão do grupo, sem prazo e sem valor clínico; maisena, talco e pomadas (a Caderneta orienta não usar talco); sinais iniciais de autismo em fonte oficial.

## 8. Identidade visual e acessibilidade

- **Marca:** nome **Pequenos Passos**, slogan "Acompanhando cada pequena conquista" e mascote (um bebê segurando o celular ao lado de um médico), em `public/img/`. O azul-escuro do logo (#1028A0, contraste 11:1 sobre branco) e o violeta (#7848D0, 5,8:1) combinam com a paleta do app.
- **Cores:** **tema claro por padrão** (o modo escuro é opcional no menu de perfil). Cabeçalho em degradê pastel de azul e lilás com texto escuro; azul #4A70C8 e lilás #7762C8 nos botões (contraste de 4,7 e 4,8:1 com texto branco); uma cor suave por fase (lilás, azul, menta, pêssego). Vermelho só para SOS e alertas.
- **Fontes:** Nunito (títulos e botões) e Nunito Sans (textos), hospedadas junto com o app, sem depender de serviço externo.
- **Medidas conferidas:** texto principal com contraste de 12:1, botões e links acima de 5,7:1, bordas de campos a 3,4:1; áreas de toque de 44 a 48 px; tamanhos de letra de 12 a 28 px.

## 9. Segurança, privacidade e limites

- **Modo demonstração:** nenhum dado sai do aparelho. A senha não tem proteção de servidor: não usar dados reais.
- **Nuvem (Supabase, opcional):** regras de acesso por pessoa no banco; o médico só lê dados de saúde de crianças vinculadas pelo código. **Não verificamos o CRM:** qualquer pessoa pode criar conta de médico, mas só vê quem recebeu o código.
- Dados de saúde de crianças são sensíveis pela LGPD. Em testes, usar **dados fictícios** e consentimento dos adultos.
- Fotos na nuvem ficam dentro do banco (o app reduz o tamanho); com muitas fotos, a troca de criança pode ficar lenta.
- **Assinatura e livro:** simulados. Não há pagamento, pedido nem impressão. O estado do Premium fica só no aparelho.
- **Vacinas:** as datas são aproximadas e calculadas pelo calendário; "para conferir" não significa atraso. Os esquemas particulares variam por produto e idade de início: sempre com o pediatra.
- **Não testado:** em aparelhos reais de público, o botão do 192 em todos os modelos, o envio de fotos em todos os celulares e toda a parte da nuvem.

## 10. Modelo de negócio e próximos passos

**Hipótese do grupo:** assinatura **Premium** e, depois de **1 ano de assinatura**, a opção de pedir o **livro impresso** com as memórias da criança. Ainda **não estão definidos**: valores, outros benefícios do Premium, custo de impressão e entrega, e quem paga (família, UBS, planos de saúde). Este documento não inventa números.

**O que testar na feira:** interesse no livro (sim, talvez, não), o que esperam do Premium e a faixa de preço que consideram justa (pergunta aberta).

**Próximos passos:** revisão profissional do conteúdo; teste com público (roteiro em `02-teste-na-feira.md`); decidir o que entra na versão 2 com base em pedidos repetidos (comunidade, lembretes, notas do médico, modo offline).
