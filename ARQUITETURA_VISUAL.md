# 🏗️ Arquitetura Visual - Personal Nurse Frontend

Este documento contém diagramas visuais da arquitetura do Personal Nurse para facilitar a compreensão do sistema.

---

## 📊 Diagrama de Arquitetura Geral

```mermaid
graph TB
    subgraph "Frontend - React SPA"
        A[Landing Page] --> B[Login/Registro]
        B --> C{Autenticação}
        C -->|Paciente| D[Dashboard Paciente]
        C -->|Enfermeiro| E[Dashboard Enfermeiro]
        C -->|Admin| F[Dashboard Admin]

        D --> G[Onboarding]
        D --> H[Agendamento]
        D --> I[Teleconsulta]
        D --> J[Chat]
        D --> K[Sinais Vitais]

        E --> L[Lista Pacientes]
        E --> M[Prontuário]
        E --> I
        E --> J
        E --> N[Monitoramento]

        F --> O[Gestão de Equipe]
        F --> P[Analytics]
    end

    subgraph "Backend APIs"
        Q[REST API]
        R[WebSocket Server]
        S[IA/ML Service]
    end

    subgraph "Serviços Externos"
        T[Daily.co - WebRTC]
        U[Stripe - Pagamento]
        V[AWS Transcribe - Speech-to-Text]
        W[GPT-4 - NLP]
        X[Apple Health API]
        Y[ICP-Brasil - Assinatura]
    end

    I --> T
    G --> U
    I --> V
    M --> W
    K --> X
    M --> Y

    D --> Q
    E --> Q
    F --> Q
    J --> R
    N --> S
```

---

## 🔄 Fluxo de Dados (State Management)

```mermaid
graph LR
    subgraph "Estado Global - Zustand"
        A[authStore]
        B[chatStore]
        C[notificationStore]
    end

    subgraph "Estado Servidor - React Query"
        D[patients]
        E[appointments]
        F[vitals]
        G[prontuario]
    end

    subgraph "Componentes React"
        H[Dashboard]
        I[PatientList]
        J[ChatWindow]
        K[VitalsChart]
    end

    A --> H
    B --> J
    D --> I
    F --> K

    H -->|useQuery| D
    I -->|useMutation| D
    J -->|socket.emit| B
    K -->|useQuery| F
```

---

## 🛣️ Mapa de Rotas

```mermaid
graph TD
    A[/ - Landing] --> B[/planos - Pricing]
    A --> C[/login - Login]

    C --> D[/paciente/dashboard]
    C --> E[/enfermeiro/dashboard]
    C --> F[/admin/dashboard]

    D --> G[/paciente/onboarding/termos]
    G --> H[/paciente/onboarding/anamnese]
    H --> I[/paciente/onboarding/contrato]
    I --> J[/paciente/onboarding/pagamento]

    D --> K[/paciente/agendar]
    D --> L[/paciente/chat]
    D --> M[/paciente/sinais-vitais]

    E --> N[/enfermeiro/pacientes]
    E --> O[/enfermeiro/agenda]
    E --> P[/enfermeiro/monitoramento]

    K --> Q[/teleconsulta/:id]
    O --> Q
```

---

## 👥 Fluxo de Onboarding do Paciente

```mermaid
sequenceDiagram
    participant U as Usuário
    participant L as Landing Page
    participant R as Registro
    participant O as Onboarding
    participant P as Payment
    participant D as Dashboard

    U->>L: Visita site
    L->>R: Clica "Começar"
    R->>O: Cria conta

    O->>O: Aceita Termos (LGPD)
    O->>O: Preenche Anamnese
    O->>O: Assina Contrato Digital

    O->>P: Redireciona para pagamento
    P->>P: Seleciona pacote
    P->>P: Preenche dados do cartão

    P-->>O: Pagamento confirmado
    O->>D: Redireciona para Dashboard
    D->>U: Exibe CTA "Agendar Primeira Consulta"
```

---

## 📹 Fluxo de Teleconsulta

```mermaid
sequenceDiagram
    participant P as Paciente
    participant E as Enfermeiro
    participant S as Sistema
    participant D as Daily.co
    participant A as IA (Transcrição)

    E->>S: Define disponibilidade
    P->>S: Agenda consulta

    S->>P: Lembrete 24h antes
    S->>E: Lembrete 24h antes

    rect rgb(200, 220, 240)
        Note over P,E: Hora da Consulta

        P->>S: Clica "Entrar na Sala"
        S->>D: Cria sala WebRTC
        D-->>P: Token de acesso

        E->>S: Acessa prontuário (pré-consulta)
        E->>S: Clica "Iniciar Consulta"
        D-->>E: Token de acesso

        P->>D: Join room
        E->>D: Join room

        D->>A: Inicia transcrição
        A-->>S: Stream de texto

        P->>D: Áudio/Vídeo
        E->>D: Áudio/Vídeo

        E->>S: Acessa prontuário (durante call)
        P->>E: Chat durante consulta
    end

    E->>D: Encerra chamada
    D->>A: Finaliza transcrição
    A->>S: Transcrição completa
    S->>S: IA gera resumo (NLP)

    E->>S: Revisa e edita resumo
    E->>S: Assina digitalmente
    S->>P: Prontuário atualizado
```

