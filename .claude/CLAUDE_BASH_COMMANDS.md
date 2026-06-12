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

