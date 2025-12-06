# Exemplos de Código - Sentia Care Frontend

Este documento contém exemplos práticos de implementação dos principais componentes do Sentia Care, focando nos **3 módulos** (Office, Agente, Prontuário).

---

## 1. Configuração de Rotas (React Router v6)

### `src/app/routes.tsx`

```typescript
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

// Páginas Públicas
import LandingPage from '@/features/public/pages/LandingPage';
import PricingPage from '@/features/public/pages/PricingPage';
import LoginPage from '@/features/auth/pages/LoginPage';

// Módulo 1: Office
import RiskDashboard from '@/modules/office/pages/DashboardPage';
import ProtocolsList from '@/modules/office/pages/ProtocolsPage';
import ProtocolBuilder from '@/modules/office/pages/ProtocolBuilderPage';
import PatientsList from '@/modules/office/pages/PatientsPage';
import PatientDetail from '@/modules/office/pages/PatientDetailPage';

// Módulo 2: Agente
import ConversationsList from '@/modules/agent/pages/ConversationsPage';
import ConversationView from '@/modules/agent/pages/ConversationPage';

// Módulo 3: Prontuário
import ProntuarioView from '@/modules/prontuario/pages/ProntuarioPage';
import ReportsPage from '@/modules/prontuario/pages/ReportsPage';

const router = createBrowserRouter([
  // ============ ROTAS PÚBLICAS ============
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/planos',
    element: <PricingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },

  // ============ DASHBOARD (PROTEGIDO) ============
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      </ProtectedRoute>
    ),
    children: [
      { path: 'visao-geral', element: <RiskDashboard /> },

      // MÓDULO 1: OFFICE
      { path: 'protocolos', element: <ProtocolsList /> },
      { path: 'protocolos/criar', element: <ProtocolBuilder /> },
      { path: 'protocolos/:id/editar', element: <ProtocolBuilder /> },
      { path: 'pacientes', element: <PatientsList /> },
      { path: 'pacientes/:id', element: <PatientDetail /> },

      // MÓDULO 2: AGENTE
      { path: 'conversas', element: <ConversationsList /> },
      { path: 'conversas/:patientId', element: <ConversationView /> },

      // MÓDULO 3: PRONTUÁRIO
      { path: 'prontuario/:patientId', element: <ProntuarioView /> },
      { path: 'relatorios', element: <ReportsPage /> },
    ],
  },

  // 404
  {
    path: '*',
    element: <div>404 - Página não encontrada</div>,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
```

---

## 2. Stores (Zustand) para os 3 Módulos

### 2.1 Protocol Store (Módulo Office)

```typescript
// src/store/protocolStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ProtocolNode {
  id: string;
  type: 'trigger' | 'message' | 'question' | 'decision' | 'alert' | 'wait' | 'end';
  position: { x: number; y: number };
  data: {
    label: string;
    config: Record<string, any>;
  };
}

export interface Protocol {
  id: string;
  name: string;
  description: string;
  specialty: string;
  nodes: ProtocolNode[];
  edges: Array<{ id: string; source: string; target: string }>;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProtocolState {
  protocols: Protocol[];
  currentProtocol: Protocol | null;

  // Actions
  setProtocols: (protocols: Protocol[]) => void;
  setCurrentProtocol: (protocol: Protocol | null) => void;
  addProtocol: (protocol: Protocol) => void;
  updateProtocol: (id: string, updates: Partial<Protocol>) => void;
  deleteProtocol: (id: string) => void;
}

export const useProtocolStore = create<ProtocolState>()(
  persist(
    (set) => ({
      protocols: [],
      currentProtocol: null,

      setProtocols: (protocols) => set({ protocols }),

      setCurrentProtocol: (protocol) => set({ currentProtocol: protocol }),

      addProtocol: (protocol) =>
        set((state) => ({ protocols: [...state.protocols, protocol] })),

      updateProtocol: (id, updates) =>
        set((state) => ({
          protocols: state.protocols.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),

      deleteProtocol: (id) =>
        set((state) => ({
          protocols: state.protocols.filter((p) => p.id !== id),
        })),
    }),
    { name: 'protocol-storage' }
  )
);
```

