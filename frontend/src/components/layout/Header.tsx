import { useState, useEffect } from 'react';
import { Menu, X, Activity } from 'lucide-react';
import { Button } from '../common/Button';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-300/50">
            <Activity className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-slate-800 tracking-tight leading-none">
              Sentia<span className="text-primary-600">Care</span>
            </span>
            <span className="text-[0.65rem] uppercase tracking-widest text-slate-400 font-semibold">
              Inteligência IA
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('solucao')}
            className="text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors"
          >
            Solução
          </button>
          <button
            onClick={() => scrollToSection('como-funciona')}
            className="text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors"
          >
            Como Funciona
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className="text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors"
          >
            Planos
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors"
          >
            FAQ
          </button>

          <Button size="sm">
            Começar Grátis
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl py-4 px-4 flex flex-col gap-4">
          <button
            onClick={() => scrollToSection('solucao')}
            className="text-left text-slate-600 py-2 hover:text-primary-600 transition-colors"
          >
            Solução
          </button>
          <button
            onClick={() => scrollToSection('como-funciona')}
            className="text-left text-slate-600 py-2 hover:text-primary-600 transition-colors"
          >
            Como Funciona
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className="text-left text-slate-600 py-2 hover:text-primary-600 transition-colors"
          >
            Planos
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="text-left text-slate-600 py-2 hover:text-primary-600 transition-colors"
          >
            FAQ
          </button>
          <Button className="w-full">
            Começar Grátis
          </Button>
        </div>
      )}
    </nav>
  );
}
