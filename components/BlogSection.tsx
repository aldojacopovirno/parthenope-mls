import React, { useEffect, useRef, useState } from 'react';
import { BlogPost } from '../types';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { llmMechanicsPost } from '../blog-posts/llm-mechanics';
import { attentionMechanismPost } from '../blog-posts/attention-mechanism';
import { reinforcementLearningPost } from '../blog-posts/reinforcement-learning';

// Array of all blog posts - sorted chronologically (newest to oldest)
const BLOG_POSTS: BlogPost[] = [
  attentionMechanismPost,
  reinforcementLearningPost,
  llmMechanicsPost,
];

interface BlogSectionProps {
  onPostClick: (post: BlogPost) => void;
}

const BlogSection: React.FC<BlogSectionProps> = ({ onPostClick }) => {
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
    <section id="blog" ref={sectionRef} className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="font-serif text-4xl mb-4">Our Blog</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Deep dives into machine learning, AI research, and the technical details that matter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, index) => (
            <div
              key={post.id}
              className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => onPostClick(post)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-red-50 text-pmlsRed text-xs font-bold uppercase tracking-wider rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-serif text-xl mb-3 text-pmlsBlack line-clamp-2 hover:text-pmlsRed transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span className="line-clamp-1">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{post.date}</span>
                  </div>
                </div>

                <div className="flex items-center text-pmlsRed font-semibold text-sm group">
                  Read more
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
