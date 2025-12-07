import React, { useEffect } from 'react';
import { BlogPost } from '../types';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';

interface BlogPostDetailProps {
  post: BlogPost;
  onBack: () => void;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post, onBack }) => {
  // Handle Side Effects: Scroll to top and Update SEO Metadata
  useEffect(() => {
    // 1. Scroll to top
    window.scrollTo(0, 0);

    // 2. SEO - Update Title and Meta Description
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute('content') || '';

    // Update Title
    document.title = `${post.title} | PMLS`;

    // Update Description
    if (metaDescription) {
      metaDescription.setAttribute('content', post.excerpt);
    } else {
      // Create if it doesn't exist (though index.html should have it)
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = post.excerpt;
      document.head.appendChild(meta);
    }

    // Cleanup: Restore original title and description when unmounting (going back)
    return () => {
      document.title = previousTitle;
      const metaToReset = document.querySelector('meta[name="description"]');
      if (metaToReset) {
        metaToReset.setAttribute('content', previousDescription);
      }
    };
  }, [post]);

  return (
    <article className="min-h-screen bg-white pt-24 pb-20 animate-fade-in">
      {/* Header Image */}
      <div className="w-full h-64 md:h-96 relative mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
            {/* Optional: Put title here for a hero effect, but currently sticking to content flow */}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-500 hover:text-pmlsRed transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </button>

        <div className="mb-8 border-b border-gray-100 pb-8">
            <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-red-50 text-pmlsRed text-xs font-bold uppercase tracking-wider rounded-full">
                        {tag}
                    </span>
                ))}
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl text-pmlsBlack mb-6 leading-tight">
                {post.title}
            </h1>

            <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{post.date}</span>
                </div>
            </div>
        </div>

        <div 
            className="prose prose-lg prose-red max-w-none font-serif text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt}</p>` }}
        >
            {/* Content rendered from HTML */}
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-100">
             <h3 className="text-xl font-bold mb-4">Share this article</h3>
             <div className="flex gap-4">
                 {/* Social share placeholders */}
                 <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-pmlsRed hover:text-white transition-colors">
                     <Tag size={16} />
                 </button>
             </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPostDetail;