import React, { useState, useEffect } from 'react';
import { View, BlogPost } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import BlogSection from './components/BlogSection.tsx';
import TeamSection from './components/TeamSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BlogPostDetail from './components/BlogPostDetail';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';

const App: React.FC = () => {
  const [currentView, setView] = useState<View>(View.HOME);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState<boolean>(false);
  const [showTermsOfService, setShowTermsOfService] = useState<boolean>(false);

  // Handle scroll spy to update header active state
  useEffect(() => {
    // Disable scroll spy if we are viewing a specific blog post, privacy policy, or terms of service
    if (selectedPost || showPrivacyPolicy || showTermsOfService) {
      setView(View.BLOG); // Keep blog active or maybe none
      return;
    }

    const sections = [
      { id: 'home', view: View.HOME },
      { id: 'about', view: View.HOME }, // Consider About part of Home or separate? Usually home flow.
      { id: 'blog', view: View.BLOG },
      { id: 'team', view: View.TEAM },
      { id: 'contact', view: View.CONTACT },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const matched = sections.find((s) => s.id === entry.target.id);
            if (matched) {
              setView(matched.view);
            }
          }
        });
      },
      {
        rootMargin: '-40% 0px -40% 0px', // Trigger when section is in the middle of viewport
        threshold: 0,
      }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [selectedPost, showPrivacyPolicy, showTermsOfService]);

  const handleNavigate = (view: View, id: string) => {
    // If we are in a post, privacy policy, or terms of service, go back to main view first
    if (selectedPost || showPrivacyPolicy || showTermsOfService) {
      setSelectedPost(null);
      setShowPrivacyPolicy(false);
      setShowTermsOfService(false);
      // Wait for render cycle to restore sections, then scroll
      setTimeout(() => {
        setView(view);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      setView(view);
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setShowPrivacyPolicy(false);
    setShowTermsOfService(false);
  };

  const handlePrivacyClick = () => {
    setShowPrivacyPolicy(true);
    setSelectedPost(null);
    setShowTermsOfService(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTermsClick = () => {
    setShowTermsOfService(true);
    setSelectedPost(null);
    setShowPrivacyPolicy(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header currentView={currentView} onNavigate={handleNavigate} />

      <main>
        {showTermsOfService ? (
          <TermsOfService onBack={() => setShowTermsOfService(false)} />
        ) : showPrivacyPolicy ? (
          <PrivacyPolicy onBack={() => setShowPrivacyPolicy(false)} />
        ) : selectedPost ? (
          <BlogPostDetail post={selectedPost} onBack={() => setSelectedPost(null)} />
        ) : (
          <>
            <Hero onJoinClick={() => handleNavigate(View.CONTACT, 'contact')} />
            <About />
            <BlogSection onPostClick={handlePostClick} />
            <TeamSection />
            <ContactSection />
          </>
        )}
      </main>

      <Footer onPrivacyClick={handlePrivacyClick} onTermsClick={handleTermsClick} />
    </div>
  );
};

export default App;