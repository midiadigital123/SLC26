# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Sobre o Projeto

Este é o projeto **SisPAE Gestores 40h — 2026/1** (Sistema de Plano de Ação Educacional), um curso educacional estático desenvolvido para ser publicado na plataforma Moodle da CAED Digital. O conteúdo é servido via CDN externo:

```
https://recursos-moodle.caeddigital.net/projetos/cursos/PROSA/40H/2026-1/
```

Não há servidor local, build system, framework ou gerenciador de pacotes. O projeto é HTML/CSS/JS puro.

## Estrutura de Diretórios

O projeto vive em `Sispae-gestores-40h/2026-1/` dentro deste repositório:

```
Sispae-gestores-40h/2026-1/
  assets/
    css/
      main-bundle.css      # Todos os estilos — tokens, componentes, temas, responsividade
    js/
      main-bundle.js       # Bundle principal (IIFE) — todos os managers + ponto de entrada
      Quiz.js              # Versão standalone do QuizManager (uso independente)
      teste-capricho.js    # Versão standalone do TesteCapricho (uso independente)
      teste-capricho-old.js
    data/
      quiz1-a1-t3.json     # Dados de quiz (formato padrão)
      quiz1-a3-t1.json
      quiz2-a3-t1.json
      quiz1-t1.json
      quiz1-t4.json
      teste-capricho.json  # Dados do Teste de Perfil (formato distinto)
  content/
    img/
      img1.png … img9.png  # Imagens de cards/conteúdo
      moodle-quiz-final01.gif
      padrao.png
      preparar-investigar-agir.png
    docs/
      SisPAE_2026_guia_implementacao_gestores_40h.pdf
      PA 2025 - Av Somativa - Matriz - LP.pdf
      PA 2025 - Av Somativa - Matriz - MT.pdf
```

## Namespace CSS

**Todo o CSS é escopado** sob a classe raiz `.sispae-gestores-40h-2026-1`. Nunca escreva regras CSS globais — tudo deve viver dentro desse seletor.

```css
/* Correto */
.sispae-gestores-40h-2026-1 .meu-componente { ... }

/* Errado — vaza para fora do curso no Moodle */
.meu-componente { ... }
```

## Sistema de Cores e Design Tokens

Definidos em `:root` dentro do namespace, acessíveis em todo o bundle:

| Token          | Valor               | Uso                   |
| -------------- | ------------------- | --------------------- |
| `--base1`      | `#30bbb4` (teal)    | Cor primária do curso |
| `--base2`      | `#30bb85` (verde)   | Cor secundária        |
| `--inter1-bg`  | verde claro         | Interatividade tipo 1 |
| `--inter2-bg`  | azul claro          | Interatividade tipo 2 |
| `--inter3-bg`  | vermelho/rosa claro | Interatividade tipo 3 |
| `--inter1/2/3` | versões saturadas   | Elementos de destaque |

Tipografia e espaçamento usam `clamp()` para fluidez responsiva:

```css
--fs-h1: clamp(1.5rem, 1.2rem + 1.5vw, 2rem);
--space-md: clamp(1rem, 0.8rem + 1vw, 1.5rem);
```

**Suporte a temas:** `[data-bs-theme="dark"]` e `[data-bs-theme="light"]` — ambos devem ser testados ao alterar cores.

**Acessibilidade:** `body.opendyslexic` aplica a fonte OpenDyslexic em substituição à Proxima Nova.

## Arquitetura do Bundle Principal (`main-bundle.js`)

O arquivo é um **IIFE** (Immediately Invoked Function Expression) com todos os managers encapsulados. Nenhuma variável vaza para o escopo global exceto o que é explicitamente atribuído a `window`.

### Módulos internos (ordem no arquivo)

| Módulo              | Selector/Trigger                                          | Responsabilidade                                                                                                           |
| ------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `DOMUtils`          | `.img-link[data-link]`, `.flip-cards .recurso[data-link]` | `giveBlankToReference()` — abre links em `_parent` (iframe Moodle); `limparLinks()` e `limparEstilos()`                    |
| `PodcastManager`    | `[role="podcast"][data-url]`                              | Embute SoundCloud Widget API inline; cria iframe, gerencia play/pause/progresso/rewind                                     |
| `AccordionManager`  | `.accordion-container`                                    | Delegação de click; toggle `.accordion-item.active`; gerencia `aria-expanded`                                              |
| `CarouselManager`   | `.carousel` (Bootstrap)                                   | Wrapper do carousel Bootstrap; atualiza cor das setas no mobile conforme fundo do slide; desativa setas na primeira/última |
| `QuizManager`       | `[data-quiz-url]`                                         | Cria Web Component com Shadow DOM; busca JSON via `fetch()`; CSS carregado do CDN; suporta `data-feedback="true"`          |
| `TesteCapricho`     | `[data-teste-capricho]`                                   | Quiz de perfil da escola; estado reativo com getters/setters JS                                                            |
| `ComposicaoCaderno` | `[data-composicao-caderno]`                               | Composição baseada em template; busca template remoto                                                                      |
| Infopack externo    | `window.infopack`                                         | Chamado se disponível: `window.infopack.init()`                                                                            |

