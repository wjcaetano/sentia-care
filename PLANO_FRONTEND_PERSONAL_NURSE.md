# Plano Estruturado - Frontend React: Personal Nurse

## 📋 Sumário Executivo

Este documento define o plano completo de desenvolvimento do frontend da plataforma **Personal Nurse**, um SaaS B2B2C para telenfermagem, construído em React seguindo as melhores práticas de arquitetura moderna.

---

## 1. Análise de Requisitos Funcionais

### 1.1 Funcionalidades Core (Extraídas do Plano de Negócios)

#### Para o Paciente:
1. ✅ **Fluxo de Pré-consulta**
   - Aceite de termos e condições
   - Formulário detalhado de anamnese

2. ✅ **Contrato e Pagamento**
   - Assinatura digital de contrato
   - Gateway de pagamento integrado
   - Compra de pacote (1 consulta inicial 1h30 + 4 atendimentos + 30 dias acompanhamento)

3. ✅ **Agendamento**
   - Visualização de disponibilidade do enfermeiro
   - Marcação de teleconsulta
   - Lembretes automáticos (email/SMS)

4. ✅ **Teleconsulta**
   - Sala de vídeo/áudio HD
   - Chat durante a consulta
   - Compartilhamento de tela (opcional)

5. ✅ **Prontuário do Paciente (Visualização)**
   - Histórico de consultas
   - Documentos e exames
   - Prescrições e orientações

6. ✅ **Chat de Acompanhamento**
   - Mensagens assíncronas com o enfermeiro
   - Envio de fotos (feridas, curativos)
   - Envio de vídeos (exercícios)

7. ✅ **Controle de Sinais Vitais**
   - Formulário de inserção manual
   - Integração futura com wearables (IoT)
   - Histórico gráfico

8. ✅ **Notificações Inteligentes**
   - Lembretes de medicação
   - Alertas para aferir vitais
   - Recomendações do enfermeiro

#### Para o Profissional (Enfermeiro):
1. ✅ **Dashboard de Gestão**
   - Visão geral de pacientes ativos
   - Alertas de risco (IA)
   - Próximas consultas

2. ✅ **Agenda Profissional**
   - Calendário de disponibilidade
   - Gerenciamento de horários
   - Bloqueio de períodos

3. ✅ **Prontuário Eletrônico (PEP)**
   - Visualização de formulário pré-consulta
   - Anotações clínicas
   - **Transcrição automática de consultas (IA)**
   - **Resumo gerado por NLP**
   - Assinatura digital (ICP-Brasil)

4. ✅ **Sala de Teleconsulta**
   - Vídeo/áudio profissional
   - Acesso ao prontuário durante a consulta
   - Ferramentas de anotação

5. ✅ **Chat com Pacientes**
   - Inbox organizado por paciente
   - Notificações de novas mensagens
   - Histórico completo

6. ✅ **Telemonitoramento**
   - Dashboard de sinais vitais por paciente
   - Gráficos de evolução
   - **Alertas automáticos de desvio (IA)**

7. ✅ **Gestão de Pacientes**
   - Lista de pacientes
   - Filtros e busca
   - Status de acompanhamento (ativo, finalizado, renovação)

8. ✅ **Configurações e Perfil**
   - Dados profissionais (COREN)
   - Integração com certificado digital
   - Preferências de notificação

#### Para Admin/Clínica (Plano Multi):
1. ✅ **Gestão de Equipe**
   - Adicionar/remover enfermeiros
   - Controle de acessos

2. ✅ **Dashboard Populacional**
   - Visão de risco agregada
   - Métricas de atendimento

3. ✅ **Relatórios e Analytics**
   - Relatórios de faturamento
   - Indicadores de qualidade

---

## 2. Arquitetura Frontend

### 2.1 Stack Tecnológica Recomendada

```
┌─────────────────────────────────────────────────┐
│              PERSONAL NURSE FRONTEND            │
├─────────────────────────────────────────────────┤
│ Framework:          React 18+ (Vite)            │
│ Linguagem:          TypeScript                  │
│ Roteamento:         React Router v6             │
│ Estado Global:      Zustand / Context API       │
│ UI Library:         TailwindCSS + Headless UI   │
│ Formulários:        React Hook Form + Zod       │
│ API Client:         Axios + React Query         │
│ WebRTC:             Daily.co / Agora.io         │
│ Chat Real-time:     Socket.io-client            │
│ Assinatura Digital: Integração API ICP-Brasil   │
│ Notificações:       React Toastify              │
│ Gráficos:           Recharts / Chart.js         │
│ Upload Files:       React Dropzone              │
│ Calendário:         React Big Calendar          │
│ Analytics:          Google Analytics / Mixpanel │
│ Monitoramento:      Sentry                      │
└─────────────────────────────────────────────────┘
```

### 2.2 Estrutura de Pastas

