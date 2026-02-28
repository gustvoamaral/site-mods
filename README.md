# 🌟 Mods - LabyMod

Este é o Front-end do meu painel pessoal de gerenciamento de mods de Minecraft. **Este painel foi desenvolvido especificamente para interagir em conjunto com a minha própria API REST (Back-end)**, permitindo registrar, visualizar, editar e excluir addons e mods (como os do LabyMod) de forma totalmente dinâmica. Construído com **React** e **Vite**, ele conta com um design moderno (Dark Mode), responsivo e customizado.

## ✨ Funcionalidades

- **Autenticação Imersiva:** Tela de login personalizada com a logo do LabyMod e visualização em tempo real da skin do jogador (via API `mc-heads.net`).
- **CRUD Completo:** Criação, Leitura, Atualização e Deleção de mods consumindo a minha API REST local.
- **Busca Dinâmica:** Barra de pesquisa que filtra os mods instantaneamente sem recarregar a página.
- **Categorização e Ordenação:** Sistema avançado de filtros por categorias (FPS, PvP, Visual, etc.) e ordenação alfabética ou por data de adição.
- **Design Premium:** Interface construída com CSS puro (Flexbox e Grid), paleta de cores escura com alto contraste, badges coloridas para categorias e layout à prova de transbordamento de texto.

## 🛠️ Tecnologias Utilizadas

- **React** (Hooks: `useState`, `useEffect`)
- **Vite** (Build tool rápida)
- **CSS3** (Variáveis, Flexbox, Grid, Responsividade)
- **JavaScript (ES6+)**
- **Fetch API** (Comunicação com o Back-end)

## 🚀 Como executar o projeto localmente

### Pré-requisitos
- Ter o **Node.js** instalado.
- Ter a **API Mods LabyMod** rodando localmente na porta `3000`. (https://github.com/gustvoamaral/api-mods-labymod)

### Passos

1. Clone este repositório:
   ```bash
   git clone [https://github.com/gusssw/meus-mods-frontend.git](https://github.com/gusssw/meus-mods-frontend.git)
