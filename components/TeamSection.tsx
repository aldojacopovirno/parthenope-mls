import React, { useEffect, useRef, useState } from 'react';
import { TeamMember } from '../types';
import { Linkedin, Github } from 'lucide-react';

const TEAM: TeamMember[] = [
  {
    id: 1,
    name: "Dr. Antonio Esposito",
    role: "Faculty Advisor",
    bio: "Professor of Computer Science specializing in Neural Networks.",
    imageUrl: "https://picsum.photos/400/400?random=10"
  },
  {
    id: 2,
    name: "Sofia Romano",
    role: "President",
    bio: "MSc Student in Data Science. Passionate about CV.",
    imageUrl: "https://picsum.photos/400/400?random=11"
  },
  {
    id: 3,
    name: "Luca De Santis",
    role: "Head of Research",
    bio: "PhD Candidate focusing on Bayesian Methods.",
    imageUrl: "https://picsum.photos/400/400?random=12"
  },
  {
    id: 4,
    name: "Chiara Moretti",
    role: "Outreach Lead",
    bio: "Undergrad in Statistics. Loves making ML accessible.",
    imageUrl: "https://picsum.photos/400/400?random=13"
  }
];

const TeamSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="team" ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="font-serif text-4xl mb-4">Our Team</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            The students and researchers behind PMLS.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM.map((member, index) => (
            <div 
              key={member.id} 
              className={`text-center group transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-pmlsRed transition-colors duration-300">
                <img 
                  src={member.imageUrl} 
                  alt={member.name} 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-pmlsRed text-sm font-medium uppercase tracking-widest mb-3">{member.role}</p>
              <p className="text-gray-500 text-sm mb-4 px-4">{member.bio}</p>
              <div className="flex justify-center gap-4 text-gray-400">
                <a href="#" className="hover:text-pmlsBlack transition-colors"><Linkedin size={18} /></a>
                <a href="#" className="hover:text-pmlsBlack transition-colors"><Github size={18} /></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;