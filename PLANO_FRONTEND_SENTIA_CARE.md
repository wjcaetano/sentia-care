# Plano de Negócios: Sentia Care
# Plataforma SaaS para Automação de Cuidado via GenAI

---

## 📋 Sumário Executivo

### Visão Geral do Negócio

O **Sentia Care** é uma plataforma SaaS B2B que automatiza o follow-up e a documentação clínica para profissionais de enfermagem, transformando conversas via WhatsApp em dados estruturados e alertas de risco, em total conformidade com o COFEN.

**Diferencial Estratégico:** Ao contrário de plataformas completas de telenfermagem, o Sentia Care é uma **camada de inteligência artificial** que se conecta a prontuários eletrônicos existentes, focando no que realmente importa: automação de protocolos e triagem inteligente.

### Proposta de Valor Única (PVU)

**"Inteligência para o Cuidado Contínuo"**

O Sentia Care não é um EMR (prontuário eletrônico). É o **Agente de IA mais eficiente** para transformar a prática episódica em cuidado contínuo:

1. **Automação de Protocolos:** Workflows de follow-up executados automaticamente via WhatsApp
2. **Triagem Inteligente:** GenAI classifica riscos (Verde/Amarelo/Vermelho) e escala emergências
3. **Plug-and-Play:** Integra com EMRs existentes (iClinic, Ninsaúde) sem substituí-los
4. **Marketplace de Protocolos:** Network effect - protocolos licenciados criam ecossistema de conhecimento

### Oportunidade de Mercado

**Nicho de Foco (MVP):**
- **Vertical Primária:** Cirurgia Plástica/Bariatrica/Estética Avançada
- **Vertical Secundária:** Enfermeiros de Home Care de Alto Padrão
- **Geografia:** Goiânia/DF (Polo Médico) - venda presencial consultiva

**Por que este segmento?**
- Alto ticket (R$ 15k-40k por procedimento)
- Alta responsabilidade pós-operatória
- Sobrecarga de equipe com WhatsApp pessoal
- Necessidade de comprovação de serviço (defensabilidade legal)

**Projeções:**
- Mercado de telessaúde no Brasil: 30+ milhões de atendimentos em 2023 (crescimento de 172%)
- Telenfermagem regulamentada (COFEN 696/2022) com demanda latente
- MVP de 90 dias com 10 clientes ativos gerando MRR

---

## 1. Análise de Mercado e Posicionamento

### 1.1 O Mercado de Telenfermagem no Brasil

A telenfermagem transcendeu o período pandêmico e está consolidada pela **Resolução COFEN 696/2022**, que habilita:
- Consulta de Enfermagem
- Interconsulta
- Consultoria
- **Monitoramento** (core do Sentia Care)
- Educação em Saúde
- Acolhimento da Demanda Espontânea

**Oportunidade:** A maioria das plataformas foca em telemedicina para médicos. O Sentia Care ocupa o nicho **especializado de automação para enfermagem**.

### 1.2 ICP Detalhado (Ideal Customer Profile)

| Categoria | Perfil do Cliente Ideal | Dor Específica |
|-----------|-------------------------|----------------|
| **Persona Primária** | Dr. Silva - Cirurgião Plástico | Recebe 30+ mensagens/dia no WhatsApp pessoal de pacientes pós-operatórios. Secretária sobrecarregada. |
| **Características** | 1-3 secretárias/atendentes; usa WhatsApp pessoal; já tem EMR simples (iClinic/Prontuário em papel) | Falta de rastreabilidade, risco de processos, incapacidade de escalar atendimento |
| **Gatilho de Compra** | Evento adverso (complicação não detectada a tempo) ou crescimento rápido da clínica | Medo de negligência + desejo de profissionalizar |
| **Budget** | R$ 500-2.000/mês (menos que o custo de 1 secretária adicional) | Precisa ver ROI claro em 30 dias |

### 1.3 Análise da Concorrência

| Concorrente | Foco | Fraqueza | Oportunidade Sentia Care |
|-------------|------|----------|--------------------------|
| **iClinic, Prontmed** | EMR completo para médicos | GenAI limitada, não foca em enfermagem, não tem automação de protocolo | Integrar como "add-on" de IA |
| **Personal Nurse** (conceito) | Plataforma completa de telenfermagem | Muito complexo, tenta fazer tudo (vídeo, agenda, EMR) | Ser mais enxuto e focado |
| **Chatbots genéricos** | Atendimento automatizado | Não têm contexto clínico, sem triagem de risco | Especialização clínica e compliance |

**Veredicto:** Nenhuma solução atual combina **GenAI especializada + Conformidade COFEN + Plug-and-Play com EMRs**.

---

## 2. Arquitetura de Produto: Os 3 Módulos

O Sentia Care se divide em três módulos de valor, sendo o **Módulo 2 (Agente GenAI)** o Moat competitivo.

### 2.1 Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                    SENTIA CARE                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  MÓDULO 1    │  │  MÓDULO 2    │  │  MÓDULO 3    │  │
│  │              │  │              │  │              │  │
│  │  O OFFICE    │  │  O AGENTE    │  │ O PRONTUÁRIO │  │
│  │    (CMS)     │  │   (GenAI)    │  │    (Data)    │  │
│  │              │  │              │  │              │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│         │                 │                  │          │
│         │                 │                  │          │
│         └─────────────────┴──────────────────┘          │
│                          │                              │
└──────────────────────────┼──────────────────────────────┘
                           │
                    ┌──────┴──────┐
                    │             │
            ┌───────▼──────┐  ┌──▼────────┐
            │ EMR Externo  │  │ WhatsApp  │
            │ (iClinic)    │  │ Business  │
            └──────────────┘  └───────────┘
