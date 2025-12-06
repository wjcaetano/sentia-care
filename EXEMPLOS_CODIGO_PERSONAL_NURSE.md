# Exemplos de Código - Personal Nurse Frontend

Este documento contém exemplos práticos de implementação dos principais componentes e padrões do Personal Nurse.

---

## 1. Configuração de Rotas (React Router v6)

### `src/app/routes.tsx`

```tsx
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { LandingLayout } from '@/components/layout/LandingLayout';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

// Páginas Públicas
import LandingPage from '@/features/public/pages/LandingPage';
import PricingPage from '@/features/public/pages/PricingPage';
import LoginPage from '@/features/auth/pages/LoginPage';

// Páginas do Paciente
import PatientDashboard from '@/features/patient/pages/Dashboard';
import PatientOnboarding from '@/features/patient/pages/Onboarding';
import PatientAgenda from '@/features/patient/pages/Agenda';
import TeleconsultaRoom from '@/features/teleconsulta/pages/Room';

// Páginas do Enfermeiro
import NurseDashboard from '@/features/nurse/pages/Dashboard';
import PatientList from '@/features/nurse/pages/PatientList';
import PatientDetail from '@/features/nurse/pages/PatientDetail';
import NurseAgenda from '@/features/nurse/pages/Agenda';

const router = createBrowserRouter([
  // ============ ROTAS PÚBLICAS ============
  {
    path: '/',
    element: (
      <LandingLayout>
        <Outlet />
      </LandingLayout>
    ),
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'planos', element: <PricingPage /> },
    ],
  },

  // ============ AUTENTICAÇÃO ============
  {
    path: '/login',
    element: <LoginPage />,
  },

  // ============ ÁREA DO PACIENTE ============
  {
    path: '/paciente',
    element: (
      <ProtectedRoute allowedRoles={['patient']}>
        <DashboardLayout userType="patient">
          <Outlet />
        </DashboardLayout>
      </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <PatientDashboard /> },
      { path: 'onboarding/*', element: <PatientOnboarding /> },
      { path: 'agendar', element: <PatientAgenda /> },
      { path: 'chat', element: <div>Chat</div> },
      { path: 'sinais-vitais', element: <div>Vitals</div> },
    ],
  },

  // ============ TELECONSULTA (COMPARTILHADA) ============
  {
    path: '/teleconsulta/:roomId',
    element: (
      <ProtectedRoute allowedRoles={['patient', 'nurse']}>
        <TeleconsultaRoom />
      </ProtectedRoute>
    ),
  },

  // ============ ÁREA DO ENFERMEIRO ============
  {
    path: '/enfermeiro',
    element: (
      <ProtectedRoute allowedRoles={['nurse']}>
        <DashboardLayout userType="nurse">
          <Outlet />
        </DashboardLayout>
      </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <NurseDashboard /> },
      { path: 'pacientes', element: <PatientList /> },
      { path: 'pacientes/:id', element: <PatientDetail /> },
      { path: 'agenda', element: <NurseAgenda /> },
      { path: 'chat', element: <div>Chat</div> },
      { path: 'monitoramento', element: <div>Monitoring</div> },
    ],
  },

  // ============ 404 ============
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

## 2. Protected Route Component

### `src/components/auth/ProtectedRoute.tsx`

```tsx
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Spinner } from '@/components/common/Spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: ('patient' | 'nurse' | 'admin')[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, role, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && !allowedRoles.includes(role)) {
    return <Navigate to="/401" replace />;
  }

  return <>{children}</>;
}
```

---

## 3. Auth Store (Zustand)

### `src/store/authStore.ts`

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'nurse' | 'admin';
  profileImage?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  role: 'patient' | 'nurse' | 'admin' | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await axios.post('/api/auth/login', { email, password });
          const { user, token } = response.data;

          set({
            user,
            token,
            role: user.role,
            isAuthenticated: true,
            isLoading: false,
          });

          // Configurar token no axios
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          role: null,
          isAuthenticated: false,
        });
        delete axios.defaults.headers.common['Authorization'];
      },

      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },

      checkAuth: async () => {
        const { token } = get();
        if (!token) return;

        set({ isLoading: true });
        try {
          const response = await axios.get('/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          set({
            user: response.data,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          get().logout();
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token, user: state.user, role: state.role }),
    }
  )
);
```

