# 🏥 Sentia Care - Inteligência para o Cuidado Contínuo

## 📚 Documentação Completa do Projeto

Este repositório contém o **plano estruturado completo** para o desenvolvimento da plataforma **Sentia Care**, uma solução SaaS B2B que automatiza o follow-up e a documentação clínica para profissionais de enfermagem via GenAI e WhatsApp.

---

## 🎯 O que é o Sentia Care?

**Sentia Care não é mais um EMR.** É uma **camada de inteligência artificial** que se conecta a prontuários existentes, focando no que realmente importa:

✅ **Automação de Protocolos** via WhatsApp
✅ **Triagem Inteligente** com GenAI (Verde/Amarelo/Vermelho)
✅ **Plug-and-Play** com EMRs existentes (iClinic, Ninsaúde)
✅ **Marketplace de Protocolos** (Network Effect)

### Proposta de Valor

> "Transforme conversas via WhatsApp em dados estruturados e alertas de risco, eliminando a sobrecarga de trabalho e garantindo a segurança clínica."

---

## 📂 Estrutura da Documentação

### 1. **PLANO_FRONTEND_SENTIA_CARE.md** ⭐ (Documento Principal)
   **Plano Estratégico Completo** - 14 seções detalhadas:
   - Análise de mercado e posicionamento
   - Arquitetura de produto (3 módulos: Office, Agente, Prontuário)
   - Stack tecnológica completa
   - Estrutura de pastas modular
   - Mapeamento de rotas e componentes
   - Integrações (WhatsApp, GenAI, EMRs)
   - Segurança e compliance (LGPD + COFEN 696/2022)
   - Modelo de negócio e precificação
   - **Roadmap de 90 dias** (MVP)
   - Moat estratégico (Marketplace de Protocolos)

### 2. **EXEMPLOS_CODIGO_SENTIA_CARE.md** 💻
   **Guia Prático de Código** - Exemplos prontos:
   - Rotas React Router v6
   - Stores Zustand (Protocol, Agent, Prontuário)
   - Construtor de Protocolos (React Flow)
   - Dashboard de Risco
   - Visualizador de Conversa
   - API Client + Endpoints
   - Integração WhatsApp (webhook handler)
   - React Query hooks
   - Risk Classifier (Safety Layer)

### 3. **CHECKLIST_MVP_90_DIAS.md** ✅
   **Checklist Executivo** - Organizado por semanas:
   - Mês 1: Validação e Design (ICP + Protocolos + Figma + Early Adopters)
   - Mês 2: Desenvolvimento Core (3 módulos + WhatsApp + GenAI)
   - Mês 3: Iteração e GTM (Feedback + Dashboard + 10 clientes)
   - KPIs de sucesso
   - Riscos e mitigações

### 4. **QUICKSTART_GUIDE.md** ⚡
   **Guia de Setup Rápido** (30 minutos):
   - Comandos prontos para copiar
   - Configuração passo a passo
   - Setup de projeto Vite + React + TypeScript
   - Configuração de TailwindCSS
   - Estrutura de pastas
   - Troubleshooting

### 5. **ARQUITETURA_VISUAL.md** 🏗️
   **Diagramas Mermaid**:
   - Arquitetura geral (3 módulos)
   - Fluxo de dados
   - Mapa de rotas
   - Sequência de interações (WhatsApp + IA)
   - Modelo de dados

---

## 🏗️ Arquitetura de 3 Módulos

O Sentia Care é dividido em três componentes principais, onde o **Módulo 2 (Agente GenAI)** é o Moat competitivo.

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  MÓDULO 1    │  │  MÓDULO 2    │  │  MÓDULO 3    │
│              │  │              │  │              │
│  O OFFICE    │  │  O AGENTE    │  │ O PRONTUÁRIO │
│    (CMS)     │  │   (GenAI)    │  │    (Data)    │
│              │  │              │  │              │
└──────────────┘  └──────────────┘  └──────────────┘
     │                  │                   │
     └──────────────────┴───────────────────┘
                        │
                        ▼
              ┌─────────────────┐
              │  EMR + WhatsApp │
              └─────────────────┘
