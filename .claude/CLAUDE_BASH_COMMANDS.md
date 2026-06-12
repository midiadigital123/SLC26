# CLAUDE_BASH_COMMANDS.md

Referência de comandos bash com casos reais deste projeto.
**Sem duplicações** — cada padrão de comando aparece uma única vez, mesmo que tenha sido executado várias vezes.

---

## Como ler este arquivo

Cada entrada contém um título descritivo, o comando exato, o que ele faz parte por parte, e o resultado real que produziu neste projeto.

---

## Referência

### 1. Verificar se um diretório existe

```bash
ls /home/otavio.peres/Development/RNC\ 2026/RNC/2025-1/.claude/ 2>/dev/null && echo "existe" || echo "não existe"
```

**O que faz:** Tenta listar o conteúdo de um diretório. O `2>/dev/null` descarta qualquer mensagem de erro (como "no such file or directory"), tornando o teste silencioso. O `&&` executa o segundo comando apenas se o `ls` tiver sucesso (código de saída 0); o `||` executa o terceiro apenas se falhar.

**Resultado:** Retornou "existe" e listou os arquivos `COMMANDS_CLAUDE.md` e `init.md` dentro de `.claude/`.

---

### 2. Contar ocorrências de um texto em um arquivo

```bash
grep -c "Regra ativa: Registro de Comandos Bash" "/home/otavio.peres/Development/RNC 2026/RNC/2025-1/CLAUDE.md" 2>/dev/null && echo "seção já existe" || echo "seção não existe"
```

**O que faz:** O `grep -c` conta quantas linhas do arquivo contêm o padrão buscado, retornando um número. Se encontrar ao menos uma ocorrência, o exit code é `0` (sucesso) e o `&&` imprime "seção já existe"; se não encontrar nenhuma, o `||` imprime "seção não existe".

**Resultado:** Retornou "seção não existe", confirmando que a seção ainda não havia sido adicionada ao `CLAUDE.md`.

---

### 3. Verificar se um arquivo específico existe

```bash
ls "/home/otavio.peres/Development/RNC 2026/RNC/2025-1/.claude/CLAUDE_BASH_COMMANDS.md" 2>/dev/null && echo "existe" || echo "não existe"
```

**O que faz:** Usa `ls` em um único arquivo para testar sua existência. O padrão `2>/dev/null && echo ... || echo ...` é o mesmo do item 1 — silencia o erro e bifurca a resposta com base no exit code.

**Resultado:** Retornou "não existe", confirmando que o arquivo ainda precisava ser criado.

---

### 4. Adicionar arquivos novos/não rastreados ao stage

```bash
git add CLAUDE.md .claude/ Sispae-gestores-40h/
```

**O que faz:** Adiciona ao index (área de staging) os arquivos e diretórios listados. Diretórios são adicionados recursivamente. Útil quando se quer controle explícito sobre o que entra no próximo commit, evitando incluir arquivos sensíveis acidentalmente.

**Resultado:** Staged 2 arquivos avulsos (`CLAUDE.md`, `.claude/CLAUDE_BASH_COMMANDS.md`) e toda a árvore de `Sispae-gestores-40h/2026-1/` (JS, CSS, JSON, imagens).

---

### 5. Adicionar ao stage apenas arquivos já rastreados (deletados/modificados)

```bash
git add -u RNC/
```

**O que faz:** A flag `-u` (update) instrui o git a atualizar o index apenas para arquivos que ele já conhece — capturando deleções e modificações, mas ignorando arquivos novos não rastreados. Útil para stagear um conjunto grande de deleções sem correr o risco de incluir arquivos indesejados.

**Resultado:** Staged ~170 deleções de `RNC/2025-1/` sem tocar em arquivos novos fora desse caminho.

---

### 6. Criar um commit com mensagem multilinha via heredoc

```bash
git commit -m "$(cat <<'EOF'
chore: mensagem principal

Corpo do commit com mais detalhes.
EOF
)"
```

**O que faz:** Usa substituição de comando `$()` com `cat <<'EOF'` para passar uma mensagem multilinha sem precisar de aspas escapadas. As aspas simples em `'EOF'` evitam que o shell expanda variáveis dentro do heredoc. Garante formatação correta independentemente de caracteres especiais na mensagem.

**Resultado:** Criou o commit `a2860ca` com 199 arquivos alterados (8972 inserções, 5589 deleções).

---

### 7. Enviar branch local para o repositório remoto

```bash
git push
```

**O que faz:** Envia os commits locais da branch atual para o remote configurado (origin). Sem flags adicionais, usa o upstream já configurado para a branch. Se a branch ainda não tiver upstream, é necessário `git push -u origin <branch>`.

**Resultado:** Atualizou `main` no remote `https://github.com/midiadigital123/SLC26.git` do hash `38a7120` para `a2860ca`.