---

## 4. React Query Hook (API Integration)

### `src/features/patient/api/usePatients.ts`

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface Patient {
  id: string;
  name: string;
  email: string;
  cpf: string;
  birthDate: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
  lastConsultation?: string;
}

// Funções de API
const fetchPatients = async (): Promise<Patient[]> => {
  const { data } = await axios.get('/api/patients');
  return data;
};

const fetchPatient = async (id: string): Promise<Patient> => {
  const { data } = await axios.get(`/api/patients/${id}`);
  return data;
};

const updatePatient = async ({ id, data }: { id: string; data: Partial<Patient> }): Promise<Patient> => {
  const response = await axios.put(`/api/patients/${id}`, data);
  return response.data;
};

// Hooks
export const usePatients = () => {
  return useQuery({
    queryKey: ['patients'],
    queryFn: fetchPatients,
    staleTime: 5 * 60 * 1000, // 5 minutos
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
    onSuccess: (data) => {
      // Atualizar cache
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      queryClient.setQueryData(['patient', data.id], data);
    },
  });
};

// Exemplo de uso no componente
// const { data: patients, isLoading, error } = usePatients();
// const { mutate: updatePatient } = useUpdatePatient();
```

---

## 5. Custom Hook para WebRTC (Teleconsulta)

### `src/features/teleconsulta/hooks/useWebRTC.ts`

```typescript
import { useState, useEffect, useRef } from 'react';
import DailyIframe, { DailyCall, DailyParticipant } from '@daily-co/daily-js';

interface UseWebRTCProps {
  roomUrl: string;
  token?: string;
}

export const useWebRTC = ({ roomUrl, token }: UseWebRTCProps) => {
  const [callObject, setCallObject] = useState<DailyCall | null>(null);
  const [participants, setParticipants] = useState<Record<string, DailyParticipant>>({});
  const [isJoined, setIsJoined] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Criar instância do Daily
    const daily = DailyIframe.createCallObject({
      audioSource: true,
      videoSource: true,
    });

    setCallObject(daily);

    return () => {
      daily.destroy();
    };
  }, []);

  useEffect(() => {
    if (!callObject) return;

    // Event listeners
    const handleJoinedMeeting = () => {
      setIsJoined(true);
      setParticipants(callObject.participants());
    };

    const handleParticipantUpdated = () => {
      setParticipants(callObject.participants());
    };

    const handleParticipantLeft = () => {
      setParticipants(callObject.participants());
    };

    const handleError = (e: any) => {
      setError(e.errorMsg);
      console.error('Daily error:', e);
    };

    callObject.on('joined-meeting', handleJoinedMeeting);
    callObject.on('participant-joined', handleParticipantUpdated);
    callObject.on('participant-updated', handleParticipantUpdated);
    callObject.on('participant-left', handleParticipantLeft);
    callObject.on('error', handleError);

    return () => {
      callObject.off('joined-meeting', handleJoinedMeeting);
      callObject.off('participant-joined', handleParticipantUpdated);
      callObject.off('participant-updated', handleParticipantUpdated);
      callObject.off('participant-left', handleParticipantLeft);
      callObject.off('error', handleError);
    };
  }, [callObject]);

  const joinRoom = async () => {
    if (!callObject) return;

    try {
      await callObject.join({ url: roomUrl, token });
    } catch (e) {
      setError('Erro ao entrar na sala');
      console.error(e);
    }
  };

  const leaveRoom = () => {
    if (!callObject) return;
    callObject.leave();
    setIsJoined(false);
  };

  const toggleAudio = () => {
    if (!callObject) return;
    callObject.setLocalAudio(!isAudioEnabled);
    setIsAudioEnabled(!isAudioEnabled);
  };

  const toggleVideo = () => {
    if (!callObject) return;
    callObject.setLocalVideo(!isVideoEnabled);
    setIsVideoEnabled(!isVideoEnabled);
  };

  const startScreenShare = async () => {
    if (!callObject) return;
    await callObject.startScreenShare();
  };

  const stopScreenShare = () => {
    if (!callObject) return;
    callObject.stopScreenShare();
  };

  return {
    callObject,
    participants,
    isJoined,
    isAudioEnabled,
    isVideoEnabled,
    error,
    joinRoom,
    leaveRoom,
    toggleAudio,
    toggleVideo,
    startScreenShare,
    stopScreenShare,
  };
};
```

---

## 6. Componente de Teleconsulta

### `src/features/teleconsulta/pages/Room.tsx`

```tsx
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Monitor } from 'lucide-react';
import { useWebRTC } from '../hooks/useWebRTC';
import { VideoTile } from '../components/VideoTile';
import { TranscriptionPanel } from '../components/TranscriptionPanel';
import { ChatPanel } from '../components/ChatPanel';

