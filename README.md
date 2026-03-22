<div align="center">

# Promovida Frontend

**Plataforma oficial de promoção da saúde e qualidade de vida de Nova Lima (MG)**

Frontend moderno em Next.js 16 que conecta cidadãos, profissionais de saúde e gestores às ações da Prefeitura.

</div>

<br>

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)
![React 19](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Shadcn/ui](https://img.shields.io/badge/Shadcn/ui-000000?logo=shadcnui&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?logo=reactquery&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000000?logo=zustand&logoColor=white)
![Sonner](https://img.shields.io/badge/Sonner-000000?logo=sonner&logoColor=white)

---

## Sobre o Projeto

Frontend do **Promovida** — solução vencedora do HackaSaúde 2026.

**Principais funcionalidades:**
- Três visões distintas: Cidadão, Profissional de Saúde e Gestor
- Mapa georreferenciado com ações próximas
- IA Coach de hábitos personalizados
- Gamificação completa (badges, streaks, conquistas)
- Check-in e histórico de atividades
- Dashboard analítico para gestores

---

## Tecnologias

- **Framework**: Next.js 16 (App Router + Turbopack)
- **UI**: Shadcn/ui + Radix UI + Tailwind CSS v4
- **Estado**: TanStack Query + Zustand
- **Formulários**: React Hook Form + Zod
- **Notificações**: Sonner
- **Autenticação**: NextAuth v5 (preparado)

---

## Estrutura de Pastas

```
promovida-frontend/
├── src/
│   ├── app/
│   │   ├── (public)/              # Páginas abertas (landing, about, events)
│   │   ├── (private)/             # Rotas protegidas
│   │   │   ├── citizen/           # Cidadão comum
│   │   │   ├── professional/      # Profissional de saúde
│   │   │   ├── manager/           # Gestor / Admin
│   │   │   └── layout.tsx
│   │   ├── auth/
│   │   └── proxy.ts               # Middleware (Next.js 16)
│   │
│   ├── features/                  # Feature-based (recomendado)
│   │   ├── actions/
│   │   ├── participation/
│   │   ├── gamification/
│   │   └── coach/
│   │
│   ├── components/
│   │   ├── ui/                    # Shadcn puro
│   │   ├── custom/                # Componentes próprios
│   │   ├── layout/                # Sidebars e AppShell
│   │   └── providers/             # QueryProvider, ThemeProvider
│   │
│   ├── lib/
│   │   └── apiClient.ts           # Fetch wrapper
│   │
│   ├── types/
│   └── store/                     # Zustand stores
│
├── .env.local
├── tailwind.config.ts
├── globals.css
└── README.md
```

---

## Instalação Rápida

```bash
git clone <seu-repo>
cd promovida-frontend

npm install
cp .env.example .env.local
```

### Comandos Essenciais

```bash
npm run dev                 # Inicia com Turbopack (recomendado)
npm run build               # Build de produção
npm run lint                # Lint + Prettier
```

**Acesso**:
- Frontend → `http://localhost:3000`
- Login de teste → `/auth/login`

---

## Próximas Features

- [x] Layout público + privado
- [x] Página inicial + About
- [x] Sistema de roles (Citizen / Professional / Manager)
- [ ] Mapa georreferenciado
- [ ] Gamificação completa
- [ ] IA Coach
- [ ] Integração com backend

---

**Feito com ❤️ para salvar vidas em Nova Lima – HackaSaúde 2026**

---
```