```

### 2.2 Módulo 1: O Office (Back Office do Profissional)

**Usuário:** Enfermeiro, Médico, Administrador da Clínica

**Valor Entregue:** Controle total sobre protocolos, pacientes e monitoramento de risco

#### Funcionalidades Core

| Funcionalidade | Descrição | Impacto |
|----------------|-----------|---------|
| **Construtor de Protocolos Visual** | Ferramenta drag-and-drop para criar workflows (Ex: "Dia 3 pós-op, 10h → Perguntar sobre curativo") | Elimina a necessidade de programação |
| **Biblioteca de Protocolos** | Templates prontos: "Pós-Lipoaspiração", "Pós-Bariátrica", "Hipertensão" | Valor imediato (time-to-value < 1h) |
| **Dashboard de Risco** | Visão única: Pacientes Ativos / Alerta Vermelho / Aderência | Tranquilidade clínica |
| **Registro Simplificado de Pacientes** | Nome, WhatsApp, Protocolo ativo | Onboarding < 2 min por paciente |
| **Escalonamento de Alertas Críticos** | SMS/Push quando IA detecta emergência | Segurança jurídica |

#### Fluxo de Uso (Profissional)

```
1. Login no Painel Web
2. Criar/Selecionar Protocolo (Ex: "Pós-Lipo 14 dias")
3. Cadastrar Paciente (Nome: Maria, Tel: +55 62 99999-9999)
4. Ativar Protocolo → Sistema dispara primeiro contato no WhatsApp
5. Monitorar Dashboard → Ver status de todos os pacientes
6. Receber Alerta Vermelho → Intervir manualmente
```

---

### 2.3 Módulo 2: O Agente (GenAI) - **O MOAT**

**Usuário:** Paciente (via WhatsApp) + Sistema Autônomo

**Valor Entregue:** Automação conversacional com triagem inteligente e coleta estruturada de dados

#### Funcionalidades Core

| Funcionalidade | Descrição | Tecnologia |
|----------------|-----------|------------|
| **Disparo Automático de Mensagens** | Envia mensagens no horário definido pelo protocolo | Scheduler + WhatsApp Business API |
| **Conversa Natural (NLU)** | Entende linguagem coloquial ("tô com dor forte", "tirei foto do curativo") | LLM (GPT-4/Gemini) com guardrails |
| **Triagem e Classificação de Risco** | Verde (OK) / Amarelo (Revisão) / Vermelho (Emergência) | Modelo proprietário de classificação |
| **Coleta Estruturada de Dados** | Converte texto livre em campos estruturados (Sintoma: Dor, Intensidade: 8/10) | NLP + Schema Validation |
| **Guardrail Legal** | Em emergência, interrompe conversa, alerta profissional e orienta buscar hospital | Safety Layer proprietário |
| **FAQ Inteligente** | Responde dúvidas baseadas na base de conhecimento do protocolo | RAG (Retrieval-Augmented Generation) |

#### Exemplo de Interação

**Protocolo Ativo:** Pós-Lipoaspiração (Dia 5)

```
AGENTE: Bom dia, Maria! 🌸 Como você está se sentindo hoje?
        Seu curativo está seco e sem vermelhidão?

PACIENTE: Oi, tá tudo bem, mas tô sentindo uma dor no lado direito

AGENTE: Entendi. Vou fazer algumas perguntas para avaliar:
        Em uma escala de 0 a 10, qual a intensidade da dor?

PACIENTE: Uns 7

AGENTE: A dor é constante ou só quando você se move?

PACIENTE: Só quando me mexo

[Sistema classifica: ALERTA AMARELO - Dor moderada pós-operatória]
[Registra: Sintoma: Dor lateral direita, Intensidade: 7/10, Gatilho: Movimento]

AGENTE: Obrigado pelas informações, Maria. Vou registrar isso e
        a Dra. Ana irá revisar. Continue tomando o analgésico
        prescrito. Se a dor piorar, me avise imediatamente. ❤️

[Notificação enviada ao profissional: "Maria - Alerta Amarelo - Dor 7/10"]
```

**Se a paciente dissesse "tô com muita falta de ar":**

```
AGENTE: ⚠️ Maria, falta de ar pode ser sério.
        PARE O QUE ESTÁ FAZENDO E PROCURE ATENDIMENTO MÉDICO IMEDIATAMENTE.
        Vou avisar a Dra. Ana agora.