```
personal-nurse/
├── public/
│   ├── favicon.ico
│   └── assets/
│       ├── images/
│       └── icons/
├── src/
│   ├── app/                          # Configuração principal
│   │   ├── App.tsx
│   │   ├── routes.tsx                # Definição de rotas
│   │   └── providers.tsx             # Providers globais
│   │
│   ├── assets/                       # Recursos estáticos
│   │   ├── images/
│   │   ├── icons/
│   │   └── styles/
│   │       └── globals.css
│   │
│   ├── components/                   # Componentes reutilizáveis
│   │   ├── common/                   # Componentes genéricos
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   ├── Spinner/
│   │   │   ├── Toast/
│   │   │   └── Card/
│   │   │
│   │   ├── layout/                   # Layouts da aplicação
│   │   │   ├── Header/
│   │   │   ├── Sidebar/
│   │   │   ├── Footer/
│   │   │   ├── DashboardLayout/
│   │   │   └── LandingLayout/
│   │   │
│   │   └── features/                 # Componentes por feature
│   │       ├── auth/
│   │       ├── teleconsulta/
│   │       ├── prontuario/
│   │       ├── chat/
│   │       ├── agenda/
│   │       └── vitais/
│   │
│   ├── features/                     # Módulos de funcionalidade
│   │   ├── auth/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── types/
│   │   │   └── utils/
│   │   │
│   │   ├── patient/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── types/
│   │   │   └── pages/
│   │   │       ├── Dashboard.tsx
│   │   │       ├── Profile.tsx
│   │   │       ├── Vitals.tsx
│   │   │       └── Chat.tsx
│   │   │
│   │   ├── nurse/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── types/
│   │   │   └── pages/
│   │   │       ├── Dashboard.tsx
│   │   │       ├── PatientList.tsx
│   │   │       ├── Prontuario.tsx
│   │   │       ├── Agenda.tsx
│   │   │       └── Monitoring.tsx
│   │   │
│   │   ├── teleconsulta/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   │   ├── VideoRoom/
│   │   │   │   ├── ControlBar/
│   │   │   │   ├── ChatPanel/
│   │   │   │   └── TranscriptionPanel/
│   │   │   ├── hooks/
│   │   │   │   ├── useWebRTC.ts
│   │   │   │   ├── useRecording.ts
│   │   │   │   └── useTranscription.ts
│   │   │   └── pages/
│   │   │       └── Room.tsx
│   │   │
│   │   ├── chat/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   │   ├── ChatList/
│   │   │   │   ├── ChatWindow/
│   │   │   │   ├── MessageInput/
│   │   │   │   └── FileUpload/
│   │   │   ├── hooks/
│   │   │   │   └── useSocket.ts
│   │   │   └── types/
│   │   │
│   │   ├── prontuario/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   │   ├── ProntuarioViewer/
│   │   │   │   ├── AnamneseForm/
│   │   │   │   ├── ClinicalNotes/
│   │   │   │   ├── DocumentList/
│   │   │   │   └── DigitalSignature/
│   │   │   ├── hooks/
│   │   │   └── types/
│   │   │
│   │   ├── agenda/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   │   ├── Calendar/
│   │   │   │   ├── AvailabilityManager/
│   │   │   │   └── AppointmentModal/
│   │   │   ├── hooks/
│   │   │   └── types/
│   │   │
│   │   ├── vitals/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   │   ├── VitalsForm/
│   │   │   │   ├── VitalsChart/
│   │   │   │   ├── VitalsDashboard/
│   │   │   │   └── WearableSync/
│   │   │   ├── hooks/
│   │   │   └── types/
│   │   │
│   │   ├── notifications/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── types/
│   │   │
│   │   ├── payment/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   │   ├── CheckoutForm/
│   │   │   │   ├── PaymentMethod/
│   │   │   │   └── Invoice/
│   │   │   ├── hooks/
│   │   │   └── types/
│   │   │
│   │   └── admin/
│   │       ├── api/
│   │       ├── components/
│   │       ├── hooks/
│   │       └── pages/
│   │           ├── TeamManagement.tsx
│   │           ├── Analytics.tsx
│   │           └── Settings.tsx
│   │
│   ├── hooks/                        # Hooks globais customizados
│   │   ├── useAuth.ts
│   │   ├── useApi.ts
│   │   ├── useNotifications.ts
│   │   └── usePermissions.ts
│   │
│   ├── lib/                          # Bibliotecas e configurações
│   │   ├── api/
│   │   │   ├── client.ts             # Axios instance
│   │   │   ├── endpoints.ts
│   │   │   └── interceptors.ts
│   │   ├── socket/
│   │   │   └── socketClient.ts
│   │   ├── webrtc/
│   │   │   └── videoClient.ts
│   │   └── utils/
│   │       ├── validators.ts
│   │       ├── formatters.ts
│   │       └── constants.ts
│   │
│   ├── store/                        # Estado global (Zustand)
│   │   ├── authStore.ts
│   │   ├── patientStore.ts
│   │   ├── nurseStore.ts
│   │   ├── chatStore.ts
│   │   └── notificationStore.ts
│   │
│   ├── types/                        # TypeScript types globais
│   │   ├── api.types.ts
│   │   ├── user.types.ts
│   │   ├── patient.types.ts
│   │   ├── nurse.types.ts
│   │   └── common.types.ts
│   │
│   ├── utils/                        # Utilitários globais
│   │   ├── date.ts
│   │   ├── validation.ts
│   │   ├── storage.ts
│   │   └── permissions.ts
│   │
│   └── main.tsx                      # Entry point
│
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

---

## 3. Mapeamento de Páginas e Rotas

### 3.1 Árvore de Rotas

```typescript
// src/app/routes.tsx

