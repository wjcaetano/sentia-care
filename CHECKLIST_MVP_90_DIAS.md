# ✅ Checklist de Implementação - Sentia Care MVP (90 Dias)

Este checklist organiza as tarefas do MVP do Sentia Care em um roadmap de 90 dias focado nos **3 módulos principais**.

---

## 📅 MÊS 1: VALIDAÇÃO E DESIGN (Dias 1-30)

### ✅ Semana 1: Pesquisa e Validação de ICP

- [ ] Realizar 10 entrevistas com cirurgiões plásticos (Dr. Silva profile)
- [ ] Realizar 5 entrevistas com enfermeiros de home care
- [ ] Validar as 3 dores principais:
  - [ ] Sobrecarga de WhatsApp pessoal
  - [ ] Falta de rastreabilidade (risco jurídico)
  - [ ] Incapacidade de escalar atendimento
- [ ] Documentar objeções e gatilhos de compra
- [ ] Definir preço que o ICP está disposto a pagar (R$ 197-797/mês)

**Entregável:** Documento de pesquisa com insights validados

---

### ✅ Semana 2: Mapeamento de Protocolos

- [ ] Mapear protocolo: **Pós-Lipoaspiração** (14 dias)
- [ ] Mapear protocolo: **Pós-Cirurgia Bariatrica** (30 dias)
- [ ] Mapear protocolo: **Hipertensão** (acompanhamento contínuo)
- [ ] Mapear protocolo: **Diabetes Tipo 2** (acompanhamento contínuo)
- [ ] Mapear protocolo: **Curativos/Feridas** (Home Care)
- [ ] Documentar:
  - [ ] Fluxo de mensagens (dia/horário)
  - [ ] Perguntas-chave
  - [ ] Critérios de classificação de risco (Verde/Amarelo/Vermelho)
  - [ ] Ações de escalonamento

**Entregável:** 5 protocolos mapeados em formato de fluxograma

---

### ✅ Semana 3: Design UI/UX (Figma)

#### Módulo 1: Office
- [ ] **Dashboard de Risco** (tela principal)
  - [ ] Layout de cards (pacientes ativos, alertas, aderência)
  - [ ] Grid de pacientes com filtro por risco
  - [ ] Painel de alertas críticos
- [ ] **Biblioteca de Protocolos**
  - [ ] Lista de templates
  - [ ] Preview de protocolo
- [ ] **Construtor de Protocolos**
  - [ ] Canvas de drag-and-drop (wireframe)
  - [ ] Biblioteca de nodes
- [ ] **Cadastro de Pacientes**
  - [ ] Formulário simplificado (Nome, Tel, Protocolo)

#### Módulo 2: Agente
- [ ] **Visualizador de Conversa**
  - [ ] Timeline de mensagens
  - [ ] Badges de risco
  - [ ] Área de intervenção manual

#### Módulo 3: Prontuário
- [ ] **Timeline de Eventos**
  - [ ] Histórico conversacional
- [ ] **Relatórios de Aderência**
  - [ ] Gráficos de aderência

**Entregável:** Protótipos de alta fidelidade aprovados no Figma

---

### ✅ Semana 4: Fechamento de Early Adopters

- [ ] Apresentar protótipos para 10 profissionais
- [ ] Fechar 5 early adopters comprometidos
- [ ] Cobrar **Setup Fee** (R$ 500) de cada um
- [ ] Assinar contrato de participação no MVP (Concierge Model)
- [ ] Agendar sessões de co-criação (refinamento de protocolos)

**Entregável:** 5 clientes confirmados + R$ 2.500 em Setup Fees

---

## 📅 MÊS 2: DESENVOLVIMENTO CORE (Dias 31-60)

### ✅ Semana 5: Setup de Infraestrutura + Módulo Office (Parte 1)

#### Setup
- [ ] Criar repositório Git (GitHub/GitLab)
- [ ] Setup de ambiente de desenvolvimento
  - [ ] Frontend: Vite + React + TypeScript
  - [ ] Backend: Node.js + Express + PostgreSQL
