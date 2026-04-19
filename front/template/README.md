# AutoAula — Versão estática (HTML/CSS/JS puros)

Reformulação do protótipo original em HTML, CSS e JavaScript puros, sem nenhum framework ou processo de build.

## Como executar

Basta abrir `index.html` em qualquer navegador moderno.
Para evitar problemas de CORS com `file://`, prefira servir via servidor estático:

```bash
# Python
python3 -m http.server 8000 --directory static-site

# Node
npx serve static-site
```

E acesse: http://localhost:8000

## Estrutura

```
static-site/
├── index.html                       # Home pública
├── busca.html                       # Lista de instrutores com filtros
├── agendamento.html                 # Checkout em 3 etapas
├── instrutor.html                   # Dashboard do instrutor
├── instrutor-agenda.html            # Gestão de aulas
├── instrutor-precos.html            # Preços e pacotes
├── instrutor-disponibilidade.html   # Dias/horários disponíveis
├── instrutor-perfil.html            # Perfil público
├── instrutor-avaliacoes.html        # Avaliações + respostas
│
├── styles/
│   ├── base.css                     # Tokens, reset e componentes globais
│   ├── home.css                     # Específico da home
│   ├── busca.css                    # Específico da busca
│   ├── agendamento.css
│   ├── instrutor.css                # Layout do painel + componentes compartilhados
│   ├── instrutor-agenda.css
│   ├── instrutor-precos.css
│   ├── instrutor-disponibilidade.css
│   ├── instrutor-perfil.css
│   └── instrutor-avaliacoes.css
│
└── scripts/
    ├── data.js                      # Mock data global (window.AutoAulaData)
    ├── home.js
    ├── busca.js
    ├── agendamento.js
    ├── instrutor.js
    ├── instrutor-agenda.js
    ├── instrutor-precos.js
    ├── instrutor-disponibilidade.js
    ├── instrutor-perfil.js
    └── instrutor-avaliacoes.js
```

## Decisões de arquitetura

- **1 CSS + 1 JS por página** — cada página carrega apenas o que precisa.
- **`base.css`** — tokens de design (cores, tipografia, espaçamentos), reset e componentes verdadeiramente globais (botões, cards, badges, header, toast). Sem ele teríamos ~3000 linhas duplicadas.
- **`data.js`** — único módulo compartilhado, carregado antes de cada script de página. Expõe `window.AutoAulaData` com mock data e helpers.
- **Sem build** — abre direto no navegador. Fontes carregadas via Google Fonts.

## Melhorias de usabilidade aplicadas

Em relação ao protótipo original:
- ✅ Filtros de busca **funcionais** (localização, categoria, preço, avaliação)
- ✅ Validação de formulários com mensagens de erro inline
- ✅ Máscaras de input (CPF, telefone, cartão, validade)
- ✅ Horários de aula respeitam disponibilidade do instrutor e reservas existentes
- ✅ Tela de **sucesso** ao confirmar agendamento (em vez de `alert()`)
- ✅ Toast messages para feedback de ações
- ✅ Sidebar responsiva (vira nav horizontal no mobile)
- ✅ Estados vazios em listas
- ✅ Pré-visualização ao vivo dos pacotes de preço
