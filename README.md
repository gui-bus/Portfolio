<div align="center">
  <br/>
  <br/>
  <img src="./public/logos/logo/white_logo.svg" alt="Portfolio Logo" width="280" />
</div>

<br />

## 🌟 Visão Geral

Este repositório contém meu portfólio pessoal construído com Next.js 16 (App Router) e Tailwind CSS v4, apresentando projetos desenvolvidos, habilidades técnicas e métricas de contribuição no GitHub.

O projeto implementa uma arquitetura multilíngue sem prefixo na URL (`localePrefix: 'never'`), otimização estrita de assets e integração direta com dados de repositórios e linguagens.

## 🚀 Deploy & Demonstração

O projeto está implantado e disponível em:
👉 **[https://guibus.dev/](https://guibus.dev/)**

## 🛠️ Stack Tecnológica

<div align="center">
  <img alt="React" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/React.svg">
  <img alt="NextJS" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/NextJS.svg">
  <img alt="Typescript" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Typescript.svg">
  <img alt="TailwindCSS" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/TailwindCSS.svg">
  <img alt="ShadCNUI" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/ShadCNUI.svg">
  <img alt="Framer Motion" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Framer%20Motion.svg">
  <img alt="Radix" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Radix.svg">
  <img alt="Phosphor Icons" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Phosphor%20Icons.svg">
  <img alt="React Hook Form" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/React%20Hook%20Form.svg">
  <img alt="Zod" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Zod.svg">
  <img alt="nextintl" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/nextintl.svg">
  <img alt="pnpm" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/pnpm.svg">
  <img alt="Vercel" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Vercel.svg">
</div>

---

## 🏛️ Arquitetura do Sistema

Fluxo de renderização e processamento de idioma utilizando Next.js App Router e o middleware do `next-intl` para entrega de conteúdo localizado sem prefixo de rota na URL:

```mermaid
graph TD
    User([🌐 Usuário acessa guibus.dev]) --> Middleware{"🛡️ Middleware"}
    Middleware -->|Verifica Cookie / Headers| LocaleDetection["Detecta idioma (pt, en, es, de, fr)"]
    LocaleDetection --> ServerComponent["🖥️ Server Components (Next.js)"]
    ServerComponent -->|Carrega mensagens assíncronas de messages/*.json| getTranslations["getTranslations()"]
    getTranslations --> Render["🎨 Renderização HTML (com tema dark/light)"]
    Render --> Client["📱 Client Side (Hydration + Framer Motion)"]
```

---

## 🚀 Módulos da Aplicação

| Módulo                       | Descrição                                                                                                   | Detalhes Técnicos                                                                                                       |
| :--------------------------- | :---------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| **🌐 Internacionalização**   | • Tradução completa em 5 idiomas<br/>• Rotas sem prefixo de locale<br/>• Detecção e cookies persistentes    | Gerenciamento de traduções feito com `next-intl`, com resolução dinâmica e transparente no middleware.                  |
| **🎨 Interface & Tema**       | • Tailwind CSS v4<br/>• Componentes Shadcn/ui estruturados<br/>• Variáveis dinâmicas OKLCH                   | Layouts baseados em OKLCH com transição nativa de temas (claro/escuro) e estilização modular.                            |
| **📊 Integração GitHub**     | • Estatísticas em tempo real<br/>• Linguagens mais utilizadas<br/>• Gráfico de contribuições                 | Integração com a API REST do GitHub para consumo e exibição dinâmica dos dados do perfil.                               |
| **⚡ Animações & Gestos**     | • Transições de entrada fluidas<br/>• Micro-interações interativas nos cards                                | Implementações com `framer-motion` e `gsap` garantindo 60fps no carregamento e interação.                               |