---

## 💬 Arquitetura do Chat Real-time

```mermaid
graph TB
    subgraph "Frontend"
        A[ChatWindow Component]
        B[useSocket Hook]
    end

    subgraph "WebSocket Server"
        C[Socket.io Server]
        D[Message Queue]
        E[Room Manager]
    end

    subgraph "Backend"
        F[REST API]
        G[Database]
    end

    A --> B
    B -->|socket.emit| C
    C -->|broadcast| B

    C --> D
    D --> E
    E --> F
    F --> G

    B -->|send-message| C
    C -->|message| B

    B -->|typing-start| C
    C -->|typing| B
```

---

## 📊 Dashboard de Sinais Vitais com IA

```mermaid
graph LR
    subgraph "Entrada de Dados"
        A[Paciente insere manualmente]
        B[Wearable sincroniza IoT]
    end

    subgraph "Backend"
        C[API Vitals]
        D[Database]
        E[IA - Análise de Risco]
    end

    subgraph "Frontend - Enfermeiro"
        F[Dashboard Monitoramento]
        G[Gráficos Recharts]
        H[Alertas de Risco]
    end

    A --> C
    B --> C
    C --> D
    D --> E

    E -->|Desvio detectado| H
    E -->|Dados normalizados| G

    F --> G
    F --> H

    H -->|Notificação push| I[Enfermeiro]
```

---

## 🔐 Fluxo de Assinatura Digital (ICP-Brasil)

```mermaid
sequenceDiagram
    participant E as Enfermeiro
    participant S as Sistema
    participant P as Provedor ICP
    participant D as Database

    E->>S: Finaliza consulta
    S->>S: IA gera resumo
    E->>S: Revisa resumo
    E->>S: Clica "Assinar Digitalmente"

    S->>E: Solicita PIN do certificado
    E->>S: Insere PIN

    S->>P: Envia documento + PIN
    P->>P: Valida certificado
    P->>P: Assina documento
    P-->>S: Documento assinado (.pdf)

    S->>D: Armazena documento assinado
    S-->>E: Confirmação de assinatura

    E->>S: Prontuário assinado disponível
```

---

## 🏗️ Estrutura de Componentes (Hierarquia)

```mermaid
graph TD
    A[App.tsx] --> B[AppProviders]
    B --> C[RouterProvider]

    C --> D[LandingLayout]
    C --> E[AuthLayout]
    C --> F[DashboardLayout]

    D --> G[Header]
    D --> H[Footer]
    D --> I[LandingPage]

    E --> J[LoginPage]
    E --> K[RegisterPage]

    F --> L[Sidebar]
    F --> M[Header Auth]
    F --> N[Main Content]

    N --> O[PatientDashboard]
    N --> P[NurseDashboard]
    N --> Q[AdminDashboard]

    O --> R[AppointmentCard]
    O --> S[VitalsChart]
    O --> T[ChatPreview]

    P --> U[PatientList]
    P --> V[MonitoringDashboard]
    P --> W[RiskAlerts]
```

---

## 🔄 Ciclo de Vida de uma Requisição API

```mermaid
sequenceDiagram
    participant C as Component
    participant RQ as React Query
    participant A as Axios
    participant I as Interceptor
    participant API as Backend API

    C->>RQ: useQuery('patients')

    alt Cache Hit
        RQ-->>C: Retorna dados do cache
    else Cache Miss
        RQ->>A: fetchPatients()
        A->>I: Request Interceptor
        I->>I: Adiciona token JWT
        I->>API: GET /api/patients

        alt Success
            API-->>I: 200 OK + data
            I->>RQ: data
            RQ->>RQ: Atualiza cache
            RQ-->>C: data
        else Token Expirado
            API-->>I: 401 Unauthorized
            I->>API: POST /api/auth/refresh
            API-->>I: novo token
            I->>I: Atualiza token
            I->>API: Retry GET /api/patients
            API-->>I: 200 OK + data
            I->>RQ: data
            RQ-->>C: data
        else Erro
            API-->>I: 500 Error
            I->>RQ: error
            RQ-->>C: error
            C->>C: Exibe mensagem de erro
        end
    end
```

---

## 📱 Arquitetura Responsiva (Breakpoints)

```mermaid
graph LR
    A[Mobile < 640px] -->|sm| B[Tablet 640-1024px]
    B -->|md| C[Desktop 1024-1280px]
    C -->|lg| D[Large Desktop > 1280px]

    A --> E[Stack Vertical]
    A --> F[Menu Hamburguer]
    A --> G[Cards 100% width]

    B --> H[Grid 2 colunas]
    B --> I[Sidebar colapsável]

    C --> J[Grid 3 colunas]
    C --> K[Sidebar fixa]

    D --> L[Grid 4 colunas]
    D --> M[Mais informações visíveis]
```

---

## 🎨 Design System (Hierarquia de Componentes)

