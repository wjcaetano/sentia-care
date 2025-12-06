# ⚡ Quick Start Guide - Personal Nurse Frontend

Guia rápido para iniciar o desenvolvimento do Personal Nurse em menos de 30 minutos.

---

## 🎯 Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Git
- Editor de código (VSCode recomendado)

---

## 📦 Passo 1: Criar o Projeto (5 min)

```bash
# Criar projeto com Vite
npm create vite@latest personal-nurse-frontend -- --template react-ts

# Entrar no diretório
cd personal-nurse-frontend

# Instalar dependências
npm install
```

---

## 🎨 Passo 2: Instalar Dependências Principais (5 min)

```bash
# UI e Styling
npm install tailwindcss postcss autoprefixer
npm install @headlessui/react lucide-react clsx tailwind-merge

# Roteamento
npm install react-router-dom

# Estado e API
npm install zustand @tanstack/react-query axios

# Formulários e Validação
npm install react-hook-form @hookform/resolvers zod

# WebRTC e Chat
npm install @daily-co/daily-js socket.io-client

# Utilidades
npm install date-fns react-toastify

# Dev Dependencies
npm install -D @types/node
```

---

## ⚙️ Passo 3: Configurar TailwindCSS (3 min)

```bash
# Inicializar Tailwind
npx tailwindcss init -p
```

**Editar `tailwind.config.js`:**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
        },
      },
    },
  },
  plugins: [],
}
```

**Editar `src/index.css`:**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Fonte global */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}
```

---

## 📁 Passo 4: Criar Estrutura de Pastas (5 min)

```bash
# A partir da raiz do projeto (src/)
mkdir -p src/{app,assets,components,features,hooks,lib,store,types,utils}
mkdir -p src/components/{common,layout,features}
mkdir -p src/features/{auth,patient,nurse,teleconsulta,chat,prontuario,agenda,vitals,admin}
mkdir -p src/lib/{api,socket,webrtc,utils}
```

---

## 🔧 Passo 5: Configurar Path Alias (TypeScript) (2 min)

**Editar `tsconfig.json`:**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Path Alias */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**Editar `vite.config.ts`:**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

---

## 🌐 Passo 6: Criar Arquivos Base (10 min)

### 6.1 Criar Auth Store

**`src/store/authStore.ts`:**

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'nurse' | 'admin';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // TODO: Chamar API
        console.log('Login:', email, password);
        // Simular login
        set({
          user: { id: '1', name: 'João', email, role: 'patient' },
          token: 'fake-token',
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    { name: 'auth-storage' }
  )
);
```

---

### 6.2 Criar API Client

**`src/lib/api/client.ts`:**

```typescript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 15000,
});

// Request interceptor
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-storage');
  if (token) {
    const parsed = JSON.parse(token);
    config.headers.Authorization = `Bearer ${parsed.state.token}`;
  }
  return config;
});

export default apiClient;
```

---

### 6.3 Criar React Query Provider

**`src/app/providers.tsx`:**

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min
      refetchOnWindowFocus: false,
    },
  },
});

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastContainer position="top-right" />
    </QueryClientProvider>
  );
}
```

---

### 6.4 Criar Rotas Básicas

**`src/app/routes.tsx`:**

```typescript
import { createBrowserRouter } from 'react-router-dom';

// Páginas temporárias
const LandingPage = () => <div className="p-8 text-center">Landing Page</div>;
const LoginPage = () => <div className="p-8 text-center">Login Page</div>;
const PatientDashboard = () => <div className="p-8 text-center">Patient Dashboard</div>;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/paciente/dashboard',
    element: <PatientDashboard />,
  },
]);
```

---

### 6.5 Atualizar App.tsx

**`src/App.tsx`:**

```typescript
import { RouterProvider } from 'react-router-dom';
import { AppProviders } from './app/providers';
import { router } from './app/routes';

function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}

export default App;
```

---

### 6.6 Criar .env.example

**`.env.example`:**

```bash
# API Backend
VITE_API_URL=http://localhost:3000/api
VITE_WS_URL=ws://localhost:3000

# WebRTC
VITE_DAILY_API_KEY=your_daily_api_key

# Payment
VITE_STRIPE_PUBLIC_KEY=pk_test_your_key

# Features
VITE_ENABLE_AI_TRANSCRIPTION=false
VITE_ENABLE_IOT_SYNC=false
```

---

## 🚀 Passo 7: Executar o Projeto

```bash
# Criar arquivo .env (copiar do .env.example)
cp .env.example .env

# Rodar em modo dev
npm run dev
```

Abrir `http://localhost:5173` no navegador.

---

## ✅ Checklist de Verificação

- [ ] Projeto criado com Vite + React + TypeScript
- [ ] TailwindCSS configurado e funcionando
- [ ] Estrutura de pastas criada
- [ ] Path alias (@/) funcionando
- [ ] Zustand instalado e authStore criado
- [ ] React Query configurado
- [ ] React Router configurado
- [ ] Projeto rodando sem erros

---

## 📚 Próximos Passos

Agora que o setup básico está pronto, você pode:

1. **Implementar Landing Page** - Usar como base o código do SentiaCare fornecido
2. **Criar componentes comuns** (Button, Input) - Ver `EXEMPLOS_CODIGO_PERSONAL_NURSE.md`
3. **Implementar autenticação completa** - Login, Registro, Protected Routes
4. **Seguir o checklist** - Use `CHECKLIST_IMPLEMENTACAO.md` para organizar sprints

---

## 🐛 Troubleshooting

### Erro: "Cannot find module '@/...'"

**Solução:** Certifique-se de que o `vite.config.ts` e `tsconfig.json` estão configurados corretamente com o path alias.

### Erro: "Tailwind classes not working"

**Solução:** Verifique se `src/index.css` contém as diretivas `@tailwind` e se o arquivo está importado no `main.tsx`.

### Erro: "React Query not working"

**Solução:** Certifique-se de que `<AppProviders>` está envolvendo toda a aplicação em `App.tsx`.

---

## 🎉 Parabéns!

Você está pronto para começar o desenvolvimento do Personal Nurse! 🚀

**Sugestões:**
- Leia o `PLANO_FRONTEND_PERSONAL_NURSE.md` para entender a arquitetura completa
- Use `EXEMPLOS_CODIGO_PERSONAL_NURSE.md` como referência de código
- Siga `CHECKLIST_IMPLEMENTACAO.md` para organizar as tarefas

**Bom código! 💻**
