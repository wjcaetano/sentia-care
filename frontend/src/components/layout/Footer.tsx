import { Activity, Heart, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <Activity className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white">SentiaCare</span>
            </div>
            <p className="text-slate-400 max-w-sm text-sm leading-relaxed mb-4">
              Transformando o acompanhamento pós-operatório com Inteligência Artificial.
              Automação via WhatsApp que economiza tempo e salva vidas.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-400" />
                <span>Goiânia, GO - Brasil</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-400" />
                <a href="mailto:contato@sentiacare.com.br" className="hover:text-primary-400 transition-colors">
                  contato@sentiacare.com.br
                </a>
              </div>
            </div>
          </div>

          {/* Plataforma */}
          <div>
            <h4 className="text-white font-semibold mb-4">Plataforma</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#como-funciona" className="hover:text-primary-400 transition-colors">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-primary-400 transition-colors">
                  Planos
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-primary-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  Segurança (LGPD)
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  LGPD
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">
                  Conformidade COFEN
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {currentYear} Sentia AI. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Desenvolvido com <Heart className="w-3 h-3 text-red-500 fill-red-500" /> para a Saúde
          </p>
        </div>
      </div>
    </footer>
  );
}
