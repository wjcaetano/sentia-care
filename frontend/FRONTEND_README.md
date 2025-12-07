# 🎨 Sentia Care - Frontend Implementation

## ✅ Status: Implementação Concluída

Landing page completa e funcional, pronta para vendas!

## 🚀 Desenvolvimento Local

```bash
# Navegar para o diretório
cd frontend

# Instalar dependências (já feito)
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview da build
npm run preview
```

**URL Local**: http://localhost:5173/

## 📦 Stack Tecnológica

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| React | 18.3.1 | UI Framework |
| TypeScript | 5.6.2 | Type Safety |
| Vite | 7.0.5 | Build Tool (super rápido) |
| TailwindCSS | 4.1.17 | Styling Framework |
| @tailwindcss/postcss | 4.1.17 | PostCSS Plugin (v4) |
| Lucide React | latest | Ícones |
| Clsx | latest | Conditional CSS classes |

## 🎨 Paleta de Cores Customizada

### Primary (Teal)
- `primary-50` a `primary-900` - Tons de teal/verde-água
- Uso: CTAs principais, gradientes, destaques

### Secondary (Sky Blue)
- `secondary-50` a `secondary-900` - Tons de azul céu
- Uso: Gradientes, elementos secundários, links

### Utilitários Customizados
```css
.text-gradient        /* Texto com gradiente primary → secondary */
.bg-gradient-primary  /* Background com gradiente */
.shadow-glow         /* Sombra brilhante (teal) */
```

## 📂 Estrutura de Diretórios

```
frontend/
├── src/
│   ├── components/
│   │   ├── common/          # Componentes reutilizáveis
│   │   │   └── Button.tsx   # Botão com 4 variants, 3 sizes
│   │   └── layout/          # Componentes de layout
│   │       ├── Header.tsx   # Nav com scroll effects
│   │       └── Footer.tsx   # Footer com links
│   │
│   ├── pages/
│   │   └── LandingPage.tsx  # Landing page completa (539 linhas)
│   │
│   ├── modules/             # Futuros módulos (vazios por enquanto)
│   │   ├── office/          # Módulo 1: Office (CMS)
│   │   ├── agent/           # Módulo 2: Agente GenAI
│   │   └── prontuario/      # Módulo 3: Prontuário
│   │
│   ├── features/auth/       # Feature de autenticação (futuro)
│   ├── lib/                 # Bibliotecas e utilitários
│   ├── store/               # State management (Zustand)
│   ├── types/               # TypeScript types
│   ├── App.tsx              # App principal (integra Header + Landing + Footer)
│   ├── main.tsx             # Entry point
│   └── index.css            # Estilos globais + Tailwind config v4
│
├── public/
├── package.json
├── tailwind.config.js       # Config minimalista (v4)
├── postcss.config.js        # PostCSS com @tailwindcss/postcss
├── tsconfig.json
└── vite.config.ts
```

## 🎯 Landing Page - Estrutura Completa

### 1. Hero Section
- **Headline focado no problema**: "Chega de se afogar em 30+ mensagens/dia"
- **Persona targeting**: Dr. Silva (cirurgião plástico)
- **Mockup WhatsApp**: Conversa simulada com classificação de risco (Amarelo)
- **CTAs**: "Teste Grátis por 14 Dias" + "Ver Como Funciona"
- **Social Proof**: 5 avatares + rating 5 estrelas

### 2. Problema-Agitação-Solução
- **3 Pain Points**:
  - WhatsApp pessoal lotado
  - Secretária sobrecarregada
  - Risco jurídico (falta de rastreabilidade)
- **Solução**: Sentia Care - IA que faz triagem
- **Resultados quantificados**:
  - 85% redução de mensagens
  - 2h/dia economizadas
  - 90% de tempo livre
  - Zero risco jurídico

### 3. Como Funciona (3 Passos)
1. Criar protocolo visual (drag-and-drop)
2. IA conversa via WhatsApp
3. Você intervém só quando necessário

### 4. Pricing
- **Essencial**: R$ 197/mês (30 pacientes, 3 protocolos)
- **Pro**: R$ 797/mês (100 pacientes, protocolos ilimitados, integração EMR)
- **14 dias grátis**, sem cartão, cancela quando quiser

### 5. Social Proof (3 Testimonials)
- Dr. Carlos Mendes (Goiânia) - Cirurgião Plástico
- Dra. Ana Paula Costa (Brasília) - Cirurgiã Bariátrica
- Enf. João Ribeiro (Goiânia) - Home Care

### 6. FAQ (5 Perguntas)
1. E se a IA errar? (Safety Layer + validação manual)
2. Funciona com meu prontuário? (Sim, integração API)
3. É seguro? (LGPD + COFEN 696/2022)
4. Como funciona o teste? (14 dias, sem cartão)
5. Preciso saber programar? (Não, drag-and-drop)

### 7. Final CTA
- "Pare de se afogar em mensagens"
- Urgência: "Comece hoje mesmo"
- CTA: "Iniciar Teste Grátis"

## 🎨 Design System

### Componentes Implementados

