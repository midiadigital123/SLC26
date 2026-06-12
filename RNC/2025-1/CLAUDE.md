# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Sobre o Projeto

Este é o projeto **RNC 2025-1** (Rede Nacional de Certificação), um curso educacional estático desenvolvido para ser publicado na plataforma Moodle da CAED Digital. O conteúdo é servido via CDN externo: `https://recursos-moodle.caeddigital.net/projetos/cursos/RNC/2025-1/`.

Não há servidor local, build system, framework ou gerenciador de pacotes. O projeto é HTML/CSS/JS puro.

## Estrutura

```
assets/
  css/
    rnc-2025.css         # Estilos principais + tokens de cor por seção
  js/
    rnc-script.js        # Ponto de entrada JS — carrega InfoPack, QuizPack e inicia comportamentos
    quiz.js              # QuizPack: sistema de quizzes educacionais (QUIZ_DATA inline)
    componentes/
      componentes.json   # Mapa local dos componentes disponíveis (referência — não é a fonte verdadeira)
content/
  css/
    bbo1gxr.css          # Fonte Proxima Nova (Adobe Typekit)
assets/img/              # Imagens nomeadas com convenção a{n}-t{n}-img{n}.png
```

## Convenção de Nomes de Imagens

O padrão `a1-t2-c1-s3.png` segue: **a**=aula, **t**=tópico, **c**=conteúdo, **s**=slide/sequência.
Imagens de seção usam `s{n}-t{n}-...`, onde **s**=seção.

## Sistema de Cores (CSS Variables)

Cada seção temática do curso tem sua própria paleta via CSS custom properties:
- `.ap-geral` — tela geral/apresentação
- `.secao1` a `.secao6` — cada seção do curso com cores `--fundo`, `--base`, `--sec1/2/3`, `--tonica`
- Tokens globais em `.c-aula-container.curso`: `--base-projeto`, `--transition-smooth`, `--shadow-soft`, etc.

## Arquitetura de Componentes

Os componentes (Carousel, Topicos, Sanfona, Podcast, Modal, Erros) são carregados dinamicamente:

1. `rnc-script.js` busca o JSON remoto de componentes:
   `https://recursos-moodle.caeddigital.net/projetos/componentes/2025-1/componentes.json`
2. O JSON mapeado em `window.objJSON` é comparado com os componentes declarados em `buildComponentes()`
3. Os scripts dos componentes são injetados dinamicamente via `<script src>` no `document.body`
4. InfoPack e QuizPack são carregados sequencialmente antes dos demais

**O `assets/js/componentes/componentes.json` local é apenas referência** — a fonte verdadeira de componentes é o JSON remoto acima.

## Fluxo de Inicialização (rnc-script.js)

```
DOMContentLoaded
  → pushGlobalObject()       # Carrega JSON remoto → window.objJSON
  → loadScript(infopack.js)  # Carrega InfoPack do CDN
  → loadScript(quiz.js)      # Carrega QuizPack local
  → startJsAula()
      → verifyJquery()       # Polling com setTimeout(600ms) até jQuery disponível
      → buildRNC()
          → buildComponentes()        # Injeta scripts de componentes
          → infoAccordionBehaviour()  # Comportamento de accordions
          → alteraCorSvgTopico()      # SVG hover nos botões de navegação
          → addLinkToImg()            # .img-link[data-link] → window.open
          → addLinkToCard()           # .flip-cards .recurso[data-link] → window.open
```

## Regras Importantes

- **Não existe build local** — alterações em CSS/JS são editadas diretamente nos arquivos e publicadas no CDN
- **jQuery é uma dependência** fornecida pelo Moodle; não está nos arquivos locais
- O `console.log` em `rnc-script.js:37` é intencional para debug de desenvolvimento (confirma carregamento do JSON)
- Links de imagens e cards usam `window.open(link, "_parent")` para abrir dentro do iframe do Moodle; apenas `.pesquisa` usa `"_blank"`

## Comandos Úteis

Como não há build system, os únicos comandos relevantes são navegação e inspeção de arquivos:

```bash
# Listar todos os arquivos do projeto
find . -type f | sort

# Buscar por classe CSS específica
grep -r "nome-da-classe" assets/

# Verificar referências a uma imagem
grep -r "nome-da-imagem" assets/js/ assets/css/

# Contar imagens por seção
ls assets/img/ | grep "^a1-" | wc -l
```

## COMMANDS_CLAUDE.md

Todos os comandos executados pelo Claude Code neste projeto são registrados em `.claude/COMMANDS_CLAUDE.md` para fins educativos.
