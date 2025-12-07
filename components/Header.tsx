import React, { useState } from 'react';
import { View } from '../types';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentView: View;
  onNavigate: (view: View, id: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', value: View.HOME, id: 'home' },
    { label: 'Research & Blog', value: View.BLOG, id: 'blog' },
    { label: 'Team', value: View.TEAM, id: 'team' },
    { label: 'Join Us', value: View.CONTACT, id: 'contact' },
  ];

  const handleNavClick = (view: View, id: string) => {
    setIsMenuOpen(false);
    onNavigate(view, id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          className="cursor-pointer flex items-center gap-2 group"
          onClick={() => handleNavClick(View.HOME, 'home')}
        >
          <div className="font-serif text-3xl font-bold tracking-tight group-hover:text-pmlsRed transition-colors duration-300">
            PMLS
          </div>
          <div className="hidden md:block h-6 w-px bg-gray-300 mx-2"></div>
          <span className="hidden md:block text-xs uppercase tracking-widest text-gray-500">
            Parthenope Machine Learning Society
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleNavClick(item.value, item.id)}
              className={`text-sm font-medium tracking-wide transition-all duration-300 relative group ${
                currentView === item.value ? 'text-pmlsRed' : 'text-pmlsBlack hover:text-pmlsRed'
              }`}
            >
              {item.label}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-pmlsRed transition-all duration-300 group-hover:w-full ${currentView === item.value ? 'w-full' : ''}`}></span>
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-pmlsBlack focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 py-6 px-6 flex flex-col gap-4 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleNavClick(item.value, item.id)}
              className={`text-left text-lg font-medium py-2 ${
                currentView === item.value ? 'text-pmlsRed' : 'text-pmlsBlack'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;