- [ ] Configurar CI/CD básico (GitHub Actions)
- [ ] Deploy em staging (AWS/Google Cloud)
- [ ] Configurar domínio (staging.sentiacare.com.br)

#### Módulo 1: Office - Cadastros Básicos
- [ ] **Backend:**
  - [ ] Modelo de dados (User, Patient, Protocol)
  - [ ] API de autenticação (JWT)
  - [ ] CRUD de pacientes
  - [ ] CRUD de protocolos (JSON schema)
- [ ] **Frontend:**
  - [ ] Setup de projeto (Vite + React + TailwindCSS)
  - [ ] Configurar Zustand + React Query
  - [ ] Tela de Login
  - [ ] Tela de Cadastro de Pacientes
  - [ ] Tela de Biblioteca de Protocolos (visualização apenas)

**Entregável:** Cadastro de pacientes funcionando em staging

---

### ✅ Semana 6: Módulo Office (Parte 2) - Construtor de Protocolos

- [ ] **Backend:**
  - [ ] Validador de fluxo de protocolo
  - [ ] API de criação/edição de protocolos
- [ ] **Frontend:**
  - [ ] Integrar React Flow
  - [ ] Implementar 7 tipos de nodes:
    - [ ] Trigger Node
    - [ ] Message Node
    - [ ] Question Node
    - [ ] Decision Node
    - [ ] Alert Node
    - [ ] Wait Node
    - [ ] End Node
  - [ ] Biblioteca de Nodes (drag-and-drop)
  - [ ] Salvar/Carregar protocolo
  - [ ] Preview de protocolo

**Entregável:** Construtor de protocolos funcional (pode criar fluxo simples)

---

### ✅ Semana 7: Módulo Agente (Parte 1) - WhatsApp Integration

- [ ] **Integração WhatsApp Business API:**
  - [ ] Criar conta Business no Meta
  - [ ] Obter número verificado
  - [ ] Configurar webhook
- [ ] **Backend:**
  - [ ] Webhook handler para receber mensagens
  - [ ] Serviço de envio de mensagens (WhatsApp Business API ou Twilio)
  - [ ] Scheduler para disparo automático (Bull Queue)
  - [ ] Modelo de dados (Conversation, Message, Timeline)
- [ ] **Frontend:**
  - [ ] Tela de visualização de conversas (lista)
  - [ ] Visualizador de conversa individual
  - [ ] Componente MessageBubble

**Teste:** Enviar mensagem manual via dashboard e receber resposta do paciente

**Entregável:** Integração WhatsApp funcionando (envio/recebimento)

---

### ✅ Semana 8: Módulo Agente (Parte 2) - GenAI de Triagem

- [ ] **Integração com GenAI:**
  - [ ] Escolher provedor (Google Gemini recomendado)
  - [ ] Obter API key
  - [ ] Implementar serviço de classificação
- [ ] **Backend:**
  - [ ] Endpoint `/agent/classify`
  - [ ] Prompt engineering para triagem
  - [ ] Safety Layer (checklist de palavras críticas)
  - [ ] Classificação em Verde/Amarelo/Vermelho
  - [ ] Extração de sintomas (NLP/NER)
  - [ ] Estruturação de dados (JSON schema)
- [ ] **Frontend:**
  - [ ] Badge de risco na conversa
  - [ ] Exibir dados estruturados
  - [ ] Modal de intervenção manual
- [ ] **Testes:**
  - [ ] Testar classificação com 50 mensagens de exemplo
  - [ ] Meta: 95% de acurácia (validação manual)
  - [ ] Zero false negatives para VERMELHO

**Entregável:** IA classificando risco corretamente em 95% dos casos

---

## 📅 MÊS 3: ITERAÇÃO E GTM (Dias 61-90)

### ✅ Semana 9: Deploy para Early Adopters + Coleta de Feedback

- [ ] **Preparação:**
  - [ ] Criar contas para os 5 early adopters
  - [ ] Importar protocolos mapeados no Mês 1
  - [ ] Onboarding individual (2h por cliente)
  - [ ] Treinamento de uso da plataforma