### 2.2 Agent Store (Módulo Agente)

```typescript
// src/store/agentStore.ts

import { create } from 'zustand';

export type RiskLevel = 'green' | 'yellow' | 'red';

export interface Message {
  id: string;
  patientId: string;
  type: 'agent' | 'patient';
  content: string;
  timestamp: string;
  riskClassification?: RiskLevel;
  structuredData?: Record<string, any>;
}

export interface Conversation {
  patientId: string;
  patientName: string;
  protocolId: string;
  protocolName: string;
  status: 'active' | 'paused' | 'completed';
  riskLevel: RiskLevel;
  lastMessage: string;
  lastMessageTime: string;
  messages: Message[];
}

interface AgentState {
  conversations: Conversation[];
  activeConversation: string | null;
  alerts: Array<{ patientId: string; level: RiskLevel; timestamp: string }>;

  // Actions
  setConversations: (conversations: Conversation[]) => void;
  setActiveConversation: (patientId: string) => void;
  addMessage: (patientId: string, message: Message) => void;
  updateConversationRisk: (patientId: string, riskLevel: RiskLevel) => void;
  addAlert: (patientId: string, level: RiskLevel) => void;
}

export const useAgentStore = create<AgentState>((set) => ({
  conversations: [],
  activeConversation: null,
  alerts: [],

  setConversations: (conversations) => set({ conversations }),

  setActiveConversation: (patientId) => set({ activeConversation: patientId }),

  addMessage: (patientId, message) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.patientId === patientId
          ? {
              ...conv,
              messages: [...conv.messages, message],
              lastMessage: message.content,
              lastMessageTime: message.timestamp,
            }
          : conv
      ),
    })),

  updateConversationRisk: (patientId, riskLevel) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.patientId === patientId ? { ...conv, riskLevel } : conv
      ),
    })),

  addAlert: (patientId, level) =>
    set((state) => ({
      alerts: [
        { patientId, level, timestamp: new Date().toISOString() },
        ...state.alerts,
      ],
    })),
}));
```

---

## 3. Construtor de Protocolos (React Flow)

### `src/modules/office/components/ProtocolBuilder/FlowCanvas.tsx`

```typescript
import { useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { TriggerNode } from './nodes/TriggerNode';
import { MessageNode } from './nodes/MessageNode';
import { QuestionNode } from './nodes/QuestionNode';
import { DecisionNode } from './nodes/DecisionNode';
import { AlertNode } from './nodes/AlertNode';
import { WaitNode } from './nodes/WaitNode';
import { EndNode } from './nodes/EndNode';

const nodeTypes = {
  trigger: TriggerNode,
  message: MessageNode,
  question: QuestionNode,
  decision: DecisionNode,
  alert: AlertNode,
  wait: WaitNode,
  end: EndNode,
};

interface FlowCanvasProps {
  initialNodes: Node[];
  initialEdges: Edge[];
  onNodesChange: (nodes: Node[]) => void;
  onEdgesChange: (edges: Edge[]) => void;
}

export function FlowCanvas({
  initialNodes,
  initialEdges,
  onNodesChange,
  onEdgesChange,
}: FlowCanvasProps) {
  const [nodes, setNodes, onNodesChangeInternal] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChangeInternal] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
      onEdgesChange(edges);
    },
    [edges, onEdgesChange, setEdges]
  );

  const onNodesChangeHandler = useCallback(
    (changes: any) => {
      onNodesChangeInternal(changes);
      onNodesChange(nodes);
    },
    [nodes, onNodesChange, onNodesChangeInternal]
  );

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChangeHandler}
        onEdgesChange={onEdgesChangeInternal}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
```

### Exemplo de Node: MessageNode