const routes = {
  // ============ PÚBLICAS ============
  public: {
    landing: '/',                                    // LandingPage (Marketing)
    pricing: '/planos',                              // PricingPage
    about: '/sobre',                                 // Sobre a plataforma
    contact: '/contato',                             // Contato
    legal: {
      terms: '/termos',                              // Termos de Uso
      privacy: '/privacidade',                       // Política de Privacidade
      lgpd: '/lgpd',                                 // LGPD
    }
  },

  // ============ AUTENTICAÇÃO ============
  auth: {
    login: '/login',                                 // Login Paciente/Enfermeiro
    register: {
      patient: '/cadastro/paciente',                 // Cadastro Paciente
      nurse: '/cadastro/enfermeiro',                 // Cadastro Enfermeiro
      clinic: '/cadastro/clinica',                   // Cadastro Clínica
    },
    forgotPassword: '/recuperar-senha',
    resetPassword: '/redefinir-senha/:token',
  },

  // ============ PACIENTE ============
  patient: {
    root: '/paciente',
    dashboard: '/paciente/dashboard',                // Dashboard do Paciente

    onboarding: {
      terms: '/paciente/onboarding/termos',          // Aceite de Termos
      anamnese: '/paciente/onboarding/anamnese',     // Formulário Pré-consulta
      contract: '/paciente/onboarding/contrato',     // Assinatura de Contrato
      payment: '/paciente/onboarding/pagamento',     // Checkout
      success: '/paciente/onboarding/sucesso',       // Confirmação
    },

    agenda: '/paciente/agendar',                     // Agendamento de Consulta

    teleconsulta: {
      lobby: '/paciente/teleconsulta/:id/lobby',     // Sala de Espera
      room: '/paciente/teleconsulta/:id',            // Sala de Teleconsulta
    },

    prontuario: '/paciente/prontuario',              // Visualização do Prontuário

    chat: '/paciente/chat',                          // Chat com Enfermeiro

    vitals: {
      list: '/paciente/sinais-vitais',               // Histórico de Vitais
      add: '/paciente/sinais-vitais/novo',           // Adicionar Vitais
    },

    profile: '/paciente/perfil',                     // Perfil e Configurações
    notifications: '/paciente/notificacoes',         // Central de Notificações
  },

  // ============ ENFERMEIRO ============
  nurse: {
    root: '/enfermeiro',
    dashboard: '/enfermeiro/dashboard',              // Dashboard Profissional

    patients: {
      list: '/enfermeiro/pacientes',                 // Lista de Pacientes
      detail: '/enfermeiro/pacientes/:id',           // Detalhes do Paciente
      prontuario: '/enfermeiro/pacientes/:id/prontuario', // Prontuário
    },

    agenda: {
      calendar: '/enfermeiro/agenda',                // Calendário
      availability: '/enfermeiro/agenda/disponibilidade', // Gerenciar Disponibilidade
    },

    teleconsulta: {
      lobby: '/enfermeiro/teleconsulta/:id/lobby',   // Pré-consulta
      room: '/enfermeiro/teleconsulta/:id',          // Sala de Teleconsulta
    },

    chat: '/enfermeiro/chat',                        // Inbox de Mensagens

    monitoring: '/enfermeiro/monitoramento',         // Dashboard de Sinais Vitais

    profile: '/enfermeiro/perfil',                   // Perfil Profissional
    settings: '/enfermeiro/configuracoes',           // Configurações (COREN, Cert. Digital)
  },

  // ============ ADMIN/CLÍNICA ============
  admin: {
    root: '/admin',
    dashboard: '/admin/dashboard',                   // Dashboard Clínica

    team: {
      list: '/admin/equipe',                         // Gestão de Enfermeiros
      add: '/admin/equipe/adicionar',
      edit: '/admin/equipe/:id/editar',
    },

    analytics: '/admin/analytics',                   // Relatórios e Métricas

    billing: '/admin/faturamento',                   // Gestão de Pagamentos

    settings: '/admin/configuracoes',                // Configurações da Clínica
  },

  // ============ ERRO ============
  error: {
    notFound: '/404',
    unauthorized: '/401',
    serverError: '/500',
  },
};
```

### 3.2 Estrutura de Proteção de Rotas

```typescript
// src/app/routes.tsx

<Route element={<PublicLayout />}>
  <Route path="/" element={<LandingPage />} />
  <Route path="/planos" element={<PricingPage />} />
  {/* ... outras rotas públicas */}
</Route>

<Route element={<AuthLayout />}>
  <Route path="/login" element={<LoginPage />} />
  <Route path="/cadastro/paciente" element={<PatientRegister />} />
  {/* ... outras rotas de auth */}
</Route>

<Route element={<ProtectedRoute allowedRoles={['patient']} />}>
  <Route element={<PatientDashboardLayout />}>
    <Route path="/paciente/dashboard" element={<PatientDashboard />} />
    {/* ... rotas do paciente */}
  </Route>
</Route>

<Route element={<ProtectedRoute allowedRoles={['nurse']} />}>
  <Route element={<NurseDashboardLayout />}>
    <Route path="/enfermeiro/dashboard" element={<NurseDashboard />} />
    {/* ... rotas do enfermeiro */}
  </Route>
