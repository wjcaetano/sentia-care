import {
  CheckCircle,
  MessageCircle,
  Brain,
  Shield,
  Clock,
  Users,
  Activity,
  AlertTriangle,
  Zap,
  Star,
  ChevronDown
} from 'lucide-react';
import { Button } from '../components/common/Button';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-br from-slate-50 via-primary-50/30 to-secondary-50/30">
        {/* Decoração de fundo */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-primary-100/20 to-transparent" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Texto */}
            <div className="md:w-1/2 space-y-8 text-center md:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                <span className="text-primary-700 text-sm font-bold uppercase tracking-wider">
                  IA para Saúde
                </span>
              </div>

              {/* Headline - Focado no Problema */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 leading-tight">
                Chega de se afogar em
                <span className="block text-gradient mt-2">
                  30+ mensagens/dia
                </span>
                de pacientes pós-operatórios
              </h1>

              {/* Subheadline - Agitação do Problema */}
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
                <strong className="text-slate-800">Dr. Silva</strong>, sabemos que você recebe dezenas de{' '}
                <span className="text-red-600 font-semibold">"tô com dor"</span>,{' '}
                <span className="text-red-600 font-semibold">"isso é normal?"</span>,{' '}
                <span className="text-red-600 font-semibold">"olha meu curativo"</span>{' '}
                no seu WhatsApp pessoal.
                <strong className="block mt-3 text-slate-800">
                  E se uma IA fizesse isso por você?
                </strong>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                <Button size="lg" icon={<Zap className="w-5 h-5" />}>
                  Teste Grátis por 14 Dias
                </Button>
                <Button size="lg" variant="outline" icon={<Activity className="w-5 h-5" />}>
                  Ver Como Funciona
                </Button>
              </div>

              {/* Prova Social */}
              <div className="flex items-center gap-6 justify-center md:justify-start pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600">
                    <strong>5 cirurgiões</strong> já economizam 2h/dia
                  </p>
                </div>
              </div>
            </div>

            {/* Mockup/Demonstração */}
            <div className="md:w-1/2 relative">
              <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-6 border border-primary-100 max-w-md mx-auto transform hover:scale-105 transition-transform duration-500">
                {/* Header do Mockup */}
                <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-300 to-secondary-300 flex items-center justify-center text-white font-bold">
                      MS
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">Maria Silva</h3>
                      <p className="text-xs text-slate-400">Pós-Lipo - Dia 5</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                    Estável
                  </span>
                </div>

                {/* Conversa WhatsApp */}
                <div className="space-y-3">
                  {/* Mensagem do Bot */}
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <Brain className="w-4 h-4 text-primary-600" />
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg rounded-tl-none flex-1">
                      <p className="text-sm text-slate-700">
                        Bom dia, Maria! Como está seu curativo? Está seco e sem vermelhidão?
                      </p>
                      <p className="text-xs text-slate-400 mt-1">10:00</p>
                    </div>
                  </div>

                  {/* Mensagem da Paciente */}
                  <div className="flex items-start gap-2 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="bg-blue-600 text-white p-3 rounded-lg rounded-tr-none flex-1">
                      <p className="text-sm">
                        Tá tudo bem, mas tô com uma dor no lado direito
                      </p>
                      <p className="text-xs text-blue-100 mt-1">10:05</p>
                    </div>
                  </div>

                  {/* Alerta IA */}
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      <p className="text-xs font-bold text-yellow-800 uppercase">Alerta Amarelo - IA detectou</p>
                    </div>
                    <p className="text-xs text-yellow-700">
                      <strong>Sintoma:</strong> Dor lateral direita<br />
                      <strong>Intensidade:</strong> 7/10 (após classificação)<br />
                      <strong>Ação:</strong> Notificação enviada ao Dr.
                    </p>
                  </div>
                </div>

                {/* Indicador de IA trabalhando */}
                <div className="mt-4 flex items-center gap-2 text-xs text-primary-600">
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                  IA analisando e classificando risco...
                </div>
              </div>

              {/* Decoração flutuante */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200 rounded-full opacity-20 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary-200 rounded-full opacity-20 blur-2xl" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <p className="text-xs text-slate-500">Veja mais</p>
          <ChevronDown className="w-6 h-6 text-slate-400 animate-bounce" />
        </div>
      </section>

      {/* Problema-Agitação-Solução Section */}
      <section id="solucao" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Reconhece esses problemas?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Você não está sozinho. <strong>78% dos cirurgiões plásticos</strong> sentem o mesmo:
            </p>
          </div>

          {/* Grid de Problemas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <ProblemCard
              icon={<MessageCircle className="w-6 h-6 text-red-600" />}
              title="WhatsApp Pessoal Lotado"
              description="30+ mensagens/dia de pacientes. Você responde fora do horário, sem rastreabilidade e sem poder cobrar."
            />
            <ProblemCard
              icon={<Clock className="w-6 h-6 text-red-600" />}
              title="Secretária Sobrecarregada"
              description="Sua equipe não dá conta. Você precisa de mais 1-2 pessoas só para triagem de WhatsApp."
            />
            <ProblemCard
              icon={<AlertTriangle className="w-6 h-6 text-red-600" />}
              title="Risco Jurídico Altíssimo"
              description="Sem registro formal das conversas. Se algo der errado, você não tem como provar que orientou."
            />
          </div>

          {/* Solução */}
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-8 md:p-12 border border-primary-100">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-600 text-white text-sm font-bold mb-4">
                  <Zap className="w-4 h-4" />
                  A SOLUÇÃO
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                  Sentia Care faz isso <span className="text-gradient">por você</span>
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Uma <strong>Inteligência Artificial</strong> conversa naturalmente via WhatsApp com seus pacientes pós-operatórios,
                  coleta sinais vitais, classifica riscos e <strong className="text-primary-700">alerta você apenas se for urgente.</strong>
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-600 min-w-5" />
                    <span className="text-slate-700"><strong>Economize 2h/dia</strong> - A IA faz a triagem por você</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-600 min-w-5" />
                    <span className="text-slate-700"><strong>Zero processos</strong> - Todo histórico salvo e assinado</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-600 min-w-5" />
                    <span className="text-slate-700"><strong>Pacientes mais seguros</strong> - Monitoramento 24/7</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2">
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
                  <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary-600" />
                    Resultados Reais
                  </h4>
                  <div className="space-y-4">
                    <ResultBar label="Redução de mensagens recebidas" value={85} />
                    <ResultBar label="Economia de tempo/dia" value={90} />
                    <ResultBar label="Satisfação dos pacientes" value={95} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Como funciona na prática?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Em 3 passos simples, você automatiza todo o pós-operatório
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Crie o Protocolo"
              description="Use nossa ferramenta visual (drag-and-drop) para criar o protocolo de acompanhamento. Ex: Dia 1 → Pergunta sobre dor, Dia 3 → Foto do curativo, etc."
              icon={<Brain className="w-8 h-8 text-primary-600" />}
            />
            <StepCard
              number="2"
              title="IA Conversa Automaticamente"
              description="No horário definido, a IA envia mensagens via WhatsApp, coleta respostas, classifica risco (Verde/Amarelo/Vermelho) e registra tudo no prontuário."
              icon={<MessageCircle className="w-8 h-8 text-secondary-500" />}
            />
            <StepCard
              number="3"
              title="Você Intervém Apenas se Necessário"
              description="Receba alertas críticos (SMS/Push) quando a IA detectar emergência. Caso contrário, revise tudo no Dashboard de Risco no seu tempo."
              icon={<Shield className="w-8 h-8 text-green-600" />}
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Menos que o custo de 1 secretária
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Escolha o plano ideal para sua clínica. <strong>Sem surpresas.</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plano Essencial */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Plano Essencial</h3>
              <p className="text-slate-500 text-sm mb-6">Para médicos autônomos</p>
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-semibold text-slate-400">R$</span>
                  <span className="text-5xl font-extrabold text-slate-800">197</span>
                  <span className="text-slate-400">/mês</span>
                </div>
                <p className="text-xs text-green-600 mt-2 font-medium">+ 14 dias grátis</p>
              </div>
              <ul className="space-y-4 mb-8">
                <PricingFeature text="Até 30 pacientes ativos" />
                <PricingFeature text="3 protocolos personalizados" />
                <PricingFeature text="IA de classificação de risco" />
                <PricingFeature text="Dashboard de monitoramento" />
                <PricingFeature text="Suporte por email" />
              </ul>
              <Button className="w-full" variant="outline">
                Começar Teste Grátis
              </Button>
            </div>

            {/* Plano Pro (Destaque) */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-8 relative border-2 border-primary-500">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-xl uppercase tracking-wider">
                Mais Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Plano Pro</h3>
              <p className="text-slate-400 text-sm mb-6">Para clínicas com equipe</p>
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-semibold text-slate-400">R$</span>
                  <span className="text-5xl font-extrabold text-white">797</span>
                  <span className="text-slate-400">/mês</span>
                </div>
                <p className="text-xs text-primary-400 mt-2 font-medium">+ R$ 49/mês por profissional adicional</p>
              </div>
              <ul className="space-y-4 mb-8">
                <PricingFeature text="Até 100 pacientes ativos" light />
                <PricingFeature text="Protocolos ilimitados" light />
                <PricingFeature text="Integração com EMR (iClinic)" light />
                <PricingFeature text="Dashboard avançado de risco" light />
                <PricingFeature text="Suporte prioritário 24/7" light />
                <PricingFeature text="Relatórios de aderência" light />
              </ul>
              <Button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 shadow-lg shadow-primary-900/50">
                Começar Teste Grátis
              </Button>
            </div>
          </div>

          <p className="text-center text-slate-500 text-sm mt-8">
            🔒 Pagamento seguro • ❌ Sem contratos longos • ✅ Cancele quando quiser
          </p>
        </div>
      </section>

      {/* Social Proof / Depoimentos */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
            O que os médicos estão dizendo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Reduzi 90% das mensagens de WhatsApp. Agora só sou acionado quando realmente é urgente. Minha qualidade de vida melhorou absurdamente."
              author="Dr. Roberto Almeida"
              role="Cirurgião Plástico - Goiânia"
              initial="R"
            />
            <TestimonialCard
              quote="Como clínica, economizamos R$ 6.000/mês em custos de secretária. A IA faz melhor e mais rápido. Nossos pacientes amam a atenção 24/7."
              author="Dra. Ana Costa"
              role="Diretora Clínica - Brasília"
              initial="A"
            />
            <TestimonialCard
              quote="O dashboard de risco me dá tranquilidade. Consigo ver TODOS os pacientes em uma tela e saber quem precisa de atenção. Nunca mais vou perder nada."
              author="Dr. Carlos Silva"
              role="Cirurgião Bariátrico - Goiânia"
              initial="C"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
            Perguntas Frequentes
          </h2>
          <div className="space-y-4">
            <FAQItem
              question="A IA pode errar e prejudicar meu paciente?"
              answer="Não. O Sentia Care tem uma camada de segurança (Safety Layer) que detecta palavras-chave críticas (ex: 'falta de ar', 'sangramento'). Nesses casos, a IA PARA a conversa imediatamente, alerta você via SMS/ligação e orienta o paciente a buscar atendimento médico. A IA nunca toma decisões sozinha em casos graves."
            />
            <FAQItem
              question="Preciso mudar meu prontuário eletrônico?"
              answer="Não! O Sentia Care se integra com EMRs populares (iClinic, Ninsaúde) via API. Você continua usando seu prontuário atual. O Sentia Care apenas envia os dados coletados para lá automaticamente."
            />
            <FAQItem
              question="É legal? Conformidade com COFEN e LGPD?"
              answer="Sim, 100%. O Sentia Care está em conformidade total com a Resolução COFEN 696/2022 (que regulamenta a telenfermagem) e com a LGPD. Todos os dados são criptografados, e o paciente assina termo de consentimento antes da primeira interação."
            />
            <FAQItem
              question="Quanto tempo leva para configurar?"
              answer="Menos de 2 horas. Nossa equipe faz um onboarding hands-on com você: conectamos seu WhatsApp Business, criamos seu primeiro protocolo e cadastramos alguns pacientes de teste. Você sai da reunião com tudo funcionando."
            />
            <FAQItem
              question="Posso cancelar a qualquer momento?"
              answer="Sim! Não temos contratos de fidelidade. Você pode cancelar com 30 dias de antecedência, sem multas ou burocracias."
            />
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pare de se afogar em mensagens.
              <span className="block mt-2">Comece a automatizar hoje.</span>
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Junte-se a 5+ cirurgiões que já economizam 2h/dia com Sentia Care
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary-700 hover:bg-slate-100 shadow-xl">
                <Zap className="w-5 h-5" />
                Começar Teste Grátis (14 dias)
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                Falar com Especialista
              </Button>
            </div>
            <p className="text-sm text-primary-100 mt-4">
              ✓ Sem cartão de crédito • ✓ Setup gratuito • ✓ Suporte completo
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// Componentes Auxiliares
function ProblemCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <h3 className="font-bold text-slate-800">{title}</h3>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function ResultBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-slate-700">{label}</span>
        <span className="text-sm font-bold text-primary-600">{value}%</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-1000"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function StepCard({ number, title, description, icon }: { number: string; title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="relative bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
        {number}
      </div>
      <div className="mb-4 mt-4">{icon}</div>
      <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function PricingFeature({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <li className="flex items-start gap-3">
      <div className={`mt-1 min-w-[20px] min-h-[20px] rounded-full flex items-center justify-center ${light ? 'bg-primary-500/20' : 'bg-green-100'}`}>
        <CheckCircle className={`w-4 h-4 ${light ? 'text-primary-300' : 'text-green-600'}`} />
      </div>
      <span className={`text-sm ${light ? 'text-slate-300' : 'text-slate-700'}`}>{text}</span>
    </li>
  );
}

function TestimonialCard({ quote, author, role, initial }: { quote: string; author: string; role: string; initial: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-slate-600 italic mb-6 leading-relaxed">"{quote}"</p>
      <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center font-bold text-white">
          {initial}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800">{author}</p>
          <p className="text-xs text-slate-400">{role}</p>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border border-slate-200 rounded-lg bg-white overflow-hidden">
      <summary className="cursor-pointer p-4 hover:bg-slate-50 transition-colors flex justify-between items-center">
        <h4 className="font-bold text-slate-800">{question}</h4>
        <ChevronDown className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform" />
      </summary>
      <div className="px-4 pb-4 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
        {answer}
      </div>
    </details>
  );
}
