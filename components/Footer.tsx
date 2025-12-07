import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';

// Custom TikTok icon since it's not always standard in all libraries
const TikTokIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        
        <div className="mb-8 text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight mb-2">PMLS</h2>
          <p className="text-gray-500 text-sm tracking-widest uppercase">Parthenope Machine Learning Society</p>
        </div>

        <div className="flex gap-8 mb-8">
            <a href="https://www.instagram.com/parthenope_mls/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pmlsRed transition-colors"><Instagram /></a>
            <a href="https://www.linkedin.com/company/parthenope-machine-learning-society" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pmlsRed transition-colors"><Linkedin /></a>
            <a href="https://www.tiktok.com/@parthenope_mls" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pmlsRed transition-colors"><TikTokIcon /></a>
        </div>

        <div className="w-full h-px bg-gray-100 mb-6"></div>

        <div className="flex flex-col md:flex-row justify-between w-full text-xs text-gray-400">
            <p>&copy; 2025 Parthenope Machine Learning Society. All rights reserved.</p>
            <div className="flex gap-4 mt-2 md:mt-0">
                <a href="#" className="hover:text-pmlsBlack">Privacy Policy</a>
                <a href="#" className="hover:text-pmlsBlack">Terms of Service</a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;