```

### Módulo 1: O Office (Back Office do Profissional)
**Valor:** Controle total sobre protocolos, pacientes e monitoramento de risco

- Construtor de Protocolos Visual (drag-and-drop)
- Biblioteca de Templates (Pós-Lipo, Pós-Bari, Hipertensão, etc.)
- Dashboard de Risco (Verde/Amarelo/Vermelho)
- Gestão de Pacientes
- Escalonamento de Alertas Críticos

### Módulo 2: O Agente (GenAI) - **MOAT**
**Valor:** Automação conversacional com triagem inteligente

- Disparo Automático de Mensagens (WhatsApp)
- Conversa Natural (NLU via LLM)
- Triagem de Risco (Verde/Amarelo/Vermelho)
- Coleta Estruturada de Dados (NLP)
- Guardrail Legal (Safety Layer proprietário)
- FAQ Inteligente (RAG)

### Módulo 3: O Prontuário (Dados e Conformidade)
**Valor:** Repositório legal, rastreabilidade e análise

- Log Imutável de Interações
- Timeline de Eventos
- Relatório de Aderência
- Exportação Legal (PDF assinado)
- Integração com EMR Externo (API)
- Auditoria e Criptografia (LGPD)

---

## 🛠️ Stack Tecnológica

### Frontend
```
Framework:       React 18 + TypeScript + Vite
Roteamento:      React Router v6
Estado:          Zustand (global) + React Query (server)
UI:              TailwindCSS + Headless UI
Formulários:     React Hook Form + Zod
Flow Builder:    React Flow (drag-and-drop)
Gráficos:        Recharts
Analytics:       Mixpanel + Sentry
```

### Backend
```
Runtime:         Node.js + Express
Database:        PostgreSQL
Cache:           Redis
Queue:           Bull (jobs assíncronos)
GenAI:           Google Gemini / OpenAI
WhatsApp:        WhatsApp Business API / Twilio
SMS:             Twilio (alertas críticos)
Storage:         AWS S3
EMR:             REST APIs (iClinic, Ninsaúde)
Deploy:          AWS / Google Cloud
```

---

## 🎯 Nicho de Foco (MVP)

### ICP (Ideal Customer Profile)

| Categoria | Perfil | Dor |
|-----------|--------|-----|
| **Vertical Primária** | Cirurgia Plástica/Bariatrica/Estética Avançada | Recebe 30+ msgs/dia no WhatsApp pessoal |
| **Vertical Secundária** | Enfermeiros de Home Care de Alto Padrão | Falta de rastreabilidade (risco jurídico) |
| **Geografia** | Goiânia/DF (Polo Médico) | Incapacidade de escalar atendimento |
| **Budget** | R$ 500-2.000/mês | Menos que o custo de 1 secretária adicional |

---

## 📋 Roadmap de 90 Dias (MVP)

### Mês 1: Validação e Design (Dias 1-30)
- ✅ 10 entrevistas com ICP
- ✅ 5 protocolos mapeados
- ✅ Design UI/UX (Figma)
- ✅ 5 early adopters fechados (Setup Fee R$ 500)

### Mês 2: Desenvolvimento Core (Dias 31-60)
- ✅ Módulo 1: Cadastros + Construtor de Protocolos
- ✅ Módulo 2: WhatsApp Integration + GenAI de Triagem
- ✅ Acurácia da IA: 95%
- ✅ MVP funcional em staging

### Mês 3: Iteração e GTM (Dias 61-90)
- ✅ Deploy para 5 early adopters
- ✅ Módulo 3: Prontuário (Timeline + Relatórios)
- ✅ Dashboard de Risco
- ✅ 10 clientes pagantes
- ✅ MRR: R$ 5.000 - R$ 10.000

---

## 💰 Modelo de Negócio

### Precificação por Níveis

| Plano | Cliente-Alvo | Preço | Recursos |
|-------|--------------|-------|----------|
| **Essencial** | Enfermeiro autônomo | **R$ 197/mês** | 30 pacientes ativos, 3 protocolos privados |
| **Pro** | Clínica com 2-5 profissionais | **R$ 797/mês** | 100 pacientes, protocolos ilimitados, integração EMR |
| **Enterprise** | Hospital/Rede | **Sob Consulta** | Pacientes ilimitados, multi-tenant, API dedicada |

### Moat Estratégico: Marketplace de Protocolos (Visão Ano 2)

**Como funciona:**
1. Profissionais criam protocolos no Construtor Visual
2. Licenciam seu protocolo no Marketplace
3. Outros profissionais compram acesso (R$ 97/mês)
4. Sentia Care cobra **30% de comissão**

**Network Effect:** Quanto mais protocolos → Mais profissionais → Mais dados → IA melhor

---

## 📊 KPIs de Sucesso (90 Dias)

| Métrica | Target |
|---------|--------|
| Clientes Ativos | 10 |
| Pacientes Monitorados | 300 |
| Protocolos Criados | 50 |
| Mensagens Enviadas/Dia | 1.000 |
| Acurácia da IA | 95% |
| Incidentes Críticos | 0 |
| MRR | R$ 5.000 |
| NPS | > 50 |
| Churn | < 10% |

---

## 🚀 Como Usar Esta Documentação

### Para Product Owners / Gerentes:
1. **Leia primeiro:** `PLANO_FRONTEND_SENTIA_CARE.md` (Seções 1-2, 8-9)
2. **Use para planejamento:** `CHECKLIST_MVP_90_DIAS.md`
3. **Defina KPIs** com base na Seção 11 do plano

### Para Desenvolvedores:
1. **Leia primeiro:** `PLANO_FRONTEND_SENTIA_CARE.md` (Seções 2-6)
2. **Setup rápido:** `QUICKSTART_GUIDE.md`
3. **Referência de código:** `EXEMPLOS_CODIGO_SENTIA_CARE.md`
4. **Acompanhe progresso:** `CHECKLIST_MVP_90_DIAS.md`

### Para Tech Leads:
1. **Leia completo:** `PLANO_FRONTEND_SENTIA_CARE.md`
2. **Valide arquitetura:** Seção 2-3
3. **Revise integrações:** Seção 6
4. **Planeje sprints:** Use Roadmap + Checklist

### Para Designers:
1. **Foco em:** Seção 4 (Componentes) + Seção 8 (Fluxos)
2. **Design System:** Seção 7
3. **Referência de código:** `EXEMPLOS_CODIGO_SENTIA_CARE.md`

---

## 🔐 Segurança e Compliance

### LGPD
✅ Consentimento explícito do paciente
✅ Criptografia AES-256
✅ Direito ao esquecimento
✅ Portabilidade de dados
✅ Logs de auditoria

### COFEN 696/2022
✅ Registro de consentimento
✅ Assinatura digital (ICP-Brasil - Roadmap)
✅ Prontuário eletrônico legal (Lei 13.787/2018)
✅ Validação de COREN

---

## 🔗 Integrações Previstas

| Serviço | Funcionalidade | Fase |
|---------|---------------|------|
| WhatsApp Business API | Comunicação com paciente | MVP |
| Google Gemini / OpenAI | GenAI de triagem | MVP |
| Twilio | SMS (alertas críticos) | MVP |
| iClinic API | Integração EMR | Pós-MVP |
| Ninsaúde API | Integração EMR | Pós-MVP |
| BirdID / Soluti | Assinatura Digital ICP-Brasil | Ano 2 |

---

## ⚠️ Riscos e Mitigações

| Risco | Mitigação |
|-------|-----------|
| IA errar triagem crítica | Safety Layer + Validação manual contínua |
| WhatsApp mudar política | Ter SMS como backup |
| Custo de API GenAI escalar | Otimizar prompts + Cache |
| Profissional não aderir | Onboarding hands-on (2h) |

---

## 📞 Próximos Passos

### Esta Semana:

1. ✅ **Aprovar plano** com stakeholders
2. ✅ **Montar equipe:**
   - 1 Full-Stack Developer (Node.js + React)
   - 1 Frontend Developer (React + TypeScript)
   - 1 UI/UX Designer
3. ✅ **Setup inicial:**
   - Criar repositório Git
   - Criar conta AWS/Google Cloud
   - Comprar domínio
4. ✅ **Iniciar Mês 1:**
   - Agendar 10 entrevistas com ICP
   - Mapear 5 protocolos

---

## 📄 Licença

Este documento é propriedade intelectual da equipe Sentia Care e destina-se exclusivamente ao uso interno do projeto.

---

**Última atualização:** 06/12/2025
**Versão:** 1.0 - MVP 90 Dias
**Autor:** Equipe de Produto Sentia Care

---

## 🙏 Diferencial Competitivo

**Sentia Care não compete com EMRs. Sentia Care é o Agente de IA que os potencializa.**

- ❌ Não tenta substituir iClinic, Ninsaúde, etc.
- ✅ Conecta-se a eles via API
- ✅ Foca no que realmente importa: **automação de protocolo** e **triagem inteligente**
- ✅ Cria um **Moat de Network Effects** via Marketplace de Protocolos

**Bom desenvolvimento! 🚀**