</Route>

<Route element={<ProtectedRoute allowedRoles={['admin']} />}>
  <Route element={<AdminLayout />}>
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    {/* ... rotas do admin */}
  </Route>
</Route>
```

---

## 4. Componentes Principais

### 4.1 Componentes Comuns (Common)

| Componente | Descrição | Props Principais |
|------------|-----------|------------------|
| `Button` | Botão reutilizável com variantes | `variant`, `size`, `loading`, `disabled` |
| `Input` | Campo de entrada com validação | `type`, `error`, `label`, `placeholder` |
| `Select` | Dropdown customizado | `options`, `value`, `onChange` |
| `Modal` | Modal genérico | `isOpen`, `onClose`, `title`, `children` |
| `Card` | Container de conteúdo | `title`, `footer`, `children` |
| `Badge` | Indicador de status | `variant`, `text` |
| `Spinner` | Loading indicator | `size`, `color` |
| `Toast` | Notificação temporária | `type`, `message`, `duration` |
| `Avatar` | Foto de perfil | `src`, `name`, `size` |
| `Tooltip` | Dica contextual | `content`, `position` |
| `Table` | Tabela de dados | `columns`, `data`, `onRowClick` |
| `Pagination` | Paginação | `currentPage`, `totalPages`, `onPageChange` |

### 4.2 Componentes de Layout

| Componente | Descrição | Uso |
|------------|-----------|-----|
| `Header` | Cabeçalho global | Landing, Dashboard |
| `Sidebar` | Menu lateral | Dashboard Enfermeiro/Admin |
| `Footer` | Rodapé | Landing |
| `DashboardLayout` | Layout com sidebar | Áreas autenticadas |
| `LandingLayout` | Layout marketing | Páginas públicas |
| `AuthLayout` | Layout de autenticação | Login, Registro |

### 4.3 Componentes de Features

#### Teleconsulta
- `VideoRoom` - Container principal da sala
- `VideoTile` - Tile de vídeo individual
- `ControlBar` - Controles (mute, camera, screen share, end call)
- `ChatPanel` - Chat lateral durante consulta
- `TranscriptionPanel` - Transcrição em tempo real (IA)
- `WaitingRoom` - Sala de espera

#### Prontuário
- `ProntuarioViewer` - Visualizador completo
- `AnamneseForm` - Formulário de anamnese estruturado
- `ClinicalNotes` - Editor de anotações clínicas
- `DocumentUploader` - Upload de exames/documentos
- `DocumentViewer` - Visualizador de PDFs/imagens
- `DigitalSignature` - Componente de assinatura ICP-Brasil
- `ProntuarioTimeline` - Timeline de eventos clínicos

#### Chat
- `ChatList` - Lista de conversas
- `ChatWindow` - Janela de mensagens
- `MessageBubble` - Balão de mensagem
- `MessageInput` - Input com suporte a mídia
- `FilePreview` - Preview de arquivos enviados
- `TypingIndicator` - Indicador de "digitando..."

#### Agenda
- `Calendar` - Calendário mensal
- `WeekView` - Visualização semanal
- `DayView` - Visualização diária
- `AppointmentCard` - Card de compromisso
- `AvailabilityEditor` - Editor de disponibilidade
- `AppointmentModal` - Modal de agendamento/edição

#### Sinais Vitais
- `VitalsForm` - Formulário de inserção
- `VitalsChart` - Gráfico de evolução
- `VitalsDashboard` - Dashboard consolidado
- `VitalsAlert` - Alerta de desvio
- `WearableSync` - Sincronização com dispositivos IoT

#### Pagamento
- `CheckoutForm` - Formulário de checkout
- `PaymentMethodSelector` - Seleção de método
- `CardInput` - Input de cartão (integração Stripe/PagSeguro)
- `Invoice` - Recibo/Nota Fiscal
- `PackageSelector` - Seleção de pacote

---

## 5. Gestão de Estado

### 5.1 Estratégia: Zustand + React Query

**Zustand** para estado global da aplicação (auth, user data, UI state)
**React Query** para estado do servidor (cache de APIs, sincronização)

### 5.2 Stores (Zustand)

#### Auth Store
```typescript
// src/store/authStore.ts

interface AuthState {
  user: User | null;
  token: string | null;
  role: 'patient' | 'nurse' | 'admin' | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}
```

#### Chat Store
```typescript
// src/store/chatStore.ts

interface ChatState {
  conversations: Conversation[];
  activeConversation: string | null;
  unreadCount: number;
  isTyping: Record<string, boolean>;
  setActiveConversation: (id: string) => void;
  addMessage: (message: Message) => void;
  markAsRead: (conversationId: string) => void;
}
```

#### Notification Store
```typescript
// src/store/notificationStore.ts

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
}
```

### 5.3 React Query Hooks

```typescript
// src/features/patient/api/usePatients.ts

export const usePatients = () => {
  return useQuery({
    queryKey: ['patients'],
    queryFn: fetchPatients,
    staleTime: 5 * 60 * 1000, // 5 min
  });
};

export const usePatient = (id: string) => {
  return useQuery({
    queryKey: ['patient', id],
    queryFn: () => fetchPatient(id),
    enabled: !!id,
  });
};