[ALERTA VERMELHO disparado via SMS para a Dra. Ana]
[Protocolo pausado até intervenção humana]
```

#### Arquitetura Técnica do Agente

```
┌─────────────────────────────────────────────────────┐
│           AGENTE SENTIA (GenAI Pipeline)            │
├─────────────────────────────────────────────────────┤
│                                                     │
│  1. INPUT (WhatsApp)                                │
│     └─> Mensagem do paciente                        │
│                                                     │
│  2. PREPROCESSING                                   │
│     └─> Sanitização, detecção de língua             │
│                                                     │
│  3. CONTEXTO (RAG)                                  │
│     └─> Busca na base do protocolo ativo            │
│                                                     │
│  4. LLM (Geração)                                   │
│     └─> Gemini/GPT-4 com prompt engineering        │
│                                                     │
│  5. SAFETY LAYER (Proprietário)                    │
│     ├─> Checklist de palavras críticas             │
│     ├─> Validação de resposta (não alucinar)       │
│     └─> Classificação de risco                     │
│                                                     │
│  6. ESTRUTURAÇÃO                                    │
│     └─> Extração de entidades (NER)                │
│     └─> Conversão para JSON schema                 │
│                                                     │
│  7. DECISÃO                                         │
│     ├─> Verde: Continua conversa                   │
│     ├─> Amarelo: Notifica profissional + continua  │
│     └─> Vermelho: Escala + pausa protocolo         │
│                                                     │
│  8. OUTPUT                                          │
│     ├─> Resposta ao paciente (WhatsApp)            │
│     └─> Registro no prontuário (JSON)              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

### 2.4 Módulo 3: O Prontuário (Dados e Conformidade)

**Usuário:** Profissional (visualização) + Auditoria Legal

**Valor Entregue:** Repositório legal, rastreabilidade e análise de aderência

#### Funcionalidades Core

| Funcionalidade | Descrição | Compliance |
|----------------|-----------|------------|
| **Log Imutável de Interações** | Toda conversa WhatsApp + ações da IA registradas com timestamp | LGPD + COFEN |
| **Relatório de Aderência** | % de pacientes que seguiram protocolo, tempo médio de resposta | Valor para gestão |
| **Histórico Conversacional** | Timeline visual de toda a jornada do paciente | Defesa jurídica |
| **Exportação Legal** | PDF assinado digitalmente para anexar ao EMR | Lei 13.787/2018 |
| **Integração com EMR Externo** | API para enviar/receber dados de iClinic, Ninsaúde | Interoperabilidade |
| **Auditoria e Criptografia** | Logs de acesso, criptografia AES-256 | LGPD Art. 46 |

#### Estrutura de Dados (JSON Schema)

```json
{
  "patient_id": "uuid-123",
  "protocol_id": "pos-lipo-14d",
  "status": "active",
  "risk_level": "yellow",
  "timeline": [
    {
      "timestamp": "2025-12-06T10:00:00Z",
      "type": "agent_message",
      "content": "Bom dia, Maria! Como você está?",
      "read": true
    },
    {
      "timestamp": "2025-12-06T10:05:00Z",
      "type": "patient_message",
      "content": "Tô com dor no lado direito",
      "structured_data": {
        "symptom": "dor_lateral_direita",
        "intensity": 7,
        "trigger": "movimento"
      },
      "risk_classification": "yellow"
    },
    {
      "timestamp": "2025-12-06T10:05:30Z",
      "type": "alert",
      "level": "yellow",
      "notified_to": "dra.ana@clinica.com",
      "action_taken": "notification_sent"
    }
  ],
  "adherence_score": 0.85,
  "last_interaction": "2025-12-06T10:05:00Z"
}
```

---

## 3. Stack Tecnológica e Arquitetura Frontend

### 3.1 Decisão Arquitetural: Monolito Modular vs Microserviços

**Escolha:** **Monolito Modular** (para MVP de 90 dias)

**Justificativa:**
- Velocidade de desenvolvimento
- Menor complexidade operacional
- Fácil debugging
- Preparado para migração futura (módulos isolados)

### 3.2 Stack Recomendada

```
┌─────────────────────────────────────────────────┐
│            SENTIA CARE FRONTEND                 │
├─────────────────────────────────────────────────┤
│ Framework:       React 18 + TypeScript + Vite  │
│ Roteamento:      React Router v6               │
│ Estado:          Zustand (global) + React Query│
│ UI:              TailwindCSS + Headless UI     │
│ Formulários:     React Hook Form + Zod         │
│ Gráficos:        Recharts                      │
│ Flow Builder:    React Flow (drag-and-drop)    │
│ Chat UI:         Custom (não usar lib pronta)  │
│ Notificações:    React Toastify                │
│ Analytics:       Mixpanel + Sentry             │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│              BACKEND & INTEGRAÇÕES              │
├─────────────────────────────────────────────────┤
│ API:             Node.js + Express (REST)      │
│ Database:        PostgreSQL (dados estruturados│
│ Cache:           Redis (sessões, rate limit)   │
│ Queue:           Bull (jobs assíncronos)       │
│ GenAI:           OpenAI API / Google Gemini    │
│ WhatsApp:        WhatsApp Business API         │
│ SMS:             Twilio                        │
│ Storage:         AWS S3 (arquivos)             │
│ EMR Integration: REST APIs (iClinic, Ninsaúde) │
│ Deploy:          AWS / Google Cloud            │
└─────────────────────────────────────────────────┘
```

### 3.3 Estrutura de Pastas (Arquitetura Modular)

