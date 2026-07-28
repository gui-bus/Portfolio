<div align="center">
  <br/>
  <br/>
  <img src="./public/logos/logo/white_logo.svg" alt="Portfolio Logo" width="280" />
</div>

<br />

## 🌟 Visão Geral

Este portfólio é uma demonstração interativa das minhas habilidades como **Desenvolvedor Full-stack & Designer**, construído sob uma arquitetura de altíssima performance e com foco na experiência do usuário. O projeto utiliza o **Next.js 16 (App Router)**, internacionalização robusta sem prefixo de rotas com **`next-intl`**, estilização de última geração com **Tailwind CSS v4** e componentes reutilizáveis do **shadcn/ui**.

### 🎯 Diferenciais Estratégicos
- **Internacionalização Completa:** Suporte nativo para múltiplos idiomas (EN, PT, ES, DE, FR) permitindo alternar de forma fluida.
- **Sem Prefixo de Locale na URL (`localePrefix: 'never'`):** O middleware intercepta o idioma do navegador ou a preferência do usuário e entrega a tradução mantendo uma URL limpa (ex: `/` para ambos inglês e português).
- **Design System com HSL/OKLCH:** Cores calibradas dinamicamente de acordo com o tema ativo, garantindo acessibilidade, contraste e gradientes perfeitos.
- **Performance de Elite:** Otimização para Core Web Vitals com renderização assíncrona, carregamento inteligente de assets e uso estrito do componente de otimização de imagens (`next/image`).

---

## 🚀 Deploy & Demonstração

O projeto está implantado e disponível em tempo real:
👉 **[https://guibus.dev/](https://guibus.dev/)**

---

## 🛠️ Stack Tecnológica

<div align="center">
  <img alt="React" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/React.svg" title="React 19">
  <img alt="NextJS" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/NextJS.svg" title="Next.js 16 (App Router)">
  <img alt="Typescript" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Typescript.svg" title="TypeScript">
  <img alt="TailwindCSS" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/TailwindCSS.svg" title="Tailwind CSS v4">
  <img alt="ShadCNUI" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/ShadCNUI.svg" title="shadcn/ui">
  <img alt="Framer Motion" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Framer%20Motion.svg" title="Framer Motion">
  <img alt="Radix" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Radix.svg" title="Radix UI">
  <img alt="Phosphor Icons" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Phosphor%20Icons.svg" title="Phosphor Icons">
  <img alt="React Hook Form" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/React%20Hook%20Form.svg" title="React Hook Form">
  <img alt="Zod" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Zod.svg" title="Zod Validation">
  <img alt="nextintl" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/nextintl.svg" title="next-intl">
  <img alt="pnpm" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/pnpm.svg" title="pnpm Package Manager">
  <img alt="Vercel" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Vercel.svg" title="Vercel">
  <img alt="Vitest" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Vitest.svg" title="Vitest Testing Framework">
  <img alt="ESLint" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/ESLint.svg" title="ESLint">
  <img alt="Prettier" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Prettier.svg" title="Prettier">
  <img alt="Husky" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Husky.svg" title="Husky Git Hooks">
  <img alt="Conventional Commits" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Conventional%20Commits.svg" title="Conventional Commits">
  <img alt="Gemini" height="60" width="60" src="https://github.com/gui-bus/TechIcons/blob/main/Dark/Gemini.svg" title="Gemini">
</div>

---

## 🏗️ Arquitetura de i18n & Fluxo de Renderização

O projeto adota uma arquitetura de internacionalização limpa de rotas sem prefixos de idioma na URL. O middleware analisa a requisição e carrega as mensagens de forma assíncrona no lado do servidor antes da entrega da página ao cliente:

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

## 🚀 Funcionalidades & Módulos Principais

| Módulo                       | Funcionalidades                                                                                             | Detalhes Técnicos                                                                                                       |
| :--------------------------- | :---------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| **🌐 Internacionalização**   | • Tradução completa em 5 idiomas<br/>• Rotas sem prefixo<br/>• Detecção inteligente e cookies persistentes  | Desenvolvido usando `next-intl` com gerenciamento centralizado de mensagens e detecção automática de locale no middleware. |
| **🎨 Design System Moderno**  | • Estilo com Tailwind CSS v4<br/>• Componentes Shadcn/ui customizados<br/>• Cores vibrantes com OKLCH       | Integração do Tailwind v4 com o design system do Shadcn, utilizando as variáveis CSS modernas e o espaço de cores OKLCH. |
| **⚡ Efeitos & Interações**   | • Micro-interações nos cards<br/>• Transições de layouts fluidas e dinâmicas                                 | Desenvolvido com `framer-motion` e `gsap` para garantir animações de alta performance e responsividade interativa.     |
| **🧪 Qualidade de Código**   | • Testes unitários abrangentes<br/>• Hooks de Pre-commit automatizados                                      | Bateria de testes configurada com `vitest` e `testing-library`. Uso do `husky` e `lint-staged` para garantir commits limpos. |

---

## 🏁 Inicialização Local

### 1. Clonar e Instalar as Dependências

```bash
git clone https://github.com/gui-bus/Portfolio.git
cd Portfolio
pnpm install
```

### 2. Rodar a Aplicação em Modo de Desenvolvimento

```bash
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### 3. Rodar Testes Automatizados

```bash
# Executa a suíte de testes com Vitest
pnpm test

# Executa testes com interface interativa
pnpm test:ui
```
