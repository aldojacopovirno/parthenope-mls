import React from 'react';
import { ArrowRight, BrainCircuit } from 'lucide-react';

interface HeroProps {
  onJoinClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onJoinClick }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-20 right-0 w-1/3 h-full bg-gray-50 -z-10 skew-x-12 opacity-50"></div>
      <div className="absolute top-40 left-10 w-24 h-24 border border-pmlsRed rounded-full opacity-20 -z-10"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-gray-100 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-pmlsRed text-xs font-bold tracking-widest uppercase">
            <BrainCircuit size={14} />
            Est. 2025
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl leading-tight text-pmlsBlack">
            Connecting <span className="italic text-gray-600">curious minds</span>.
            <br />
            Driving <span className="text-pmlsRed">research</span>.
            <br />
            Exploring the <span className="italic">future</span>.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed font-light">
            We believe curiosity fuels innovation. Parthenope Machine Learning Society is a space where mathematics, statistics, and technology converge.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={onJoinClick}
              className="bg-pmlsRed text-white px-8 py-3 rounded-none hover:bg-red-700 transition-all duration-300 font-medium flex items-center justify-center gap-2 group shadow-lg shadow-red-200"
            >
              Join the Society
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="relative hidden md:flex justify-center items-center">
             {/* Decorative Math Integral SVG representing the poster vibe */}
             <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
                <path d="M70,150 C50,150 50,130 50,110 L50,90 C50,50 90,50 90,30" stroke="black" strokeWidth="4" fill="none" />
                <path d="M120,50 C140,50 140,70 140,90 L140,110 C140,150 100,150 100,170" stroke="black" strokeWidth="4" fill="none" />
                <text x="75" y="110" fontFamily="serif" fontSize="40" fontStyle="italic">e</text>
                <text x="95" y="90" fontFamily="serif" fontSize="20" fontStyle="italic">-x²</text>
                <text x="135" y="110" fontFamily="serif" fontSize="40" fontStyle="italic">dx</text>
                <circle cx="100" cy="100" r="90" stroke="#ff3131" strokeWidth="1" fill="none" strokeDasharray="10,5" />
            </svg>
            <div className="absolute -bottom-10 -right-10 bg-white p-6 shadow-xl border-l-4 border-pmlsRed max-w-xs">
              <p className="font-serif italic text-lg text-gray-800">"Can You Solve It?"</p>
              <p className="text-xs text-gray-500 mt-2">Join us to solve the challenges of tomorrow.</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;