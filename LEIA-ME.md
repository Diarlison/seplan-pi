# Planejamento SEPLAN-PI — site para duas ou mais pessoas

Site publicável, sem login. Cada pessoa tem o próprio painel e enxerga o do colega.
Funciona no computador e no celular.

> **Prova: 10/10/2026 (sábado, manhã).** Cronograma de 9 semanas, de 10/08 a 10/10,
> com 42 tópicos, 3 simulados completos, 1 simulado parcial e 3 estudos de caso.

---

## Como funciona o seletor de pessoa

No topo da página existe um seletor com os nomes. Ele faz duas coisas:

- **Um clique** no nome → o painel inteiro passa a mostrar (e editar) os dados daquela pessoa.
- **Dois cliques** no nome → renomeia. Já vem com *Diarlison* e *Colega*; troque para os nomes de vocês.
- **Botão +** → adiciona mais pessoas. Não há limite: cada uma ganha o próprio painel, e todas aparecem no Comparativo.

A aba **Comparativo** mostra os dois lado a lado: barras de comparação, um cartão com os números de cada um e uma tabela de tópicos indicando quem já concluiu o quê.

---

## Passo 1 — Publicar (obrigatório)

### 1.1 Criar o repositório

1. Acesse **github.com**, entre na conta e clique em **+ → New repository**.
2. **Repository name**: `seplan-pi`
3. Marque **Public** (exigência do GitHub Pages gratuito).
4. Clique em **Create repository**.

### 1.2 Enviar os arquivos

Clique em **uploading an existing file** e arraste **todos** os arquivos desta pasta:

```
index.html
manifest.webmanifest
sw.js
icon-192.png
icon-512.png
icon-maskable-512.png
apple-touch-icon.png
favicon.png
```

Clique em **Commit changes**.

### 1.3 Ligar o GitHub Pages

1. No repositório: **Settings → Pages**.
2. **Source**: *Deploy from a branch*.
3. **Branch**: `main`, pasta `/ (root)` → **Save**.
4. Espere 1 a 2 minutos e recarregue. Aparece o endereço:

```
https://SEU-USUARIO.github.io/seplan-pi/
```

Pronto: já dá para usar. Envie esse link para a outra pessoa.

> **Neste ponto**, cada aparelho guarda seus próprios dados. Você não verá o progresso do colega ainda. Para isso, faça o passo 2.

---

## Passo 2 — Compartilhar o progresso entre vocês

Só é necessário se vocês quiserem ver o painel um do outro. Leva cerca de 10 minutos, e **apenas uma pessoa** precisa fazer.

### 2.1 Criar o projeto

1. Em **supabase.com**, clique em *Start your project* e entre.
2. **New project**:
   - **Name**: `seplan-pi`
   - **Database Password**: gere e guarde (não será usada no dia a dia).
   - **Region**: `South America (São Paulo)`.
3. **Create new project** e aguarde uns 2 minutos.

### 2.2 Criar a tabela

1. Menu lateral → **SQL Editor** → **New query**.
2. Abra o arquivo **`supabase-setup.sql`** desta pasta, copie tudo, cole e clique em **Run**.
3. Deve aparecer *Success. No rows returned*.

### 2.3 Copiar as chaves

Vá em **Settings → API** e copie:

- **Project URL** — `https://xxxxx.supabase.co`
- **anon public** — texto longo começando com `eyJ...`

### 2.4 Colar no site

Abra o **`index.html`** num editor de texto. Logo no começo do script está:

```js
const SUPABASE_URL  = "COLE_AQUI_A_URL";
const SUPABASE_ANON = "COLE_AQUI_A_CHAVE";
```

Troque pelos seus valores, mantendo as aspas:

```js
const SUPABASE_URL  = "https://xxxxx.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6...";
```

Salve, volte ao GitHub e envie o `index.html` novamente (**Add file → Upload files**, por cima do antigo).

Feito. Em cerca de 25 segundos os painéis passam a se atualizar sozinhos entre os aparelhos.

---

## Passo 3 — Deixar com cara de app no celular

**Android (Chrome)**: abra o link → três pontinhos → **Adicionar à tela inicial**.

**iPhone (Safari)**: abra o link no Safari → botão de compartilhar → **Adicionar à Tela de Início**.

**Computador (Chrome/Edge)**: ícone de instalar na barra de endereço.

---

## Combinado importante entre vocês

Cada um deve **escolher o próprio nome no seletor antes de marcar qualquer coisa**. Se você marcar estando no nome do colega, o progresso vai para o painel errado.

Dica: a escolha fica gravada em cada aparelho. Você seleciona seu nome uma vez no seu celular e ele lembra.

---

## Sobre segurança

Sem login, **quem tiver o link consegue ver e editar** os dois painéis. Para duas pessoas combinadas isso costuma ser suficiente — basta não divulgar o endereço. O repositório público expõe apenas o código, nunca os dados.

Se precisar de senha por pessoa, me peça a versão com login: ela existe e é só trocar os arquivos.

---

## Se algo não funcionar

| Sintoma | O que verificar |
|---|---|
| Indicador mostra "Só neste aparelho" | Normal antes do passo 2. Depois dele, confira se a URL e a chave foram coladas com as aspas |
| Não vejo o progresso do colega | O passo 2 não foi concluído, ou o `index.html` novo não foi enviado ao GitHub |
| "Salvo só aqui" | O SQL não foi executado, ou foi em outro projeto. Refaça o 2.2 |
| Marquei no nome errado | Troque para o nome certo e refaça; no perfil errado, clique no status até voltar a *Não estudado* |
| Página em branco | Espere 2 minutos; confira se o arquivo se chama `index.html` e está na raiz |
| Mudanças não aparecem | No `sw.js`, troque `VERSION` para um número novo e reenvie |

---

## Custo

Nada. GitHub Pages: 100 GB de tráfego por mês. Supabase gratuito: 500 MB — este site usa alguns kilobytes.

Um detalhe: projeto Supabase sem acesso por **7 dias seguidos** entra em pausa; basta abrir o painel e clicar em *Restore*. Usando na rotina, não acontece.