```typescript
// src/modules/office/components/ProtocolBuilder/nodes/MessageNode.tsx

import { Handle, Position, NodeProps } from 'reactflow';
import { MessageCircle } from 'lucide-react';

export function MessageNode({ data }: NodeProps) {
  return (
    <div className="px-4 py-3 bg-white border-2 border-blue-500 rounded-lg shadow-lg min-w-[200px]">
      <Handle type="target" position={Position.Top} />

      <div className="flex items-center gap-2 mb-2">
        <MessageCircle className="w-4 h-4 text-blue-600" />
        <span className="font-bold text-sm text-slate-700">Mensagem</span>
      </div>

      <div className="text-xs text-slate-600 break-words">
        {data.config?.message || 'Configure a mensagem...'}
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
```

---

## 4. Dashboard de Risco

### `src/modules/office/pages/DashboardPage.tsx`

```typescript
import { useQuery } from '@tanstack/react-query';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useAgentStore } from '@/store/agentStore';
import { RiskBadge } from '../components/Dashboard/RiskBadge';
import { PatientGrid } from '../components/Dashboard/PatientGrid';
import { AlertPanel } from '../components/Dashboard/AlertPanel';

export default function RiskDashboard() {
  const { conversations, alerts } = useAgentStore();

  // Stats
  const activePatients = conversations.filter((c) => c.status === 'active').length;
  const criticalAlerts = alerts.filter((a) => a.level === 'red').length;
  const averageAdherence = 87; // Mock - calcular real

  const redPatients = conversations.filter((c) => c.riskLevel === 'red');
  const yellowPatients = conversations.filter((c) => c.riskLevel === 'yellow');
  const greenPatients = conversations.filter((c) => c.riskLevel === 'green');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Visão Geral</h1>
        <p className="text-slate-500">Dashboard de monitoramento e risco</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Pacientes Ativos"
          value={activePatients}
          icon={<CheckCircle className="w-6 h-6 text-teal-600" />}
          bgColor="bg-teal-50"
        />
        <StatsCard
          title="Alertas Críticos"
          value={criticalAlerts}
          icon={<AlertTriangle className="w-6 h-6 text-red-600" />}
          bgColor="bg-red-50"
        />
        <StatsCard
          title="Aderência Média"
          value={`${averageAdherence}%`}
          icon={<Clock className="w-6 h-6 text-blue-600" />}
          bgColor="bg-blue-50"
        />
      </div>

      {/* Alertas Críticos */}
      {redPatients.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Alertas Críticos (Vermelho)
          </h2>
          <AlertPanel patients={redPatients} />
        </div>
      )}

      {/* Grid de Pacientes */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Pacientes Ativos</h2>
        <PatientGrid
          greenPatients={greenPatients}
          yellowPatients={yellowPatients}
          redPatients={redPatients}
        />
      </div>
    </div>
  );
}

function StatsCard({
  title,
  value,
  icon,
  bgColor,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor: string;
}) {
  return (
    <div className={`${bgColor} p-6 rounded-lg border border-slate-200`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-600 font-medium">{title}</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
        </div>
        <div className="p-3 bg-white rounded-lg shadow-sm">{icon}</div>
      </div>
    </div>
  );
}
```

### Componente de Badge de Risco

```typescript
// src/modules/office/components/Dashboard/RiskBadge.tsx

import { RiskLevel } from '@/store/agentStore';

interface RiskBadgeProps {
  level: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
}

export function RiskBadge({ level, size = 'md' }: RiskBadgeProps) {
  const config = {
    green: {
      bg: 'bg-green-100',
      text: 'text-green-700',
      label: 'Estável',
      icon: '🟢',
    },
    yellow: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
      label: 'Atenção',
      icon: '🟡',
    },
    red: {
      bg: 'bg-red-100',
      text: 'text-red-700',
      label: 'Crítico',
      icon: '🔴',
    },
  };

  const { bg, text, label, icon } = config[level];

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  };

  return (
    <span
      className={`${bg} ${text} ${sizeClasses[size]} rounded-full font-bold inline-flex items-center gap-1`}
    >
      <span>{icon}</span>
      {label}
    </span>
  );
}
```