export const useUpdatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });
};
```

---

## 6. Integrações Críticas

### 6.1 APIs Backend

```typescript
// src/lib/api/endpoints.ts

export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refreshToken: '/auth/refresh',
  },

  patients: {
    list: '/patients',
    detail: (id: string) => `/patients/${id}`,
    create: '/patients',
    update: (id: string) => `/patients/${id}`,
    delete: (id: string) => `/patients/${id}`,
  },

  prontuario: {
    get: (patientId: string) => `/prontuario/${patientId}`,
    addNote: (patientId: string) => `/prontuario/${patientId}/notes`,
    uploadDocument: (patientId: string) => `/prontuario/${patientId}/documents`,
    sign: (patientId: string) => `/prontuario/${patientId}/sign`,
  },

  teleconsulta: {
    createRoom: '/teleconsulta/room',
    getToken: (roomId: string) => `/teleconsulta/room/${roomId}/token`,
    endCall: (roomId: string) => `/teleconsulta/room/${roomId}/end`,
    transcription: (roomId: string) => `/teleconsulta/room/${roomId}/transcription`,
  },

  vitals: {
    list: (patientId: string) => `/vitals/${patientId}`,
    create: (patientId: string) => `/vitals/${patientId}`,
    sync: (patientId: string) => `/vitals/${patientId}/sync`, // IoT
  },

  chat: {
    conversations: '/chat/conversations',
    messages: (conversationId: string) => `/chat/${conversationId}/messages`,
    send: (conversationId: string) => `/chat/${conversationId}/send`,
  },

  agenda: {
    availability: '/agenda/availability',
    appointments: '/agenda/appointments',
    book: '/agenda/book',
    cancel: (id: string) => `/agenda/appointments/${id}/cancel`,
  },

  payment: {
    createCheckout: '/payment/checkout',
    confirm: '/payment/confirm',
    invoice: (id: string) => `/payment/invoice/${id}`,
  },

  ai: {
    transcribe: '/ai/transcribe',
    summarize: '/ai/summarize',
    analyzeVitals: '/ai/analyze-vitals',
  },
};
```

### 6.2 WebRTC (Teleconsulta)

**Opções de Provedor:**
- Daily.co (Recomendado - fácil integração)
- Agora.io
- Twilio Video
- Desenvolvimento próprio com WebRTC nativo

**Exemplo de Hook:**
```typescript
// src/features/teleconsulta/hooks/useWebRTC.ts

export const useWebRTC = (roomId: string) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  const joinRoom = async () => { /* ... */ };
  const leaveRoom = () => { /* ... */ };
  const toggleAudio = () => { /* ... */ };
  const toggleVideo = () => { /* ... */ };
  const startScreenShare = () => { /* ... */ };

  return {
    localStream,
    remoteStream,
    isAudioEnabled,
    isVideoEnabled,
    joinRoom,
    leaveRoom,
    toggleAudio,
    toggleVideo,
    startScreenShare,
  };
};
```

### 6.3 Socket.io (Chat Real-time)

```typescript
// src/lib/socket/socketClient.ts

import { io, Socket } from 'socket.io-client';

class SocketClient {
  private socket: Socket | null = null;

  connect(token: string) {
    this.socket = io(import.meta.env.VITE_WS_URL, {
      auth: { token },
    });

    this.socket.on('message', (data) => {
      // Handle new message
    });

    this.socket.on('typing', (data) => {
      // Handle typing indicator
    });
  }

  disconnect() {
    this.socket?.disconnect();
  }

  sendMessage(conversationId: string, content: string) {
    this.socket?.emit('send-message', { conversationId, content });
  }

  startTyping(conversationId: string) {
    this.socket?.emit('typing-start', { conversationId });
  }

  stopTyping(conversationId: string) {
    this.socket?.emit('typing-stop', { conversationId });
  }
}

export default new SocketClient();
```

### 6.4 Gateway de Pagamento

**Opções:**
- Stripe (Internacional)
- Mercado Pago
- PagSeguro
- Asaas (para SaaS)

**Fluxo:**
1. Frontend cria checkout session
2. Redireciona para página de pagamento
3. Webhook confirma pagamento no backend
4. Frontend recebe confirmação e libera acesso

### 6.5 Assinatura Digital (ICP-Brasil)

**Provedor:** BirdID, Soluti, Valid

**Fluxo:**
1. Enfermeiro cadastra certificado digital
2. Ao assinar prontuário, frontend solicita PIN
3. API do provedor realiza assinatura
4. Documento assinado é armazenado

---

## 7. Design System e UI/UX

### 7.1 Paleta de Cores (Baseada no SentiaCare)

```css
/* tailwind.config.js */

