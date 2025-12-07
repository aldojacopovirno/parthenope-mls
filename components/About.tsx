import React, { useEffect, useRef, useState } from 'react';

const About: React.FC = () => {
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
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-white border-b border-gray-100">
      <div 
        className={`max-w-4xl mx-auto px-6 text-center transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="font-serif text-3xl md:text-5xl mb-8">
          "Knowledge begins with a question."
        </h2>
        
        <div className={`h-1 w-20 bg-pmlsRed mx-auto mb-10 transition-all duration-1000 delay-300 ${isVisible ? 'w-20 opacity-100' : 'w-0 opacity-0'}`}></div>

        <p className="text-lg text-gray-700 leading-loose mb-8">
          If you’re driven by curiosity, passion for mathematics, or the desire to explore and build, you’re in the right place. 
          <span className="font-bold"> Parthenope Machine Learning Society</span> is a space where students connect, collaborate, and turn ideas into real research projects.
        </p>

        <p className="text-lg text-gray-700 leading-loose">
          We explore <span className="text-pmlsRed font-medium">Machine Learning</span> through hands-on challenges and experiments, 
          and become part of a community shaping the future of technology. We connect curious minds, support research projects, 
          and make Machine Learning more accessible through advocacy, collaboration, and hands-on work.
        </p>
      </div>
    </section>
  );
};

export default About;