```
sentia-care-frontend/
├── public/
│   └── assets/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── routes.tsx
│   │   └── providers.tsx
│   │
│   ├── modules/                    # 3 MÓDULOS PRINCIPAIS
│   │   │
│   │   ├── office/                 # MÓDULO 1: OFFICE (CMS)
│   │   │   ├── components/
│   │   │   │   ├── ProtocolBuilder/
│   │   │   │   │   ├── FlowCanvas.tsx
│   │   │   │   │   ├── NodeLibrary.tsx
│   │   │   │   │   └── ProtocolPreview.tsx
│   │   │   │   ├── Dashboard/
│   │   │   │   │   ├── RiskOverview.tsx
│   │   │   │   │   ├── PatientGrid.tsx
│   │   │   │   │   └── AlertPanel.tsx
│   │   │   │   └── PatientManagement/
│   │   │   │       ├── PatientList.tsx
│   │   │   │       ├── PatientForm.tsx
│   │   │   │       └── PatientDetail.tsx
│   │   │   ├── pages/
│   │   │   │   ├── DashboardPage.tsx
│   │   │   │   ├── ProtocolsPage.tsx
│   │   │   │   └── PatientsPage.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useProtocols.ts
│   │   │   │   └── useRiskDashboard.ts
│   │   │   └── types/
│   │   │       └── protocol.types.ts
│   │   │
│   │   ├── agent/                  # MÓDULO 2: AGENTE (GenAI)
│   │   │   ├── components/
│   │   │   │   ├── ConversationView/
│   │   │   │   │   ├── MessageBubble.tsx
│   │   │   │   │   ├── RiskBadge.tsx
│   │   │   │   │   └── Timeline.tsx
│   │   │   │   └── ManualIntervention/
│   │   │   │       └── TakeOverModal.tsx
│   │   │   ├── pages/
│   │   │   │   └── ConversationPage.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useConversation.ts
│   │   │   └── types/
│   │   │       └── message.types.ts
│   │   │
│   │   └── prontuario/             # MÓDULO 3: PRONTUÁRIO (Data)
│   │       ├── components/
│   │       │   ├── Timeline/
│   │       │   │   ├── EventTimeline.tsx
│   │       │   │   └── EventCard.tsx
│   │       │   ├── Reports/
│   │       │   │   ├── AdherenceReport.tsx
│   │       │   │   └── ExportPDF.tsx
│   │       │   └── Integration/
│   │       │       └── EMRSync.tsx
│   │       ├── pages/
│   │       │   ├── ProntuarioPage.tsx
│   │       │   └── ReportsPage.tsx
│   │       ├── hooks/
│   │       │   └── useProntuario.ts
│   │       └── types/
│   │           └── prontuario.types.ts
│   │
│   ├── features/                   # FEATURES COMPARTILHADAS
│   │   ├── auth/
│   │   ├── settings/
│   │   └── notifications/
│   │
│   ├── components/                 # COMPONENTES COMUNS
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   └── Badge/
│   │   └── layout/
│   │       ├── Header/
│   │       ├── Sidebar/
│   │       └── DashboardLayout/
│   │
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   └── endpoints.ts
│   │   └── utils/
│   │       ├── risk-classifier.ts
│   │       └── protocol-validator.ts
│   │
│   ├── store/
│   │   ├── authStore.ts
│   │   ├── protocolStore.ts
│   │   └── notificationStore.ts
│   │
│   └── types/
│       ├── api.types.ts
│       └── common.types.ts
```

---

## 4. Mapeamento de Páginas e Rotas

### 4.1 Rotas do Sistema

```typescript
// src/app/routes.tsx

const routes = {
  // ============ PÚBLICAS ============
  public: {
    landing: '/',
    pricing: '/planos',
    about: '/sobre',
  },

  // ============ AUTENTICAÇÃO ============
  auth: {
    login: '/login',
    register: '/cadastro',
    forgotPassword: '/recuperar-senha',
  },

  // ============ DASHBOARD PROFISSIONAL ============
  dashboard: {
    root: '/dashboard',
    overview: '/dashboard/visao-geral',        // Dashboard de Risco
  },

  // ============ MÓDULO 1: OFFICE ============
  office: {
    // Protocolos
    protocols: {
      list: '/protocolos',                     // Biblioteca de Protocolos
      create: '/protocolos/criar',             // Construtor Visual
      edit: '/protocolos/:id/editar',
      preview: '/protocolos/:id',
    },

    // Pacientes
    patients: {
      list: '/pacientes',                      // Lista de Pacientes
      create: '/pacientes/cadastrar',
      detail: '/pacientes/:id',                // Detalhes + Ativar Protocolo
    },
  },

  // ============ MÓDULO 2: AGENTE ============
  agent: {
    conversations: '/conversas',               // Lista de todas conversas ativas
    conversation: '/conversas/:patientId',     // Visualização de conversa específica
    takeOver: '/conversas/:patientId/intervir', // Intervenção manual
  },

  // ============ MÓDULO 3: PRONTUÁRIO ============
  prontuario: {
    view: '/prontuario/:patientId',            // Timeline completo
    reports: '/relatorios',                    // Relatórios de Aderência
    export: '/prontuario/:patientId/exportar', // PDF Legal
  },

  // ============ CONFIGURAÇÕES ============
  settings: {
    profile: '/configuracoes/perfil',
    integrations: '/configuracoes/integracoes', // Conectar EMR
    team: '/configuracoes/equipe',
    billing: '/configuracoes/faturamento',
  },
};
```

### 4.2 Proteção de Rotas