---

## 5. Visualizador de Conversa

### `src/modules/agent/pages/ConversationPage.tsx`

```typescript
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAgentStore } from '@/store/agentStore';
import { MessageBubble } from '../components/ConversationView/MessageBubble';
import { RiskBadge } from '@/modules/office/components/Dashboard/RiskBadge';
import { Timeline } from '../components/ConversationView/Timeline';
import { TakeOverModal } from '../components/ManualIntervention/TakeOverModal';

export default function ConversationPage() {
  const { patientId } = useParams<{ patientId: string }>();
  const { conversations } = useAgentStore();

  const conversation = conversations.find((c) => c.patientId === patientId);

  if (!conversation) {
    return <div>Conversa não encontrada</div>;
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">{conversation.patientName}</h1>
          <p className="text-sm text-slate-500">
            Protocolo: {conversation.protocolName} ({conversation.status})
          </p>
        </div>
        <RiskBadge level={conversation.riskLevel} size="lg" />
      </div>

      {/* Timeline de Mensagens */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
        <Timeline messages={conversation.messages} />
      </div>

      {/* Área de Intervenção Manual */}
      <div className="bg-white border-t border-slate-200 p-4">
        <TakeOverModal patientId={patientId!} />
      </div>
    </div>
  );
}
```

### Componente de Message Bubble

```typescript
// src/modules/agent/components/ConversationView/MessageBubble.tsx

import { Message } from '@/store/agentStore';
import { Bot, User } from 'lucide-react';
import { format } from 'date-fns';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isAgent = message.type === 'agent';

  return (
    <div className={`flex ${isAgent ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`flex items-start gap-2 max-w-[70%] ${isAgent ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Avatar */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isAgent ? 'bg-teal-100' : 'bg-blue-100'
          }`}
        >
          {isAgent ? (
            <Bot className="w-4 h-4 text-teal-600" />
          ) : (
            <User className="w-4 h-4 text-blue-600" />
          )}
        </div>

        {/* Message Content */}
        <div
          className={`px-4 py-2 rounded-lg ${
            isAgent
              ? 'bg-white border border-slate-200'
              : 'bg-blue-600 text-white'
          }`}
        >
          <p className="text-sm">{message.content}</p>
          <p
            className={`text-xs mt-1 ${
              isAgent ? 'text-slate-400' : 'text-blue-100'
            }`}
          >
            {format(new Date(message.timestamp), 'HH:mm')}
          </p>

          {/* Structured Data (se houver) */}
          {message.structuredData && (
            <div className="mt-2 p-2 bg-slate-50 rounded text-xs text-slate-600">
              <pre>{JSON.stringify(message.structuredData, null, 2)}</pre>
            </div>
          )}

          {/* Risk Classification */}
          {message.riskClassification && (
            <div className="mt-2">
              <RiskBadge level={message.riskClassification} size="sm" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

## 6. API Client e Endpoints

### `src/lib/api/client.ts`

```typescript
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 15000,
});

// Request Interceptor
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### `src/lib/api/endpoints.ts`

```typescript
export const API_ENDPOINTS = {
  // Auth
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
  },

  // Protocols (Módulo 1)
  protocols: {
    list: '/protocols',
    detail: (id: string) => `/protocols/${id}`,
    create: '/protocols',
    update: (id: string) => `/protocols/${id}`,
    delete: (id: string) => `/protocols/${id}`,
  },

  // Patients (Módulo 1)
  patients: {
    list: '/patients',
    detail: (id: string) => `/patients/${id}`,
    create: '/patients',
    update: (id: string) => `/patients/${id}`,
    activateProtocol: (id: string) => `/patients/${id}/activate-protocol`,
  },

  // Agent (Módulo 2)
  agent: {
    conversations: '/agent/conversations',
    conversation: (patientId: string) => `/agent/conversations/${patientId}`,
    sendMessage: (patientId: string) => `/agent/conversations/${patientId}/send`,
    classify: '/agent/classify', // Classificação de risco
  },

  // Prontuário (Módulo 3)
  prontuario: {
    timeline: (patientId: string) => `/prontuario/${patientId}/timeline`,
    reports: '/prontuario/reports',
    export: (patientId: string) => `/prontuario/${patientId}/export`,
  },

  // WhatsApp Integration
  whatsapp: {
    webhook: '/whatsapp/webhook',
    sendMessage: '/whatsapp/send',
  },

  // EMR Integration
  emr: {
    sync: '/emr/sync',
    iClinicAuth: '/emr/iclinic/auth',
    ninsaudeAuth: '/emr/ninsaude/auth',
  },
};
```

---

## 7. React Query Hooks

### Hook de Protocolos

```typescript
// src/modules/office/hooks/useProtocols.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { Protocol } from '@/store/protocolStore';

export const useProtocols = () => {
  return useQuery({
    queryKey: ['protocols'],
    queryFn: async () => {
      const { data } = await apiClient.get(API_ENDPOINTS.protocols.list);
      return data as Protocol[];
    },
  });
};

export const useProtocol = (id: string) => {
  return useQuery({
    queryKey: ['protocol', id],
    queryFn: async () => {
      const { data } = await apiClient.get(API_ENDPOINTS.protocols.detail(id));
      return data as Protocol;
    },
    enabled: !!id,
  });
};

export const useCreateProtocol = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (protocol: Partial<Protocol>) => {
      const { data } = await apiClient.post(API_ENDPOINTS.protocols.create, protocol);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['protocols'] });
    },
  });
};
```

### Hook de Classificação de Risco (IA)

```typescript
// src/modules/agent/hooks/useRiskClassification.ts