colors: {
  primary: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',  // Teal principal
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  secondary: {
    400: '#38bdf8',  // Sky
    500: '#0ea5e9',
    600: '#0284c7',
  },
  success: '#10b981',  // Green
  warning: '#f59e0b',  // Amber
  error: '#ef4444',    // Red
  info: '#3b82f6',     // Blue
}
```

### 7.2 Componentes de Design

Usar **Headless UI** ou **Radix UI** para componentes acessíveis (WCAG 2.1):
- Dialog/Modal
- Dropdown Menu
- Tabs
- Accordion
- Popover

Combinar com **TailwindCSS** para estilização rápida.

### 7.3 Responsividade

Breakpoints:
- `sm`: 640px (mobile)
- `md`: 768px (tablet)
- `lg`: 1024px (desktop)
- `xl`: 1280px (large desktop)

**Mobile-first approach** - Todo layout deve funcionar perfeitamente em mobile.

---

## 8. Fluxos de Usuário Críticos

### 8.1 Fluxo de Onboarding do Paciente

```
┌─────────────────────────────────────────────────────────┐
│               JORNADA DO PACIENTE (PRIMEIRA VEZ)        │
└─────────────────────────────────────────────────────────┘

1. Landing Page
   └─> Botão "Começar Agora"
       └─> Cadastro (Email, Senha, Dados Básicos)

2. Aceite de Termos (/paciente/onboarding/termos)
   └─> Checkbox LGPD
   └─> Checkbox Termos de Uso
   └─> Checkbox Contrato de Telenfermagem
   └─> Botão "Aceitar e Continuar"

3. Formulário de Anamnese (/paciente/onboarding/anamnese)
   └─> Dados Pessoais (Nome completo, CPF, RG, Data Nasc.)
   └─> Contato (Telefone, Email, Endereço)
   └─> Histórico Médico (Alergias, Medicamentos, Cirurgias)
   └─> Queixa Principal (Por que busca acompanhamento?)
   └─> Botão "Salvar e Continuar"

4. Assinatura de Contrato (/paciente/onboarding/contrato)
   └─> Visualização do Contrato Digital
   └─> Campo de Assinatura (Nome completo ou digital)
   └─> Botão "Assinar e Continuar"

5. Pagamento (/paciente/onboarding/pagamento)
   └─> Seleção de Pacote (Exibir: 1 consulta 1h30 + 4 atendimentos + 30 dias)
   └─> Método de Pagamento (Cartão, PIX, Boleto)
   └─> Formulário de Pagamento
   └─> Botão "Finalizar Pagamento"

6. Confirmação (/paciente/onboarding/sucesso)
   └─> Mensagem de Sucesso
   └─> Instruções para Agendar Primeira Consulta
   └─> Botão "Ir para Dashboard"

7. Dashboard do Paciente (/paciente/dashboard)
   └─> CTA: "Agendar Primeira Consulta"
```

### 8.2 Fluxo de Teleconsulta (Enfermeiro)

```
┌─────────────────────────────────────────────────────────┐
│               JORNADA DA TELECONSULTA (ENFERMEIRO)      │
└─────────────────────────────────────────────────────────┘

1. Dashboard (/enfermeiro/dashboard)
   └─> Card "Próxima Consulta" com botão "Iniciar"

2. Pré-Consulta (/enfermeiro/teleconsulta/:id/lobby)
   └─> Visualização do Prontuário/Anamnese do Paciente
   └─> Checklist pré-atendimento
   └─> Teste de áudio/vídeo
   └─> Botão "Entrar na Sala"

3. Sala de Teleconsulta (/enfermeiro/teleconsulta/:id)
   ├─> Video Tile (Enfermeiro + Paciente)
   ├─> Barra de Controles (Mute, Câmera, Compartilhar Tela, Encerrar)
   ├─> Painel Lateral (Tabs):
   │   ├─> Chat
   │   ├─> Prontuário (Somente leitura durante call)
   │   └─> Transcrição em Tempo Real (IA)
   └─> Botão "Encerrar Consulta"

4. Pós-Consulta (Modal)
   └─> Resumo Automático Gerado por IA
   └─> Editor de Anotações Clínicas (pode editar o resumo)
   └─> Prescrições/Orientações
   └─> Assinatura Digital
   └─> Botão "Salvar e Finalizar"

5. Dashboard (/enfermeiro/dashboard)
   └─> Consulta marcada como "Concluída"
   └─> Prontuário atualizado
```

### 8.3 Fluxo de Monitoramento de Vitais com IoT

```
┌─────────────────────────────────────────────────────────┐
│          MONITORAMENTO CONTÍNUO (PACIENTE + IA)         │
└─────────────────────────────────────────────────────────┘

1. Paciente sincroniza Wearable
   └─> (/paciente/sinais-vitais)
   └─> Botão "Conectar Dispositivo"
   └─> Seleção (Apple Watch, Fitbit, etc.)
   └─> Autorização OAuth

2. Coleta Automática de Dados
   └─> Backend recebe dados via API do dispositivo
   └─> Armazena no prontuário

3. Análise de IA
   └─> Sistema detecta desvio (ex: PA > 140/90)
   └─> Cria alerta no sistema

4. Notificação ao Enfermeiro
   └─> Dashboard (/enfermeiro/monitoramento)
   └─> Card de Alerta Vermelho: "Paciente João - PA Crítica"
   └─> Enfermeiro clica e visualiza histórico

5. Ação Proativa
   └─> Enfermeiro envia mensagem via Chat
   └─> Ou agenda consulta emergencial
