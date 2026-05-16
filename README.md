# Leydi Kuaför Web Application

This is the official corporate website for Leydi Kuaför, located in Giresun, Turkey. The project is built using modern web development technologies to ensure high performance, SEO optimization, and a seamless user experience.

The project is structured as a monorepo with a **SvelteKit frontend** and a **Node.js/Express backend API** located in the `server/` directory.

---

## Tech Stack Overview

| Layer | Core Technologies |
|---|---|
| Frontend | Svelte 5, SvelteKit 2, TypeScript, Vite |
| Styling | TailwindCSS 3, daisyUI 4 |
| Backend | Node.js, Express 4, TypeScript |
| Database | SQLite via better-sqlite3, Drizzle ORM |
| Validation | Zod |

---

## Frontend

Located in the project root. Built with SvelteKit and Vite.

### Dependencies

| Package | Version | Description |
|---|---|---|
| [date-fns](https://www.npmjs.com/package/date-fns) | ^4.1.0 | Modern JavaScript date utility library with a comprehensive, consistent, and simple API for manipulating dates |

### Dev Dependencies

| Package | Version | Description |
|---|---|---|
| [@antfu/eslint-config](https://www.npmjs.com/package/@antfu/eslint-config) | ^3.12.0 | Anthony Fu's opinionated ESLint config with support for TypeScript, Svelte, and auto-formatting |
| [@lucide/svelte](https://www.npmjs.com/package/@lucide/svelte) | latest | Svelte component library for Lucide — a clean, consistent open-source icon set with over 1000 SVG icons |
| [@sveltejs/adapter-auto](https://www.npmjs.com/package/@sveltejs/adapter-auto) | ^3.3.0 | SvelteKit adapter that automatically selects the right deployment adapter based on the hosting platform (Vercel, Netlify, Cloudflare, etc.) |
| [@sveltejs/enhanced-img](https://www.npmjs.com/package/@sveltejs/enhanced-img) | ^0.4.3 | SvelteKit plugin that provides automatic image optimization, format conversion (WebP/AVIF), and responsive srcset generation at build time |
| [@sveltejs/kit](https://www.npmjs.com/package/@sveltejs/kit) | ^2.10.0 | The official full-stack framework for Svelte — provides routing, SSR, SSG, API routes, layouts, and more |
| [@sveltejs/vite-plugin-svelte](https://www.npmjs.com/package/@sveltejs/vite-plugin-svelte) | ^4.0.0 | Official Vite plugin that enables Svelte single-file component compilation and HMR during development |
| [@types/node](https://www.npmjs.com/package/@types/node) | ^25.8.0 | TypeScript type definitions for the Node.js runtime APIs |
| [autoprefixer](https://www.npmjs.com/package/autoprefixer) | ^10.4.19 | PostCSS plugin that automatically adds vendor prefixes to CSS rules for cross-browser compatibility |
| [daisyui](https://www.npmjs.com/package/daisyui) | ^4.12.10 | TailwindCSS component library providing 50+ pre-built UI components (buttons, modals, cards, etc.) with built-in theming support |
| [eslint](https://www.npmjs.com/package/eslint) | ^9.16.0 | Pluggable JavaScript/TypeScript linter for identifying and reporting code quality problems |
| [eslint-plugin-format](https://www.npmjs.com/package/eslint-plugin-format) | ^2.0.1 | ESLint plugin that delegates formatting to Prettier, dprint, or other formatters as ESLint rules |
| [eslint-plugin-svelte](https://www.npmjs.com/package/eslint-plugin-svelte) | ^3.16.0 | ESLint plugin with rules specific to Svelte components, including accessibility and best-practice checks |
| [postcss](https://www.npmjs.com/package/postcss) | ^8.4.38 | CSS post-processor tool that transforms CSS with JavaScript plugins — required by TailwindCSS |
| [postcss-load-config](https://www.npmjs.com/package/postcss-load-config) | ^4.0.1 | Loads PostCSS configuration from `postcss.config.*` files, enabling auto-discovery in build tools |
| [svelte](https://www.npmjs.com/package/svelte) | ^5.1.0 | The Svelte compiler and runtime — a component framework that compiles to vanilla JavaScript with no virtual DOM |
| [svelte-check](https://www.npmjs.com/package/svelte-check) | ^4.4.5 | CLI tool that performs TypeScript type-checking and diagnostics on Svelte files |
| [tailwindcss](https://www.npmjs.com/package/tailwindcss) | ^3.4.4 | Utility-first CSS framework for rapidly building custom designs with low-level utility classes |
| [tslib](https://www.npmjs.com/package/tslib) | ^2.8.1 | Runtime library for TypeScript helpers — reduces bundle size by sharing helper functions instead of inlining them |
| [typescript](https://www.npmjs.com/package/typescript) | ^5.9.3 | Microsoft's typed superset of JavaScript that compiles to plain JavaScript, providing static type checking |
| [vite](https://www.npmjs.com/package/vite) | ^5.4.0 | Next-generation frontend build tool with near-instant dev server startup, HMR, and optimized production builds |

---

## Backend

Located in the `server/` directory. A REST API built with Express and TypeScript.

### Dependencies

| Package | Version | Description |
|---|---|---|
| [better-sqlite3](https://www.npmjs.com/package/better-sqlite3) | ^11.3.0 | Fast and simple synchronous SQLite3 library for Node.js — the most performant SQLite binding available |
| [cors](https://www.npmjs.com/package/cors) | ^2.8.5 | Express middleware for enabling Cross-Origin Resource Sharing (CORS) with configurable origin, methods, and headers |
| [dotenv](https://www.npmjs.com/package/dotenv) | ^17.4.2 | Zero-dependency module that loads environment variables from a `.env` file into `process.env` |
| [drizzle-orm](https://www.npmjs.com/package/drizzle-orm) | ^0.36.4 | Lightweight, type-safe TypeScript ORM with SQL-like query syntax and first-class support for SQLite, PostgreSQL, and MySQL |
| [express](https://www.npmjs.com/package/express) | ^4.21.2 | Minimal and flexible Node.js web application framework for building REST APIs and web servers |
| [helmet](https://www.npmjs.com/package/helmet) | ^8.0.0 | Express middleware that sets various HTTP security headers (CSP, HSTS, X-Frame-Options, etc.) to protect against common web vulnerabilities |
| [zod](https://www.npmjs.com/package/zod) | ^3.23.8 | TypeScript-first schema declaration and validation library with a fully inferred static type system |

### Dev Dependencies

| Package | Version | Description |
|---|---|---|
| [@types/better-sqlite3](https://www.npmjs.com/package/@types/better-sqlite3) | ^7.6.12 | TypeScript type definitions for the better-sqlite3 library |
| [@types/cors](https://www.npmjs.com/package/@types/cors) | ^2.8.17 | TypeScript type definitions for the cors middleware |
| [@types/express](https://www.npmjs.com/package/@types/express) | ^4.17.21 | TypeScript type definitions for the Express framework |
| [@types/node](https://www.npmjs.com/package/@types/node) | ^22.10.2 | TypeScript type definitions for the Node.js runtime APIs |
| [drizzle-kit](https://www.npmjs.com/package/drizzle-kit) | ^0.30.0 | CLI toolkit for Drizzle ORM — handles schema migrations, introspection, and the Drizzle Studio visual database browser |
| [tsx](https://www.npmjs.com/package/tsx) | ^4.19.2 | Node.js enhancement for running TypeScript files directly without a compilation step, with watch mode support |
| [typescript](https://www.npmjs.com/package/typescript) | ^5.9.3 | Microsoft's typed superset of JavaScript that compiles to plain JavaScript, providing static type checking |

---

## Getting Started

### Frontend

```bash
# Install dependencies
npm install

# Start the development server (http://localhost:5173)
npm run dev

# Type-check Svelte files
npm run check

# Lint and format
npm run format
```

### Backend

```bash
cd server

# Install dependencies
npm install

# Run database migrations
npm run db:migrate

# Start the development server with hot reload
npm run dev
```

### Production Build

```bash
# Build the frontend
npm run build

# Preview the production build
npm run preview

# Build and start the backend
cd server && npm run build && npm start
```

---

## License

**Proprietary and Confidential.**

All rights reserved. The source code of this project may not be copied, distributed, modified, or used without express written permission from the owner.