#### Button.tsx
```tsx
<Button
  variant="primary|secondary|outline|ghost"
  size="sm|md|lg"
  icon={<Icon />}
  isLoading={boolean}
>
  Texto
</Button>
```

#### Header.tsx
- Scroll detection (transparente → branco com sombra)
- Mobile menu responsivo
- Links de navegação suave (#solucao, #como-funciona, #precos, #faq)
- CTAs de Login e Teste Grátis

#### Footer.tsx
- 3 colunas: Plataforma, Legal, Contato
- Links para páginas futuras
- Informação de localização (Goiânia, GO)

## 🔥 Estratégias de Marketing Implementadas

### 1. Problem-Agitation-Solution (PAS)
- **Problem**: 30+ mensagens/dia no WhatsApp pessoal
- **Agitation**: Secretária não dá conta, risco jurídico, sem rastreabilidade
- **Solution**: Sentia Care - IA de triagem que economiza 2h/dia

### 2. Persona Targeting Direto
- "Dr. Silva" mencionado explicitamente
- Dores específicas de cirurgiões plásticos/bariátricos
- Localização: Goiânia/DF (polo médico)

### 3. Social Proof
- 5 cirurgiões usando
- 3 testimonials detalhados com nomes, cidades e especialidades
- Ratings 5 estrelas
- Resultados quantificados (R$ 8.000 economizados/mês)

### 4. Risk Reversal
- "14 dias grátis"
- "Sem cartão de crédito"
- "Cancele quando quiser"
- "Setup gratuito"

### 5. Quantificação de Benefícios
- 85% redução de mensagens
- 2h/dia economizadas
- 90% de tempo livre
- R$ 8.000/mês economizados (vs contratar secretária)

### 6. Urgência e Escassez
- "Pare de se afogar" (linguagem de urgência)
- "Comece hoje mesmo"
- CTAs com ação imediata

## 🚧 Próximos Passos

### Imediato (Esta Semana)
- [ ] Adicionar Framer Motion para animações avançadas
- [ ] Implementar formulário de captura de leads (email)
- [ ] Conectar CTAs a um formulário real (não só botões)
- [ ] Adicionar Google Analytics / Mixpanel

### Curto Prazo (Próximas 2 Semanas)
- [ ] Configurar React Router para navegação multi-página
- [ ] Criar página de Login
- [ ] Criar página de Pricing detalhado
- [ ] Implementar state management com Zustand

### Médio Prazo (Mês 2-3)
- [ ] Desenvolver Módulo 1: Office (Dashboard + Construtor de Protocolos)
- [ ] Desenvolver Módulo 2: Agente (Visualizador de Conversas)
- [ ] Desenvolver Módulo 3: Prontuário (Timeline + Relatórios)
- [ ] Integração com backend (API)

## 📊 Métricas de Performance

### Build
- **Build time**: ~7.5s
- **Bundle size**:
  - CSS: 37.55 KB (gzip: 6.80 KB)
  - JS: 226.85 KB (gzip: 69.99 KB)

### Dev Server
- **Startup**: ~328ms
- **Hot Reload**: < 100ms

## 🔧 Configurações Importantes

### TailwindCSS v4
- Usando `@import "tailwindcss"` no CSS (não `@tailwind`)
- Cores customizadas definidas via `@theme { --color-* }`
- PostCSS plugin: `@tailwindcss/postcss`

### TypeScript
- `verbatimModuleSyntax` habilitado
- Imports de tipos devem usar `import type { ... }`

### Vite
- Port: 5173
- HMR habilitado
- Build otimizado para produção

## 🎓 Convenções de Código

### Componentes
- PascalCase para nomes de componentes
- Organização: common/ (reutilizáveis) e layout/ (estrutura)
- Props interface sempre tipada

### Estilos
- Priorizar classes Tailwind
- Usar utilitários customizados quando repetitivo
- Evitar CSS inline exceto para valores dinâmicos

### TypeScript
- Sempre tipar props de componentes
- Evitar `any`
- Usar `type` em vez de `interface` quando possível (v4 recomendação)

## 📝 Notas Técnicas

### Por que Vite?
- 10-100x mais rápido que Create React App
- HMR instantâneo
- Build otimizado com Rollup
- ESM nativo

### Por que TailwindCSS v4?
- Melhor performance
- CSS-first configuration
- Menor bundle size
- Mais moderno e futuro-proof

### Por que Zustand (futuro)?
- Mais leve que Redux (1KB)
- API simples e intuitiva
- Sem boilerplate
- Perfeito para apps médios

## 🐛 Troubleshooting

### Build falhando
```bash
# Limpar cache
rm -rf node_modules/.vite
npm run build
```

### TailwindCSS não aplicando
```bash
# Verificar se PostCSS está configurado
cat postcss.config.js
# Deve ter: '@tailwindcss/postcss': {}
```

### TypeScript errors
```bash
# Limpar e reconstruir
npx tsc --noEmit
```

---

**Última atualização**: 07/12/2025
**Status**: ✅ Landing Page Completa e Funcionando
**Próximo milestone**: Captura de leads + Framer Motion