export default function TeleconsultaRoom() {
  const { roomId } = useParams<{ roomId: string }>();

  const {
    participants,
    isJoined,
    isAudioEnabled,
    isVideoEnabled,
    joinRoom,
    leaveRoom,
    toggleAudio,
    toggleVideo,
    startScreenShare,
  } = useWebRTC({
    roomUrl: `https://personalnurse.daily.co/${roomId}`,
    token: 'your-token-here', // Obter do backend
  });

  useEffect(() => {
    joinRoom();
    return () => leaveRoom();
  }, []);

  const participantArray = Object.values(participants);
  const localParticipant = participantArray.find((p) => p.local);
  const remoteParticipants = participantArray.filter((p) => !p.local);

  if (!isJoined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-white text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Entrando na sala...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-slate-800 px-6 py-4 flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-white font-semibold">Teleconsulta em andamento</span>
        </div>
        <div className="text-slate-400 text-sm">
          {remoteParticipants.length > 0 ? '2 participantes' : '1 participante'}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Area */}
        <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Remote Participant (Maior destaque) */}
          {remoteParticipants.map((participant) => (
            <VideoTile
              key={participant.user_id}
              participant={participant}
              isLocal={false}
              className="w-full h-full"
            />
          ))}

          {/* Local Participant (PiP) */}
          {localParticipant && (
            <VideoTile
              participant={localParticipant}
              isLocal={true}
              className="w-full h-full md:absolute md:bottom-24 md:right-8 md:w-64 md:h-48"
            />
          )}
        </div>

        {/* Sidebar - Tabs (Chat + Transcrição) */}
        <div className="w-96 bg-slate-800 border-l border-slate-700 flex flex-col">
          <div className="flex border-b border-slate-700">
            <button className="flex-1 px-4 py-3 text-white bg-slate-700 font-medium">
              Chat
            </button>
            <button className="flex-1 px-4 py-3 text-slate-400 hover:bg-slate-700 transition-colors">
              Transcrição (IA)
            </button>
          </div>

          <div className="flex-1 overflow-hidden">
            <ChatPanel roomId={roomId!} />
            {/* <TranscriptionPanel roomId={roomId!} /> */}
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-slate-800 px-6 py-4 flex items-center justify-center gap-4 border-t border-slate-700">
        <button
          onClick={toggleAudio}
          className={`p-4 rounded-full transition-all ${
            isAudioEnabled
              ? 'bg-slate-700 hover:bg-slate-600 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
          title={isAudioEnabled ? 'Desligar microfone' : 'Ligar microfone'}
        >
          {isAudioEnabled ? <Mic size={24} /> : <MicOff size={24} />}
        </button>

        <button
          onClick={toggleVideo}
          className={`p-4 rounded-full transition-all ${
            isVideoEnabled
              ? 'bg-slate-700 hover:bg-slate-600 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
          title={isVideoEnabled ? 'Desligar câmera' : 'Ligar câmera'}
        >
          {isVideoEnabled ? <Video size={24} /> : <VideoOff size={24} />}
        </button>

        <button
          onClick={startScreenShare}
          className="p-4 rounded-full bg-slate-700 hover:bg-slate-600 text-white transition-all"
          title="Compartilhar tela"
        >
          <Monitor size={24} />
        </button>

        <button
          onClick={leaveRoom}
          className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all ml-4"
          title="Encerrar chamada"
        >
          <PhoneOff size={24} />
        </button>
      </div>
    </div>
  );
}
```

---

## 7. Componente de Formulário com React Hook Form + Zod

### `src/features/patient/components/AnamneseForm.tsx`

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';

const anamneseSchema = z.object({
  fullName: z.string().min(3, 'Nome completo é obrigatório'),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
  birthDate: z.string().min(1, 'Data de nascimento é obrigatória'),
  phone: z.string().min(10, 'Telefone inválido'),
  email: z.string().email('Email inválido'),
  address: z.string().min(5, 'Endereço é obrigatório'),

  // Histórico Médico
  allergies: z.string().optional(),
  medications: z.string().optional(),
  surgeries: z.string().optional(),
  chronicDiseases: z.string().optional(),

  // Queixa Principal
  chiefComplaint: z.string().min(10, 'Descreva sua queixa principal (mínimo 10 caracteres)'),
});

type AnamneseFormData = z.infer<typeof anamneseSchema>;

interface AnamneseFormProps {
  onSubmit: (data: AnamneseFormData) => void;
  isLoading?: boolean;
}

export function AnamneseForm({ onSubmit, isLoading }: AnamneseFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AnamneseFormData>({
    resolver: zodResolver(anamneseSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Dados Pessoais</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nome Completo"
            {...register('fullName')}
            error={errors.fullName?.message}
            placeholder="João da Silva"
          />

          <Input
            label="CPF"
            {...register('cpf')}
            error={errors.cpf?.message}
            placeholder="000.000.000-00"
          />

          <Input
            label="Data de Nascimento"
            type="date"
            {...register('birthDate')}
            error={errors.birthDate?.message}
          />

          <Input
            label="Telefone"
            {...register('phone')}
            error={errors.phone?.message}
            placeholder="(11) 99999-9999"
          />
        </div>

        <div className="mt-4">
          <Input
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
            placeholder="joao@email.com"
          />
        </div>

        <div className="mt-4">
          <Input
            label="Endereço Completo"
            {...register('address')}
            error={errors.address?.message}
            placeholder="Rua, Número, Bairro, Cidade - UF"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Histórico Médico</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Alergias (medicamentos, alimentos, etc.)
            </label>
            <textarea
              {...register('allergies')}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              rows={3}
              placeholder="Descreva suas alergias ou deixe em branco se não tiver"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Medicamentos em Uso
            </label>
            <textarea
              {...register('medications')}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              rows={3}
              placeholder="Liste os medicamentos que você usa regularmente"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Cirurgias Anteriores
            </label>
            <textarea
              {...register('surgeries')}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              rows={3}
              placeholder="Informe cirurgias realizadas e quando"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Doenças Crônicas (Diabetes, Hipertensão, etc.)
            </label>
            <textarea
              {...register('chronicDiseases')}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              rows={3}
              placeholder="Liste doenças crônicas que você possui"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Queixa Principal</h2>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Por que você busca acompanhamento de enfermagem? *
          </label>
          <textarea
            {...register('chiefComplaint')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
              errors.chiefComplaint ? 'border-red-500' : 'border-slate-300'
            }`}
            rows={5}
            placeholder="Descreva detalhadamente sua queixa ou motivo para o acompanhamento"
          />
          {errors.chiefComplaint && (
            <p className="mt-1 text-sm text-red-600">{errors.chiefComplaint.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          Salvar Rascunho
        </Button>
        <Button type="submit" loading={isLoading}>
          Enviar e Continuar
        </Button>
      </div>
    </form>
  );
}
```

---

## 8. Componente de Input Reutilizável

### `src/components/common/Input.tsx`

```tsx
import { forwardRef, InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <input
          ref={ref}
          className={clsx(
            'w-full px-4 py-2 rounded-lg border transition-all',
            'focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none',
            error
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-slate-300',
            props.disabled && 'bg-slate-100 cursor-not-allowed',
            className
          )}
          {...props}
        />

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && <p className="mt-1 text-sm text-slate-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
```

---

## 9. Componente de Button Reutilizável

### `src/components/common/Button.tsx`

```tsx
import { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-300/50',
    secondary: 'bg-slate-600 hover:bg-slate-700 text-white',
    outline: 'border-2 border-teal-600 text-teal-700 hover:bg-teal-50',
    ghost: 'hover:bg-slate-100 text-slate-700',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={clsx(
        'rounded-lg font-semibold transition-all flex items-center justify-center gap-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!loading && icon}
      {children}
    </button>
  );
}
```

---

## 10. Socket.io Hook para Chat Real-time

### `src/features/chat/hooks/useSocket.ts`

```typescript
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/store/authStore';

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
  type: 'text' | 'image' | 'file';
}

export const useSocket = (conversationId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const { token } = useAuthStore();

  useEffect(() => {
    if (!token) return;

    // Conectar ao socket
    const newSocket = io(import.meta.env.VITE_WS_URL, {
      auth: { token },
      query: { conversationId },
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('Socket conectado');
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Socket desconectado');
    });

    // Receber mensagem
    newSocket.on('message', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Indicador de digitação
    newSocket.on('typing-start', () => {
      setIsTyping(true);
    });

    newSocket.on('typing-stop', () => {
      setIsTyping(false);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [token, conversationId]);

  const sendMessage = (content: string, type: 'text' | 'image' | 'file' = 'text') => {
    if (!socket) return;

    socket.emit('send-message', {
      conversationId,
      content,
      type,
    });
  };

  const startTyping = () => {
    if (!socket) return;
    socket.emit('typing-start', { conversationId });
  };

  const stopTyping = () => {
    if (!socket) return;
    socket.emit('typing-stop', { conversationId });
  };

  return {
    socket,
    messages,
    isTyping,
    isConnected,
    sendMessage,
    startTyping,
    stopTyping,
  };
};
```

---

## 11. Axios Config com Interceptors

### `src/lib/api/client.ts`

```typescript
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor - Adicionar token
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor - Tratar erros globalmente
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Token expirado - Tentar refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
          token: useAuthStore.getState().token,
        });

        useAuthStore.setState({ token: data.token });
        originalRequest.headers.Authorization = `Bearer ${data.token}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Outros erros
    return Promise.reject(error);
  }
);

export default apiClient;
```

---

## 12. Environment Variables Template

### `.env.example`

```bash
# API Backend
VITE_API_URL=https://api.personalnurse.com.br
VITE_WS_URL=wss://ws.personalnurse.com.br

# WebRTC (Daily.co)
VITE_DAILY_API_KEY=your_daily_api_key_here

# Payment Gateway
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_key

# Analytics
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
VITE_SENTRY_DSN=https://your-sentry-dsn

# Feature Flags
VITE_ENABLE_AI_TRANSCRIPTION=true
VITE_ENABLE_IOT_SYNC=false
VITE_ENABLE_DIGITAL_SIGNATURE=true

# App Info
VITE_APP_NAME=Personal Nurse
VITE_APP_VERSION=1.0.0
```

---

## 13. Package.json Example

```json
{
  "name": "personal-nurse-frontend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:e2e": "playwright test",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write \"src/**/*.{ts,tsx,json,css,md}\""
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.0",
    "zustand": "^4.4.7",
    "@tanstack/react-query": "^5.17.0",
    "axios": "^1.6.5",
    "socket.io-client": "^4.6.1",
    "react-hook-form": "^7.49.3",
    "@hookform/resolvers": "^3.3.4",
    "zod": "^3.22.4",
    "@headlessui/react": "^1.7.17",
    "@daily-co/daily-js": "^0.61.0",
    "recharts": "^2.10.3",
    "react-dropzone": "^14.2.3",
    "react-big-calendar": "^1.8.5",
    "date-fns": "^3.0.6",
    "react-toastify": "^9.1.3",
    "clsx": "^2.1.0",
    "lucide-react": "^0.312.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.18",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.3.3",
    "vite": "^5.0.11",
    "vitest": "^1.2.0",
    "@testing-library/react": "^14.1.2",
    "@testing-library/jest-dom": "^6.2.0",
    "playwright": "^1.41.0",
    "eslint": "^8.56.0",
    "prettier": "^3.2.4",
    "tailwindcss": "^3.4.1",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.33"
  }
}
```

---

**Fim dos Exemplos de Código**

Estes exemplos fornecem uma base sólida para iniciar o desenvolvimento do Personal Nurse. Cada componente pode ser expandido conforme necessário, seguindo os mesmos padrões de qualidade e estrutura.