- [ ] **Deploy:**
  - [ ] Conectar número de WhatsApp de cada profissional
  - [ ] Cadastrar primeiros pacientes (5-10 por cliente)
  - [ ] Ativar protocolos
  - [ ] Monitorar primeiro ciclo completo (14-30 dias)
- [ ] **Suporte:**
  - [ ] Criar grupo de WhatsApp para suporte direto
  - [ ] Responder dúvidas em < 2h
  - [ ] Documentar bugs e problemas

**Entregável:** 5 clientes usando em produção com pelo menos 1 paciente cada

---

### ✅ Semana 10: Iteração Baseada em Feedback

- [ ] **Análise de Feedback:**
  - [ ] Coletar NPS (meta: > 50)
  - [ ] Identificar bugs críticos
  - [ ] Priorizar 3-5 melhorias rápidas
- [ ] **Desenvolvimento:**
  - [ ] Corrigir bugs críticos
  - [ ] Implementar melhorias de UX
  - [ ] Otimizar prompts de IA (se acurácia < 95%)
- [ ] **Módulo 3: Prontuário (Básico)**
  - [ ] **Backend:**
    - [ ] Endpoint de timeline de eventos
    - [ ] Relatório de aderência (% de respostas)
  - [ ] **Frontend:**
    - [ ] Tela de Timeline do Paciente
    - [ ] Dashboard de aderência

**Entregável:** Versão 1.1 com melhorias deployada

---

### ✅ Semana 11: Desenvolvimento do Dashboard de Risco

- [ ] **Backend:**
  - [ ] API de estatísticas (pacientes ativos, alertas, aderência)
  - [ ] Filtro de pacientes por risco
- [ ] **Frontend:**
  - [ ] Dashboard de Risco (tela principal)
  - [ ] Cards de estatísticas
  - [ ] Grid de pacientes (com filtros)
  - [ ] Painel de alertas críticos
  - [ ] Sistema de notificações push

**Entregável:** Dashboard de Risco funcional

---

### ✅ Semana 12: GTM Local (Goiânia/DF) - Escalar para 10 Clientes

- [ ] **Marketing:**
  - [ ] Criar landing page de vendas
  - [ ] Pricing page (3 planos: Essencial/Pro/Enterprise)
  - [ ] Vídeo demo (2-3 min)
  - [ ] Case de sucesso com early adopter
- [ ] **Vendas:**
  - [ ] Prospecção direta (LinkedIn + visitas presenciais)
  - [ ] Apresentação comercial (deck de vendas)
  - [ ] Meta: 10 reuniões → 5 propostas → 3 fechamentos
- [ ] **Operações:**
  - [ ] Onboarding de novos clientes
  - [ ] Setup de integração (se EMR externo)
  - [ ] Treinamento

**Meta de Fechamento:**
- [ ] 10 clientes ativos pagando mensalidade
- [ ] MRR (Receita Recorrente Mensal): R$ 5.000 - R$ 10.000
- [ ] NPS > 50
- [ ] Churn = 0 (nos primeiros 90 dias)

**Entregável:** 10 clientes pagantes + MRR estável

---

## 🎯 Funcionalidades do MVP (Checklist de Features)

### ✅ Módulo 1: Office (CMS)

- [ ] Autenticação (Login/Registro)
- [ ] Dashboard de Risco
  - [ ] Stats cards (pacientes ativos, alertas, aderência)
  - [ ] Grid de pacientes com filtro
  - [ ] Painel de alertas críticos
- [ ] Biblioteca de Protocolos
  - [ ] 5 templates prontos
  - [ ] Visualização de protocolo
- [ ] Construtor de Protocolos
  - [ ] Canvas React Flow
  - [ ] 7 tipos de nodes
  - [ ] Salvar/Editar/Excluir
- [ ] Gestão de Pacientes
  - [ ] Cadastro simplificado
  - [ ] Lista de pacientes
  - [ ] Ativar protocolo para paciente
  - [ ] Visualização de detalhes

### ✅ Módulo 2: Agente (GenAI)

- [ ] Integração WhatsApp Business API
- [ ] Disparo automático de mensagens (scheduler)
- [ ] Recebimento de mensagens (webhook)
- [ ] GenAI de classificação de risco
  - [ ] Verde/Amarelo/Vermelho
  - [ ] Extração de sintomas
  - [ ] Estruturação de dados
