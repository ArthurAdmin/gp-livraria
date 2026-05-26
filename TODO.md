# TODO — Header & Navegação (premium)

## Progresso

### 1) Ajustar navegação do header/navbar
- [x] Remover itens do menu: **Curadoria**, **Mais vendidos** e **Autores** (se existirem).
- [x] Manter identidade premium (não alterar CSS/cores/glass/estilo premium).

### 2) Renomear seção “Mais vendidos” para “Catálogo”
- [x] Localizar a seção no layout da homepage.
- [x] Trocar apenas título/label para **Catálogo**, preservando layout e cards.
- [x] Garantir que o id/anchor da seção continue correto para scroll.

### 3) Redirecionar/scroll do menu “Catálogo”
- [x] Atualizar o item do header para apontar ao anchor correto **#catalogo**.
- [x] Usar navegação por anchor (`href="#catalogo"`).

### 4) Adicionar botão de login premium no header
- [x] Inserir botão premium com visual compatível (usando GPButton).
- [x] Texto: **Entrar**.
- [x] Integrar ao layout mantendo responsividade.

### 5) Validar build/lint
- [x] Build concluído com sucesso (`next build`).
- [ ] Lint (pode estar falhando por execução via shell/terminal do Windows).
- [x] Validar manualmente: link de **Catálogo** para `#catalogo` e botão **Entrar**.