### Fora do IIFE (escopo global)

| Módulo          | Selector          | Responsabilidade                                                                                                               |
| --------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `DicaNavegacao` | `.dica-navegacao` | Tooltip/animação de navegação; `data-dica-navegacao-message`; IDs únicos por hash aleatório para suportar múltiplas instâncias |

### Fluxo de Inicialização

```
DOMContentLoaded
  → infoAccordionBehaviour()        # Comportamento de accordions (InfoPack)
  → injetar FontAwesome no <head>   # CDN: font-awesome 6.5.1
  → setTimeout(App.init, 300ms)
      → PodcastManager.init()
      → AccordionManager.init()
      → CarouselManager.init()
      → DOMUtils.init()
      → QuizManager.init(window)
      → TesteCapricho.init()
      → ComposicaoCaderno.init()
      → window.infopack?.init()

DOMContentLoaded (separado, fora do IIFE)
  → dicaNavegacaoInit()             # Inicializa todos .dica-navegacao
```

O `setTimeout(300ms)` garante que jQuery (fornecido pelo Moodle) esteja disponível antes da inicialização dos managers que dependem dele.

## Quiz — Formato do JSON

```json
{
  "titulo": "Texto do título do quiz",
  "subtitulo": "Texto opcional",
  "questoes": [
    {
      "id": 1,
      "enunciado": "Texto da questão",
      "dica": "",
      "alternativas": [
        "Alternativa A",
        "Alternativa B",
        "Alternativa C",
        "Alternativa D"
      ],
      "correta": 0,
      "feedback": {
        "correto": "Texto ao acertar",
        "incorreto": "Texto ao errar"
      }
    }
  ]
}
```

- `correta` é o índice base-0 da alternativa correta
- `feedback` pode ter strings vazias (sem feedback individual por questão)
- O componente é ativado com `data-quiz-url="assets/data/arquivo.json"` no HTML
- CSS do quiz carregado do CDN: `https://recursos-moodle.caeddigital.net/projetos/componentes/2026/quiz/m1v1/style.css`

## Dependências Externas

| Dependência        | Origem                        | Observação                                 |
| ------------------ | ----------------------------- | ------------------------------------------ |
| jQuery             | Moodle (plataforma)           | Não está nos arquivos locais               |
| Bootstrap 4/5      | Moodle (plataforma)           | Grid e carousel                            |
| Font Awesome 6.5.1 | CDN (injetado em runtime)     | Injetado em `DOMContentLoaded` pelo bundle |
| Proxima Nova       | Adobe Typekit (`bbo1gxr.css`) | Carregado localmente em `content/css/`     |
| Infopack           | CDN CAED                      | Script externo; `window.infopack`          |

## Pontos de Atenção

- **Não existe build local** — edições em CSS/JS são feitas diretamente nos arquivos e publicadas no CDN
- **Links no Moodle:** `window.open(link, "_parent")` abre dentro do iframe do Moodle. Apenas `.pesquisa` usa `"_blank"`. Não altere isso
- **IDs únicos no DicaNavegacao:** O componente gera hashes aleatórios nos IDs de filtros SVG para suportar múltiplas instâncias na mesma página — não remova esse mecanismo
- **Erros isolados:** `App.init()` envolve cada manager em `try/catch` independente. O erro em um manager não quebra os demais

## Comandos Úteis

```bash
# Listar todos os arquivos do projeto
find "Sispae-gestores-40h/2026-1" -type f | sort

# Buscar por classe CSS específica
grep -r "nome-da-classe" "Sispae-gestores-40h/2026-1/assets/"

# Localizar uso de um data attribute
grep -r "data-quiz-url\|data-composicao-caderno\|data-dica-navegacao" "Sispae-gestores-40h/2026-1/"

# Verificar referências a uma imagem
grep -r "img3.png" "Sispae-gestores-40h/2026-1/assets/"

# Buscar token CSS
grep -n "\-\-base1\|\-\-inter1-bg" "Sispae-gestores-40h/2026-1/assets/css/main-bundle.css"
```

## Regra ativa: Documentação de Comandos Bash

O arquivo `.claude/CLAUDE_BASH_COMMANDS.md` funciona como uma **referência de comandos bash orientada a casos reais** — não é um log de histórico completo.

### Quando adicionar uma entrada

Após executar qualquer comando bash, verifique se o **padrão do comando** já está documentado no arquivo:

- **Se já existe** uma entrada com o mesmo comando ou estrutura equivalente → **não adicione**. O arquivo não deve ter duplicações.
- **Se é novo** (comando diferente, flag relevante não documentada, ou contexto de uso genuinamente distinto) → adicione ao final com o formato abaixo.

### Formato da entrada

````
### N. Título descritivo do que o comando faz

```bash
comando exato executado
```

**O que faz:** explicação em português, parte por parte.

**Resultado:** o que o comando retornou ou produziu neste contexto.
````

### Critério de "novo"

Um comando é considerado novo quando ensina algo que as entradas existentes não cobrem — seja uma ferramenta diferente, uma combinação de flags nova, ou um padrão de uso distinto. O objetivo é que o arquivo cresça como documentação útil, não como repetição.