- [ ] Safety Layer (palavras críticas)
- [ ] Escalonamento de alertas
  - [ ] Push notification para profissional
  - [ ] SMS (se WhatsApp falhar)
- [ ] Visualizador de Conversa
  - [ ] Timeline de mensagens
  - [ ] Badges de risco
  - [ ] Intervenção manual

### ✅ Módulo 3: Prontuário (Data)

- [ ] Timeline de eventos (histórico conversacional)
- [ ] Relatório de aderência
  - [ ] % de respostas
  - [ ] Tempo médio de resposta
- [ ] Exportação básica (JSON)
- [ ] Logs de acesso (auditoria básica)
- [ ] Criptografia de dados sensíveis

### ✅ Segurança e Compliance

- [ ] HTTPS/TLS
- [ ] Autenticação JWT
- [ ] Criptografia AES-256 (dados em repouso)
- [ ] Termo de consentimento do paciente
- [ ] Política de privacidade (LGPD)
- [ ] Logs de auditoria

---

## 📊 KPIs de Sucesso (90 Dias)

| Métrica | Target | Status |
|---------|--------|--------|
| **Clientes Ativos** | 10 | [ ] |
| **Pacientes Monitorados** | 300 | [ ] |
| **Protocolos Criados** | 50 | [ ] |
| **Mensagens Enviadas/Dia** | 1.000 | [ ] |
| **Acurácia da IA** | 95% | [ ] |
| **Incidentes de Triagem** | 0 críticos | [ ] |
| **MRR** | R$ 5.000 | [ ] |
| **NPS** | > 50 | [ ] |
| **Churn** | < 10% | [ ] |

---

## 🚀 Pós-MVP (Roadmap Ano 1)

### Features para Escala (Após 90 dias)

- [ ] **Integrações com EMRs**
  - [ ] iClinic (OAuth + API)
  - [ ] Ninsaúde (OAuth + API)
- [ ] **Marketplace de Protocolos** (Moat)
  - [ ] Profissionais podem licenciar protocolos
  - [ ] Sistema de comissionamento (30%)
- [ ] **Assinatura Digital ICP-Brasil**
  - [ ] Integração com BirdID/Soluti
- [ ] **Análise Preditiva**
  - [ ] IA prevê risco de churn do paciente
  - [ ] IA sugere intervenções proativas
- [ ] **Multi-canal**
  - [ ] Telegram
  - [ ] SMS (já tem como fallback)
  - [ ] Voz (ligação automatizada)
- [ ] **Mobile App** (Profissional)
  - [ ] React Native
  - [ ] Notificações push nativas

---

## ⚠️ Riscos e Bloqueadores

| Risco | Mitigação | Status |
|-------|-----------|--------|
| **IA errar triagem crítica** | Safety Layer + Validação manual contínua | [ ] |
| **WhatsApp mudar política** | Ter SMS como backup | [ ] |
| **Custo de API GenAI escalar** | Otimizar prompts + Cache | [ ] |
| **Profissional não aderir** | Onboarding hands-on (2h) | [ ] |
| **Paciente não responder** | Melhorar copy das mensagens | [ ] |

---

## 📋 Próximos Passos Imediatos

### Esta Semana:

1. [ ] **Aprovar este plano** com stakeholders
2. [ ] **Montar equipe:**
   - [ ] 1 Full-Stack Dev (Node + React)
   - [ ] 1 Frontend Dev (React + TypeScript)
   - [ ] 1 UI/UX Designer
3. [ ] **Setup inicial:**
   - [ ] Criar repositório Git
   - [ ] Criar conta AWS/GCP
   - [ ] Comprar domínio
4. [ ] **Iniciar Mês 1 - Semana 1:**
   - [ ] Agendar 10 entrevistas com ICP
   - [ ] Preparar roteiro de pesquisa

---

**Última atualização:** 06/12/2025
**Versão:** 1.0 - MVP 90 Dias
**Status:** Pronto para Execução 🚀
