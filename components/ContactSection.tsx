import React, { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, ExternalLink } from 'lucide-react';

const ContactSection: React.FC = () => {
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
    <section id="contact" ref={sectionRef} className="py-24 bg-pmlsBlack text-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gray-800 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        <div className={`transition-all duration-1000 delay-100 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          <h2 className="font-serif text-4xl mb-6">Make Your Mark.</h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Parthenope Machine Learning Society is now open for new members. 
            Fill out the form, tell us about your skills, interests, and goals, and start shaping the future of knowledge with us.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-gray-800 p-3 rounded-full text-pmlsRed">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider mb-1">Get in Touch</h4>
                <a href="mailto:parthenope.ml.society@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                  parthenope.ml.society@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-gray-800 p-3 rounded-full text-pmlsRed">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider mb-1">Location</h4>
                <p className="text-gray-300">
                  Naples, Italy
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={`bg-white text-pmlsBlack p-8 rounded-none md:rounded-lg shadow-2xl transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="font-serif text-2xl mb-6">Join Application</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">First Name</label>
                <input type="text" className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-pmlsRed transition-colors bg-transparent" placeholder="Jane" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Last Name</label>
                <input type="text" className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-pmlsRed transition-colors bg-transparent" placeholder="Doe" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Email</label>
              <input type="email" className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-pmlsRed transition-colors bg-transparent" placeholder="jane.doe@email.com" />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Interest Area</label>
              <select className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-pmlsRed transition-colors bg-transparent text-gray-700">
                <option>Deep Learning</option>
                <option>Computer Vision</option>
                <option>NLP</option>
                <option>Reinforcement Learning</option>
                <option>Statistics / Math</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Why do you want to join?</label>
              <textarea rows={3} className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-pmlsRed transition-colors bg-transparent resize-none" placeholder="Tell us briefly about yourself..."></textarea>
            </div>

            <button className="w-full bg-pmlsRed text-white font-bold py-4 mt-4 hover:bg-red-700 transition-colors flex justify-center items-center gap-2">
              Submit Application
              <ExternalLink size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;