import { useMutation } from '@tanstack/react-query';
import apiClient from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { RiskLevel } from '@/store/agentStore';

interface ClassificationRequest {
  patientMessage: string;
  protocolContext: string;
}

interface ClassificationResponse {
  riskLevel: RiskLevel;
  symptoms: string[];
  intensity?: number;
  trigger?: string;
  recommendation: string;
}

export const useRiskClassification = () => {
  return useMutation({
    mutationFn: async (request: ClassificationRequest) => {
      const { data } = await apiClient.post<ClassificationResponse>(
        API_ENDPOINTS.agent.classify,
        request
      );
      return data;
    },
  });
};

// Exemplo de uso no componente
/*
const { mutate: classify, data: classification } = useRiskClassification();

classify({
  patientMessage: "Tô com dor forte no lado direito",
  protocolContext: "Pós-Lipoaspiração - Dia 5"
});
*/
```

---

## 8. Integração com WhatsApp (Backend - Webhook Handler)

### Exemplo de Webhook Handler (Node.js)

```typescript
// backend/src/routes/whatsapp.ts

import express from 'express';
import { handleIncomingMessage } from '../services/whatsapp.service';
import { classifyRisk } from '../services/ai.service';
import { saveToTimeline } from '../services/prontuario.service';

const router = express.Router();

