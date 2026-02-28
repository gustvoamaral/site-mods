# 🌟 Mods - LabyMod

Este é o Front-end do meu painel pessoal de gerenciamento de mods de Minecraft. **Este painel foi desenvolvido especificamente para interagir em conjunto com a minha própria API REST (Back-end)**, permitindo registrar, visualizar, editar e excluir addons e mods (como os do LabyMod) de forma totalmente dinâmica. Construído com **React** e **Vite**, ele conta com um design moderno (Dark Mode), responsivo e customizado.

## 🚀 Funcionalidades

- Autenticação imersiva com tela de login personalizada, logo do LabyMod e visualização da skin em tempo real (via API `mc-heads.net`).
- CRUD Completo (Criação, Leitura, Atualização e Deleção de mods) consumindo a API REST local.
- Busca dinâmica de mods instantaneamente sem recarregar a página.
- Sistema avançado de filtros por categorias (FPS, PvP, Visual, etc.) e ordenação alfabética ou por data de adição.

## 🛠️ Tecnologias Utilizadas

- React (Hooks: `useState`, `useEffect`)
- Vite (Build tool rápida)
- CSS3 (Variáveis, Flexbox, Grid, Responsividade)
- JavaScript (ES6+)
- Fetch API (Comunicação com o Back-end)

## 📦 Instalação

1. Certifique-se de que a API (api-mods-labymod) está rodando localmente na porta `3000`. (https://github.com/gustvoamaral/api-mods-labymod)
2. Clone este repositório:
   ```sh
   git clone [https://github.com/gustvoamaral/site-mods.git](https://github.com/gustvoamaral/site-mods.git)
3. Acesse a pasta do projeto: `cd site-mods`
4. Instale as dependências: `npm install`


## ▶️ Uso

Para iniciar o servidor de desenvolvimento do painel, execute:
```sh
npm run dev
```
Após executar, acesse o link gerado no seu terminal (geralmente http://localhost:5173).