```

---

## 9. Segurança e Conformidade

### 9.1 Checklist de Segurança Frontend

- ✅ **Autenticação:** JWT armazenado em httpOnly cookie (não em localStorage)
- ✅ **HTTPS:** Obrigatório em produção
- ✅ **CSP (Content Security Policy):** Configurar headers
- ✅ **XSS Protection:** Sanitização de inputs (DOMPurify)
- ✅ **CSRF Protection:** Tokens CSRF em formulários
- ✅ **Validação de Inputs:** Zod schema em todos os formulários
- ✅ **Rate Limiting:** Evitar abuso de APIs
- ✅ **Criptografia de Dados Sensíveis:** TLS 1.3
- ✅ **Logs de Auditoria:** Registro de ações críticas (assinatura, pagamentos)

### 9.2 LGPD

- **Consentimento Explícito:** Termo de aceite antes do cadastro
- **Direito ao Esquecimento:** Funcionalidade de exclusão de conta
- **Portabilidade:** Export de dados em JSON
- **Transparência:** Política de Privacidade acessível

### 9.3 Resolução COFEN 696/2022

- **Registro de Consentimento:** Termo assinado digitalmente
- **Assinatura Digital:** ICP-Brasil para documentos clínicos
- **Prontuário Eletrônico:** Armazenamento conforme Lei 13.787/2018
- **Auditoria:** Logs de acesso ao prontuário

---

## 10. Performance e Otimização

### 10.1 Estratégias

1. **Code Splitting:**
   - Lazy loading de rotas
   - Dynamic imports para componentes pesados

2. **Otimização de Imagens:**
   - Formatos modernos (WebP, AVIF)
   - Lazy loading com Intersection Observer

3. **Caching:**
   - React Query para cache de APIs
   - Service Worker para offline-first

4. **Bundle Size:**
   - Tree shaking
   - Análise com `vite-plugin-bundle-analyzer`

5. **Rendering:**
   - Virtualização de listas longas (react-window)
   - Memoization com `React.memo` e `useMemo`

### 10.2 Métricas Alvo (Core Web Vitals)

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

---

## 11. Testing Strategy

### 11.1 Pirâmide de Testes

```
         /\
        /  \  E2E (Cypress/Playwright)
       /____\
      /      \  Integration (React Testing Library)
     /________\
    /          \  Unit (Vitest)
   /____________\