```mermaid
graph TD
    A[Design System] --> B[Tokens]
    A --> C[Componentes Base]
    A --> D[Componentes Compostos]
    A --> E[Layouts]

    B --> F[Cores]
    B --> G[Tipografia]
    B --> H[Espaçamentos]
    B --> I[Breakpoints]

    C --> J[Button]
    C --> K[Input]
    C --> L[Card]
    C --> M[Badge]

    D --> N[Form]
    D --> O[Modal]
    D --> P[Table]

    E --> Q[DashboardLayout]
    E --> R[LandingLayout]
    E --> S[AuthLayout]

    N --> J
    N --> K
    O --> J
    O --> L
```

---

## 🔒 Camadas de Segurança

```mermaid
graph TB
    A[Usuário] --> B[HTTPS/TLS]
    B --> C[CDN - Cloudflare]
    C --> D[Frontend - React]

    D --> E{Autenticação}
    E -->|JWT Token| F[httpOnly Cookie]
    E -->|Refresh| G[Refresh Token]

    D --> H{Autorização}
    H -->|Role-based| I[Protected Routes]

    D --> J{Validação}
    J -->|Input| K[Zod Schema]
    J -->|Output| L[Sanitização - DOMPurify]

    D --> M[Backend API]
    M --> N{API Security}
    N --> O[Rate Limiting]
    N --> P[CSRF Protection]
    N --> Q[SQL Injection Prevention]

    M --> R[Database - Encrypted]
```

---

## 📈 Fluxo de Analytics e Monitoramento

```mermaid
graph LR
    A[User Actions] --> B[Event Tracking]

    B --> C[Google Analytics]
    B --> D[Mixpanel]
    B --> E[Sentry - Errors]

    C --> F[Dashboard Analytics]
    D --> F
    E --> G[Error Dashboard]

    F --> H[Product Team]
    G --> I[Dev Team]

    A --> J[Performance Metrics]
    J --> K[Core Web Vitals]
    K --> L[LCP < 2.5s]
    K --> M[FID < 100ms]
    K --> N[CLS < 0.1]
```

---

## 🚀 Pipeline de Deploy

```mermaid
graph LR
    A[Git Push] --> B[GitHub Actions]

    B --> C{Branch?}

    C -->|develop| D[Build Dev]
    C -->|staging| E[Build Staging]
    C -->|main| F[Build Prod]

    D --> G[Run Tests]
    E --> G
    F --> G

    G -->|Pass| H[Build Assets]
    G -->|Fail| I[Notificar Dev]

    H --> J[Optimize Bundle]
    J --> K[Deploy to CDN]

    K -->|Dev| L[dev.personalnurse.com]
    K -->|Staging| M[staging.personalnurse.com]
    K -->|Prod| N[app.personalnurse.com]

    N --> O[Smoke Tests]
    O -->|Pass| P[Deploy Success]
    O -->|Fail| Q[Rollback]
```

---

## 🧩 Integração de Módulos (Feature Modules)

```mermaid
graph TB
    subgraph "Core Modules"
        A[Auth Module]
        B[API Module]
        C[Router Module]
    end

    subgraph "Feature Modules"
        D[Patient Module]
        E[Nurse Module]
        F[Teleconsulta Module]
        G[Chat Module]
        H[Prontuario Module]
        I[Vitals Module]
    end

    subgraph "Shared Modules"
        J[Components Common]
        K[Hooks]
        L[Utils]
    end

    A --> D
    A --> E
    B --> D
    B --> E
    C --> D
    C --> E

    D --> F
    D --> G
    D --> I

    E --> F
    E --> G
    E --> H
    E --> I

    F --> J
    G --> J
    H --> J
    I --> J

    D --> K
    E --> K

    F --> L
    G --> L
```

---

## 📊 Modelo de Dados (Entidades Principais)

```mermaid
erDiagram
    USER ||--o{ PATIENT : "is"
    USER ||--o{ NURSE : "is"
    USER ||--o{ ADMIN : "is"

    PATIENT ||--o{ APPOINTMENT : "books"
    NURSE ||--o{ APPOINTMENT : "attends"

    PATIENT ||--|| PRONTUARIO : "has"
    PRONTUARIO ||--o{ CLINICAL_NOTE : "contains"
    PRONTUARIO ||--o{ DOCUMENT : "contains"

    APPOINTMENT ||--|| TELECONSULTA : "has"
    TELECONSULTA ||--o{ TRANSCRIPTION : "generates"

    PATIENT ||--o{ VITAL_SIGN : "records"
    VITAL_SIGN ||--o{ ALERT : "triggers"

    PATIENT ||--o{ MESSAGE : "sends"
    NURSE ||--o{ MESSAGE : "sends"
    MESSAGE }|--|| CONVERSATION : "belongs to"

    PATIENT ||--o{ NOTIFICATION : "receives"
    NURSE ||--o{ NOTIFICATION : "receives"
```

---

**Fim dos Diagramas de Arquitetura**

Estes diagramas fornecem uma visão clara e visual de como o Personal Nurse está estruturado, facilitando a compreensão do sistema por toda a equipe (desenvolvedores, designers, product owners).