// Webhook do WhatsApp Business API
router.post('/webhook', async (req, res) => {
  try {
    const { from, body } = req.body; // from = número do paciente, body = mensagem

    // 1. Buscar contexto do paciente
    const patient = await findPatientByPhone(from);
    if (!patient) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }

    const protocol = await findActiveProtocol(patient.id);
    if (!protocol) {
      return res.status(400).json({ error: 'Nenhum protocolo ativo' });
    }

    // 2. Classificar risco com IA
    const classification = await classifyRisk({
      patientMessage: body,
      protocolContext: protocol.name,
    });

    // 3. Salvar no timeline
    await saveToTimeline({
      patientId: patient.id,
      type: 'patient_message',
      content: body,
      riskClassification: classification.riskLevel,
      structuredData: {
        symptoms: classification.symptoms,
        intensity: classification.intensity,
      },
    });

    // 4. Decidir ação
    if (classification.riskLevel === 'red') {
      // Escalar para o profissional
      await sendAlertToDoctor(patient.id, classification);
      await sendWhatsAppMessage(from, '⚠️ Entendi. Estou avisando o Dr. agora. PROCURE ATENDIMENTO MÉDICO IMEDIATAMENTE.');
    } else if (classification.riskLevel === 'yellow') {
      // Notificar profissional
      await sendAlertToDoctor(patient.id, classification);
      await sendWhatsAppMessage(from, classification.recommendation);
    } else {
      // Continuar protocolo normalmente
      await sendWhatsAppMessage(from, classification.recommendation);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
```

---

## 9. Componente de Safety Layer (Classificação Local)

```typescript
// src/lib/utils/risk-classifier.ts

const CRITICAL_KEYWORDS = [
  'falta de ar',
  'sufocando',
  'dor no peito',
  'hemorragia',
  'sangramento intenso',
  'desmaiei',
  'convulsão',
  'febre alta',
  'temperatura 39',
  'vomitando sangue',
  'tontura forte',
];

const WARNING_KEYWORDS = [
  'dor forte',
  'dor intensa',
  'inchaço',
  'vermelhidão',
  'febre',
  'temperatura',
  'mal estar',
  'enjoo',
];

export function quickRiskCheck(message: string): 'red' | 'yellow' | 'green' {
  const lowerMessage = message.toLowerCase();

  // Verificação rápida de emergência
  const hasCriticalKeyword = CRITICAL_KEYWORDS.some((keyword) =>
    lowerMessage.includes(keyword)
  );

  if (hasCriticalKeyword) {
    return 'red';
  }

  // Verificação de atenção
  const hasWarningKeyword = WARNING_KEYWORDS.some((keyword) =>
    lowerMessage.includes(keyword)
  );

  if (hasWarningKeyword) {
    return 'yellow';
  }

  return 'green';
}
```

---

## 10. Package.json

```json
{
  "name": "sentia-care-frontend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint . --ext ts,tsx"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.0",
    "zustand": "^4.4.7",
    "@tanstack/react-query": "^5.17.0",
    "axios": "^1.6.5",
    "react-hook-form": "^7.49.3",
    "@hookform/resolvers": "^3.3.4",
    "zod": "^3.22.4",
    "@headlessui/react": "^1.7.17",
    "tailwindcss": "^3.4.1",
    "clsx": "^2.1.0",
    "lucide-react": "^0.312.0",
    "reactflow": "^11.10.0",
    "recharts": "^2.10.3",
    "date-fns": "^3.0.6",
    "react-toastify": "^9.1.3"
  },
  "devDependencies": {
    "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.18",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.3.3",
    "vite": "^5.0.11",
    "vitest": "^1.2.0",
    "eslint": "^8.56.0",
    "prettier": "^3.2.4",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.33"
  }
}
```

---

## 11. Environment Variables

```bash
# .env.example

# API Backend
VITE_API_URL=http://localhost:3000/api

# WhatsApp (Backend usa)
WHATSAPP_BUSINESS_API_TOKEN=your_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_id

# GenAI
GEMINI_API_KEY=your_gemini_key
OPENAI_API_KEY=your_openai_key

# EMR Integrations
ICLINIC_CLIENT_ID=your_client_id
ICLINIC_CLIENT_SECRET=your_secret

# SMS Alerts
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=+5562999999999

# Features
VITE_ENABLE_EMR_INTEGRATION=true
VITE_ENABLE_MARKETPLACE=false
```

---

**Fim dos Exemplos de Código**

Estes exemplos fornecem uma base sólida para iniciar o desenvolvimento do Sentia Care, focando nos **3 módulos principais** (Office, Agente, Prontuário) e na integração com WhatsApp e GenAI.