```

### 11.2 Ferramentas

- **Unit/Integration:** Vitest + React Testing Library
- **E2E:** Playwright
- **Visual Regression:** Chromatic (Storybook)
- **Coverage:** > 80%

### 11.3 Casos de Teste Críticos

1. Fluxo de onboarding completo
2. Agendamento de consulta
3. Entrada na sala de teleconsulta
4. Envio de mensagem no chat
5. Inserção de sinais vitais
6. Assinatura de prontuário

---

## 12. Roadmap de Implementação

### 12.1 Fase 1: MVP (8-12 semanas)

**Objetivo:** Lançar versão funcional com features core

**Semanas 1-2: Setup e Infraestrutura**
- ✅ Configuração do projeto (Vite + React + TypeScript)
- ✅ Setup de TailwindCSS + Headless UI
- ✅ Estrutura de pastas
- ✅ Configuração ESLint/Prettier
- ✅ Setup Zustand + React Query
- ✅ Configuração de rotas (React Router)

**Semanas 3-4: Autenticação e Landing**
- ✅ Landing Page (Marketing)
- ✅ Pricing Page
- ✅ Sistema de Login/Registro
- ✅ Gestão de sessão (JWT)
- ✅ Protected Routes

**Semanas 5-6: Onboarding do Paciente**
- ✅ Fluxo de Aceite de Termos
- ✅ Formulário de Anamnese
- ✅ Assinatura de Contrato
- ✅ Integração com Gateway de Pagamento
- ✅ Dashboard do Paciente (básico)

**Semanas 7-8: Agendamento**
- ✅ Calendário de Disponibilidade
- ✅ Sistema de Agendamento
- ✅ Notificações de Confirmação

**Semanas 9-10: Teleconsulta (MVP)**
- ✅ Integração com Daily.co (ou similar)
- ✅ Sala de vídeo básica
- ✅ Controles de áudio/vídeo
- ✅ Chat durante consulta

**Semanas 11-12: Prontuário e Chat**
- ✅ Prontuário Eletrônico (visualização)
- ✅ Anotações clínicas
- ✅ Chat assíncrono (Socket.io)
- ✅ Dashboard do Enfermeiro (básico)

**Entrega:** Plataforma funcional para piloto com enfermeiros early adopters

---

### 12.2 Fase 2: Inovação com IA (6-8 semanas)

**Objetivo:** Implementar diferenciais competitivos

**Semanas 13-14: Transcrição de Consultas**
- ✅ Integração com API de Speech-to-Text
- ✅ Transcrição em tempo real
- ✅ Painel de transcrição na sala de consulta

**Semanas 15-16: Resumo Automático com NLP**
- ✅ Integração com API de NLP (GPT-4 ou similar)
- ✅ Geração de resumo clínico
- ✅ Inserção automática no prontuário

**Semanas 17-18: Monitoramento de Vitais**
- ✅ Dashboard de Sinais Vitais
- ✅ Gráficos de evolução
- ✅ Sistema de alertas básico

**Semanas 19-20: Alertas Inteligentes de Risco**
- ✅ Análise de IA para detecção de desvios
- ✅ Notificações proativas ao enfermeiro
- ✅ Dashboard de Risco

**Entrega:** Plataforma com IA funcional e competitiva

---

### 12.3 Fase 3: Integração IoT e Escala (6-8 semanas)

**Objetivo:** Telemonitoramento avançado e escalabilidade

**Semanas 21-22: Integração com Wearables**
- ✅ Autenticação OAuth com Apple Health, Google Fit, Fitbit
- ✅ Sincronização automática de dados
- ✅ Armazenamento no prontuário

**Semanas 23-24: Dashboard Populacional (Admin)**
- ✅ Visão de risco agregada
- ✅ Métricas de atendimento
- ✅ Relatórios gerenciais

**Semanas 25-26: Assinatura Digital ICP-Brasil**
- ✅ Integração com provedor (BirdID/Soluti)
- ✅ Fluxo de assinatura de documentos
- ✅ Validação de certificados

**Semanas 27-28: Otimização e Escalabilidade**
- ✅ Performance tuning
- ✅ Testes de carga
- ✅ Monitoramento (Sentry)
- ✅ Analytics (Mixpanel)

**Entrega:** Plataforma enterprise-ready com IoT

---

### 12.4 Fase 4: Refinamento e Lançamento (4 semanas)

**Semanas 29-30: Testes e QA**
- ✅ Testes E2E completos
- ✅ Testes de acessibilidade (WCAG)
- ✅ Testes de segurança (OWASP)
- ✅ Testes de compliance (LGPD, COFEN)

**Semanas 31-32: Lançamento**
- ✅ Deploy em produção
- ✅ Documentação para usuários
- ✅ Onboarding de primeiros clientes
- ✅ Suporte e monitoramento ativo

**Entrega:** Personal Nurse em produção

---

## 13. Considerações Finais

### 13.1 Diferenciais Técnicos

1. **Especialização:** Frontend otimizado para telenfermagem (não genérico)
2. **IA Integrada:** Transcrição, resumo e alertas inteligentes
3. **IoT Ready:** Preparado para wearables desde o início
4. **Compliance:** LGPD + COFEN desde o design
5. **UX Excepcional:** Fluxos intuitivos para pacientes e profissionais

### 13.2 Riscos e Mitigações

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Complexidade da integração WebRTC | Alto | Usar provedor terceiro (Daily.co) |
| Latência na transcrição de IA | Médio | Cache local + feedback visual |
| Custo de APIs de IA | Médio | Otimizar uso, considerar modelos locais |
| Conformidade legal | Alto | Consultoria jurídica especializada |
| Segurança de dados | Alto | Auditoria de segurança externa |

### 13.3 Métricas de Sucesso

**Técnicas:**
- Tempo de carregamento inicial < 3s
- Uptime > 99.5%
- Zero vulnerabilidades críticas

**Negócio:**
- Taxa de conversão no onboarding > 60%
- NPS > 50
- Churn rate < 5% mensal
- Tempo médio de setup do enfermeiro < 15min

---

## 14. Próximos Passos

### Para Iniciar o Desenvolvimento:

1. ✅ **Revisar e aprovar este plano** com o time de produto e negócio
2. ✅ **Definir prioridades** com base no feedback de early adopters
3. ✅ **Montar equipe:**
   - 2 Frontend Developers (React/TypeScript)
   - 1 UI/UX Designer
   - 1 QA Engineer
4. ✅ **Setup de ambiente:**
   - Repositório Git
   - CI/CD (GitHub Actions)
   - Ambientes (dev, staging, prod)
5. ✅ **Kickoff da Fase 1 (MVP)**

---

## Apêndices

### A. Stack Detalhada

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "zustand": "^4.4.0",
    "@tanstack/react-query": "^5.0.0",
    "axios": "^1.6.0",
    "socket.io-client": "^4.6.0",
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.0",
    "@headlessui/react": "^1.7.0",
    "tailwindcss": "^3.3.0",
    "recharts": "^2.10.0",
    "react-dropzone": "^14.2.0",
    "react-big-calendar": "^1.8.0",
    "react-toastify": "^9.1.0",
    "date-fns": "^2.30.0",
    "clsx": "^2.0.0",
    "lucide-react": "^0.300.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.1.0",
    "playwright": "^1.40.0",
    "eslint": "^8.55.0",
    "prettier": "^3.1.0",
    "@sentry/react": "^7.90.0"
  }
}
```

### B. Variáveis de Ambiente

```bash
# .env.example

# API
VITE_API_URL=https://api.personalnurse.com.br
VITE_WS_URL=wss://ws.personalnurse.com.br

# WebRTC
VITE_DAILY_API_KEY=your_daily_api_key

# Payment
VITE_STRIPE_PUBLIC_KEY=pk_test_...

# Analytics
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
VITE_SENTRY_DSN=https://...

# Features Flags
VITE_ENABLE_AI_TRANSCRIPTION=true
VITE_ENABLE_IOT_SYNC=false
```

### C. Scripts Úteis

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint . --ext ts,tsx",
    "format": "prettier --write \"src/**/*.{ts,tsx}\"",
    "analyze": "vite-bundle-visualizer"
  }
}
```

---

**Documento elaborado em:** 06/12/2025
**Versão:** 1.0
**Autor:** Equipe de Produto Personal Nurse
**Status:** Pronto para Aprovação