```typescript
// Todos usuários autenticados têm acesso às mesmas funcionalidades no MVP
// Futuramente: role-based access (admin, nurse, doctor)

<Route element={<ProtectedRoute />}>
  <Route element={<DashboardLayout />}>
    <Route path="/dashboard/visao-geral" element={<RiskDashboard />} />
    <Route path="/protocolos" element={<ProtocolsList />} />
    <Route path="/pacientes" element={<PatientsList />} />
    <Route path="/conversas/:patientId" element={<ConversationView />} />
    {/* ... */}
  </Route>
</Route>
```

---

## 5. Componentes Principais do MVP

### 5.1 Construtor de Protocolos (React Flow)

**Biblioteca:** `react-flow-renderer`

**Funcionalidade:** Drag-and-drop visual para criar workflows

**Nodes do Protocolo:**

| Node Type | Descrição | Configuração |
|-----------|-----------|--------------|
| **Trigger** | Início do protocolo (Ex: "Dia 0 - Alta do paciente") | Data/Hora de início |
| **Message** | Mensagem automática do Agente | Template de mensagem + variáveis |
| **Question** | Pergunta que espera resposta | Tipo de resposta (texto/escala/múltipla escolha) |
| **Decision** | Bifurcação baseada na resposta | Condições (if/else) |
| **Alert** | Disparo de alerta ao profissional | Nível de criticidade |
| **Wait** | Aguardar X horas/dias | Duração |
| **End** | Fim do protocolo | Ação final (desativar/renovar) |

**Exemplo Visual:**

```
[Trigger: Dia 0]
    ↓
[Message: "Bem-vinda! Como foi a cirurgia?"]
    ↓
[Question: "Escala de dor 0-10?"]
    ↓
[Decision: dor >= 7?]
    ├─ SIM → [Alert: Amarelo] → [Message: "Vou avisar a Dra."]
    └─ NÃO → [Message: "Ótimo! Continue o repouso"]
    ↓
[Wait: 24h]
    ↓
[Message: "Como está o curativo?"]
```

### 5.2 Dashboard de Risco

**Componente:** `RiskDashboard.tsx`

**Layout:**

```
┌─────────────────────────────────────────────────────────┐
│  DASHBOARD - VISÃO GERAL                       [Filtros]│
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐           │
│  │ Pacientes │  │  Alertas  │  │  Aderência│           │
│  │  Ativos   │  │ Críticos  │  │   Média   │           │
│  │    28     │  │     3     │  │    87%    │           │
│  └───────────┘  └───────────┘  └───────────┘           │
│                                                         │
│  ALERTAS CRÍTICOS (VERMELHO)                           │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 🔴 Maria Silva - Falta de ar (5 min atrás)     │   │
│  │    [Ver Conversa] [Ligar Agora]                │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 🔴 João Santos - Febre 39.5°C (12 min atrás)   │   │
│  │    [Ver Conversa] [Ligar Agora]                │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  PACIENTES ATIVOS (VERDE/AMARELO)                      │
│  ┌──────┬────────────┬──────────┬──────────┬─────────┐ │
│  │ Status│    Nome   │ Protocolo│ Últ. Msg│  Ação   │ │
│  ├──────┼────────────┼──────────┼──────────┼─────────┤ │
│  │  🟢  │ Ana Costa  │ Pós-Lipo │  2h atrás│ [Ver]   │ │
│  │  🟡  │ Pedro Lima │ Pós-Bari │  8h atrás│ [Ver]   │ │
│  │  🟢  │ Carla Dias │ Pós-Lipo │  1h atrás│ [Ver]   │ │
│  └──────┴────────────┴──────────┴──────────┴─────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 5.3 Visualizador de Conversa

**Componente:** `ConversationView.tsx`

**Layout:**

```
┌─────────────────────────────────────────────────────────┐
│  CONVERSA - Maria Silva                        [🔴 Ativo]│
│  Protocolo: Pós-Lipoaspiração (Dia 5/14)                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Timeline de Eventos                                    │
│                                                         │
│  ┌───────────────────────────────────────────────┐     │
│  │ [BOT] 10:00 - Bom dia, Maria! Como você está? │     │
│  └───────────────────────────────────────────────┘     │
│           ┌────────────────────────────────────┐       │
│           │ [MARIA] 10:05 - Tô com dor no lado │       │
│           │                  direito 😢         │       │
│           └────────────────────────────────────┘       │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 🟡 ALERTA AMARELO detectado                     │   │
│  │ Sintoma: Dor lateral direita                    │   │
│  │ Intensidade: 7/10                               │   │
│  │ [Intervir Manualmente] [Marcar como Revisado]   │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌───────────────────────────────────────────────┐     │
│  │ [BOT] 10:06 - A dor é constante ou só          │     │
│  │              quando você se move?               │     │
│  └───────────────────────────────────────────────┘     │
│                                                         │
│  [Digite para intervir manualmente...]                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 6. Integrações Estratégicas

### 6.1 Integração com EMRs (Plug-and-Play)

**Estratégia:** Não construir EMR próprio. Conectar via API.

