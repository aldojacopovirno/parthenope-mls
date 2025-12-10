import React, { useEffect, useRef, useState } from 'react';
import { TeamMember } from '../types';
import { Linkedin, Github } from 'lucide-react';

const TEAM: TeamMember[] = [
  {
    id: 1,
    name: "Aldo Jacopo Virno",
    role: "President",
    bio: "Ex Founder & CTO @GreenWall Research.",
    imageUrl: `${import.meta.env.BASE_URL}images/member1.jpg`,
    linkedinUrl: "https://linkedin.com/in/aldo-jacopo-virno",
    githubUrl: "https://github.com/aldojacopovirno"
  },
  {
    id: 2,
    name: "Andrea Bucchignani",
    role: "Chief Scientific Officer",
    bio: "Former Researcher @Napoli Fintech Lab.",
    imageUrl: `${import.meta.env.BASE_URL}images/member2.jpg`,
    linkedinUrl: "https://linkedin.com/in/andrea-bucchignani-a4442b2b2",
    githubUrl: "https://github.com"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
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
                {member.linkedinUrl && (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pmlsBlack transition-colors"
                    aria-label={`${member.name} LinkedIn profile`}
                  >
                    <Linkedin size={18} />
                  </a>
                )}
                {member.githubUrl && (
                  <a
                    href={member.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pmlsBlack transition-colors"
                    aria-label={`${member.name} GitHub profile`}
                  >
                    <Github size={18} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;