| EMR | API Disponível | Dados que Sentia Care Puxa | Dados que Sentia Care Envia |
|-----|----------------|---------------------------|----------------------------|
| **iClinic** | ✅ Sim | Nome, CPF, Telefone, ID do paciente | Logs de monitoramento (JSON), Alertas |
| **Ninsaúde** | ✅ Sim | Nome, CPF, Telefone, ID do paciente | Logs de monitoramento (JSON), Alertas |
| **Prontmed** | ⚠️ Verificar | - | - |

**Fluxo de Integração:**

```
1. Profissional conecta conta do iClinic (OAuth)
2. Sentia Care sincroniza lista de pacientes
3. Profissional ativa protocolo para paciente X
4. Durante monitoramento, Sentia Care:
   - Lê dados básicos do iClinic
   - Executa protocolo via WhatsApp
   - Envia logs estruturados de volta para o iClinic
```

**Implementação:**

```typescript
// src/lib/api/integrations/iclinic.ts

export class iClinicIntegration {
  async syncPatients(accessToken: string) {
    const response = await axios.get('https://api.iclinic.com.br/patients', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response.data;
  }

  async sendMonitoringLog(patientId: string, log: MonitoringLog) {
    await axios.post(`https://api.iclinic.com.br/patients/${patientId}/notes`, {
      content: JSON.stringify(log),
      type: 'monitoring',
      created_by: 'Sentia Care'
    });
  }
}
```

### 6.2 WhatsApp Business API

**Provedor:** Meta / Twilio / MessageBird

**Requisitos:**
- Conta Business verificada
- Número de telefone dedicado
- Templates de mensagem aprovados pela Meta

**Fluxo:**

```
1. Protocolo dispara: "Enviar mensagem no Dia 3, 10h"
2. Backend enfileira job (Bull Queue)
3. Worker executa:
   - Renderiza template com variáveis
   - Envia via WhatsApp Business API
   - Registra no log do prontuário
4. Webhook recebe resposta do paciente
5. IA processa resposta
6. Próximo step do protocolo
```

### 6.3 GenAI (OpenAI / Google Gemini)

**Escolha Recomendada:** **Google Gemini** (custo/benefício)

**Uso:**

```typescript
// src/lib/ai/agent.ts

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function classifyMessage(
  patientMessage: string,
  protocolContext: string
) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
Você é um assistente de triagem clínica para enfermagem.

CONTEXTO DO PROTOCOLO:
${protocolContext}

MENSAGEM DO PACIENTE:
"${patientMessage}"

TAREFA:
1. Extraia sintomas, intensidade e gatilhos
2. Classifique o risco: VERDE, AMARELO ou VERMELHO
3. Retorne JSON estruturado

RESPOSTA (JSON):
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return JSON.parse(text);
}
```

**Safety Layer:**

```typescript
// Checklist de emergência (palavras-chave)
const CRITICAL_KEYWORDS = [
  'falta de ar', 'sufocando', 'dor no peito',
  'hemorragia', 'sangramento intenso', 'desmaiei',
  'convulsão', 'febre alta', 'temperatura 39'
];

function checkCriticalKeywords(message: string): boolean {
  return CRITICAL_KEYWORDS.some(keyword =>
    message.toLowerCase().includes(keyword)
  );
}
```

---

## 7. Segurança e Compliance

### 7.1 LGPD (Lei Geral de Proteção de Dados)

| Requisito | Implementação no Sentia Care |
|-----------|------------------------------|
| **Consentimento** | Termo de aceite obrigatório antes do primeiro contato via WhatsApp |
| **Minimização de Dados** | Coletar apenas Nome, Telefone, CPF (opcional). Não coletar dados desnecessários |
| **Direito ao Esquecimento** | Funcionalidade de exclusão de conta + anonimização de dados históricos |
| **Portabilidade** | Export de todos os dados do paciente em JSON |
| **Criptografia** | AES-256 para dados em repouso, TLS 1.3 para dados em trânsito |
| **Logs de Auditoria** | Registro de todos acessos ao prontuário (quem, quando, o quê) |

### 7.2 COFEN 696/2022 (Telenfermagem)

| Requisito | Implementação |
|-----------|---------------|
| **Consentimento do Paciente** | Termo digital assinado antes de ativar protocolo |
| **Registro Profissional** | Validação de COREN no cadastro do profissional |
| **Assinatura Digital** | Integração com provedor ICP-Brasil para documentos |
| **Documentação Adequada** | Prontuário eletrônico conforme Lei 13.787/2018 |

### 7.3 Segurança Técnica

```
┌─────────────────────────────────────────────────┐
│           CAMADAS DE SEGURANÇA                  │
├─────────────────────────────────────────────────┤
│ 1. HTTPS/TLS 1.3 (Transporte)                   │
│ 2. JWT com Refresh Token (Autenticação)         │
│ 3. Rate Limiting (Proteção DDoS)                │
│ 4. Input Sanitization (XSS/SQL Injection)       │
│ 5. RBAC (Controle de Acesso)                    │
│ 6. Criptografia AES-256 (Dados Sensíveis)       │
│ 7. WAF - Web Application Firewall               │
│ 8. Penetration Testing (Trimestral)             │
└─────────────────────────────────────────────────┘
```

---

## 8. Roadmap de Implementação: MVP de 90 Dias

### 8.1 Mês 1: Validação e Design (Dias 1-30)

**Objetivo:** Validar a dor, desenhar protocolos e fechar early adopters

| Semana | Atividade | Entregável |
|--------|-----------|------------|
| **S1** | Pesquisa com ICP (Dr. Silva) | 10 entrevistas realizadas, dores validadas |
| **S2** | Mapeamento de 5 protocolos | Documentação de protocolos (Pós-Lipo, Pós-Bari, Hipertensão, Diabetes, Feridas) |
| **S3** | Design de UI/UX (Figma) | Protótipos de alta fidelidade (Dashboard, Construtor, Conversa) |
| **S4** | Fechamento de Early Adopters | 5 profissionais comprometidos (Concierge MVP - Setup Fee R$ 500) |

**KPIs:**
- ✅ 5 protocolos mapeados
- ✅ 5 clientes early adopters confirmados
- ✅ Design aprovado

---

### 8.2 Mês 2: Desenvolvimento Core (Dias 31-60)

**Objetivo:** Construir MVP funcional dos 3 módulos

| Semana | Módulo | Funcionalidade | Status |
|--------|--------|----------------|--------|
| **S5** | Office | Cadastro de pacientes + Biblioteca de protocolos (templates) | [ ] |
| **S6** | Office | Construtor de Protocolos (React Flow - versão simplificada) | [ ] |
| **S7** | Agente | Integração WhatsApp Business API + Disparo automático de mensagens | [ ] |
| **S8** | Agente | GenAI de triagem (classificação Verde/Amarelo/Vermelho) + Safety Layer | [ ] |

**Stack:**
- Frontend: React + TypeScript + TailwindCSS
- Backend: Node.js + Express + PostgreSQL
- GenAI: Google Gemini API
- WhatsApp: Twilio API (para MVP)

**Entregável:** MVP funcional rodando em staging

---

### 8.3 Mês 3: Iteração e GTM Local (Dias 61-90)

**Objetivo:** Ajustar com base em feedback e escalar para 10 clientes pagantes

| Semana | Atividade | Meta |
|--------|-----------|------|
| **S9** | Deploy para 3 early adopters | 3 clientes ativos usando em produção |
| **S10** | Coleta de feedback e iteração | NPS > 50, Zero incidentes críticos de triagem |
| **S11** | Desenvolvimento do Módulo 3 (Prontuário) | Timeline + Relatórios de aderência |
| **S12** | GTM Local (Goiânia/DF) | 10 clientes pagantes (MRR mínimo: R$ 5k) |

**KPIs Finais:**
- ✅ 10 clientes ativos pagando mensalidade
- ✅ NPS > 50
- ✅ MRR: R$ 5.000 - R$ 10.000
- ✅ Estrutura de licenciamento de protocolos desenhada (base para Moat)

---

## 9. Modelo de Negócio e Precificação

### 9.1 Modelo SaaS com 3 Camadas de Receita

| Camada | Descrição | Público | Receita Estimada |
|--------|-----------|---------|------------------|
| **1. Setup Fee** | Taxa única de implantação e treinamento | Early adopters | R$ 500 - R$ 1.500 |
| **2. Mensalidade SaaS** | Assinatura recorrente por níveis | Todos clientes | R$ 197 - R$ 1.997/mês |
| **3. Protocolos Licenciados** (Visão 2.0) | Marketplace de protocolos premium | Profissionais que querem protocolos especializados | 30% de comissão por protocolo vendido |

### 9.2 Precificação por Níveis

| Plano | Cliente-Alvo | Preço | Recursos |
|-------|--------------|-------|----------|
| **Essencial** | Enfermeiro autônomo ou pequeno consultório | **R$ 197/mês** | Até 30 pacientes ativos, 3 protocolos privados, Dashboard básico, Suporte por email |
| **Pro** | Clínica com 2-5 profissionais | **R$ 797/mês** | Até 100 pacientes ativos, Protocolos ilimitados, Dashboard avançado, Integração com 1 EMR, Suporte prioritário |
| **Enterprise** | Hospital ou rede de clínicas | **Sob Consulta** | Pacientes ilimitados, Multi-tenant, Integrações customizadas, API dedicada, Suporte 24/7, SLA |

### 9.3 Projeção de Receita (12 meses)

**Premissas Conservadoras:**
- Mês 1-3: 10 clientes (Essencial) = R$ 1.970/mês
- Mês 4-6: 25 clientes (15 Essencial + 10 Pro) = R$ 10.925/mês
- Mês 7-9: 50 clientes (25 Essencial + 20 Pro + 5 Enterprise) = R$ 30.000/mês
- Mês 10-12: 80 clientes = R$ 60.000/mês

**ARR (Receita Anual Recorrente) no final do ano 1:** R$ 720.000

**Churn Rate Target:** < 5% mensal

---

## 10. Moat Estratégico: Marketplace de Protocolos

### 10.1 Visão de Longo Prazo (Ano 2)

**Objetivo:** Transformar o Sentia Care no **Hub de Conhecimento Clínico** para enfermagem

**Como funciona:**

1. **Profissionais criam protocolos** no Construtor Visual
2. **Optam por licenciar** seu protocolo no Marketplace
3. **Outros profissionais compram** acesso ao protocolo (modelo de assinatura ou pay-per-use)
4. **Sentia Care cobra 30%** de comissão

**Exemplo:**

- Dra. Ana (cirurgiã plástica renomada) cria protocolo "Pós-Abdominoplastia Premium"
- Disponibiliza no Marketplace por **R$ 97/mês** (licença)
- 50 profissionais assinam
- **Receita mensal:** R$ 4.850
  - Dra. Ana recebe: R$ 3.395
  - Sentia Care recebe: R$ 1.455

**Network Effect:**
- Quanto mais profissionais usam → Mais protocolos criados
- Mais protocolos → Mais atração de novos profissionais
- Dados agregados → IA melhora (análise preditiva)

### 10.2 Moats Adicionais

| Moat | Descrição | Impacto |
|------|-----------|---------|
| **Switching Cost** | Profissional investe tempo criando protocolos no Sentia Care | Dificulta migração para concorrente |
| **Data Moat** | Base de dados agregada e anonimizada de milhões de interações | IA proprietária cada vez mais precisa |
| **Compliance Moat** | Conformidade total com LGPD + COFEN desde o design | Concorrentes precisam reconstruir do zero |
| **Integração Moat** | APIs com principais EMRs do mercado | Lock-in indireto |

---

## 11. Métricas de Sucesso (KPIs)

### 11.1 Métricas de Produto

| Métrica | Target MVP (90 dias) | Target Ano 1 |
|---------|---------------------|--------------|
| **Usuários Ativos (Profissionais)** | 10 | 80 |
| **Pacientes Monitorados** | 300 | 5.000 |
| **Protocolos Criados** | 50 (incluindo templates) | 500 |
| **Mensagens Enviadas/Dia** | 1.000 | 20.000 |
| **Acurácia da Triagem** | 95% | 98% |
| **Tempo Médio de Resposta IA** | < 5 segundos | < 3 segundos |

### 11.2 Métricas de Negócio

| Métrica | Target MVP | Target Ano 1 |
|---------|-----------|--------------|
| **MRR (Monthly Recurring Revenue)** | R$ 5.000 | R$ 60.000 |
| **ARR (Annual Recurring Revenue)** | - | R$ 720.000 |
| **Churn Rate** | < 10% | < 5% |
| **LTV (Lifetime Value)** | R$ 5.000 | R$ 12.000 |
| **CAC (Customer Acquisition Cost)** | R$ 500 | R$ 1.000 |
| **LTV/CAC Ratio** | 10:1 | 12:1 |

### 11.3 Métricas de Qualidade

| Métrica | Target |
|---------|--------|
| **NPS (Net Promoter Score)** | > 50 |
| **Incidentes de Triagem Incorreta** | 0 críticos |
| **Uptime do Sistema** | > 99.5% |
| **Tempo de Setup por Cliente** | < 2 horas |

---

## 12. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| **Responsabilidade Civil (IA errar triagem)** | Média | Crítico | Safety Layer robusto + Disclaimer legal + Seguro de responsabilidade civil |
| **Regulamentação mudar (COFEN)** | Baixa | Alto | Consultoria jurídica contínua + Participação em conselhos |
| **Concorrente grande entrar** | Média | Alto | Velocidade de execução + Network effect via Marketplace |
| **Custo de API GenAI escalar** | Alta | Médio | Otimizar prompts + Considerar modelo próprio (fine-tuning) |
| **Integração com EMR falhar** | Média | Médio | Começar com EMRs de API pública documentada |
| **WhatsApp Business mudar política** | Baixa | Alto | Ter canal alternativo (SMS) + Diversificar para Telegram |

---

## 13. Próximos Passos (Ação Imediata)

### Para Iniciar o Desenvolvimento:

1. ✅ **Aprovar este plano** com stakeholders
2. ✅ **Montar equipe mínima:**
   - 1 Full-Stack Developer (Node.js + React)
   - 1 Frontend Developer (React + TypeScript)
   - 1 UI/UX Designer
   - 1 Product Owner (você)
3. ✅ **Setup de infraestrutura:**
   - Criar conta AWS/Google Cloud
   - Setup de repositório Git (GitHub/GitLab)
   - CI/CD básico (GitHub Actions)
4. ✅ **Validação legal:**
   - Contratar advogado especializado em saúde digital
   - Revisar termos de uso e contrato
5. ✅ **Kickoff do Mês 1:**
   - Entrevistas com ICP
   - Mapeamento de protocolos
   - Design no Figma

---

## 14. Conclusão

O **Sentia Care** não é apenas mais uma plataforma de telemedicina. É uma **camada de inteligência artificial especializada** que resolve uma dor clara: a sobrecarga de trabalho na documentação e monitoramento de pacientes.

**Diferenciais competitivos:**

✅ **Foco cirúrgico:** Automação de protocolos via GenAI, não EMR genérico
✅ **Plug-and-Play:** Integra com prontuários existentes
✅ **Moat de Network Effect:** Marketplace de protocolos licenciados
✅ **Compliance desde o design:** LGPD + COFEN 696/2022
✅ **MVP ágil:** 90 dias para primeiros clientes pagantes

**Se este plano for executado corretamente, o Sentia Care estará posicionado para ser a plataforma líder de automação de cuidado via IA para o mercado de enfermagem no Brasil.**

---

**Versão:** 1.0
**Data:** 06/12/2025
**Autor:** Equipe de Produto Sentia Care
**Status:** Pronto para Execução

**Próximo milestone:** Validação de ICP (10 entrevistas) + 5 protocolos mapeados → Semana 1-2
