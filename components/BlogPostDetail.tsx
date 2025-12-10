import React, { useEffect } from 'react';
import { BlogPost } from '../types';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import '../styles/blog-post.css';

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
    <article className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24 pb-20 animate-fade-in">
      {/* Header Image */}
      <div className="w-full h-72 md:h-[28rem] relative mb-12 overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent z-10"></div>
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-pmlsRed transition-all duration-300 mb-10 group font-medium"
        >
          <ArrowLeft size={22} className="mr-2 group-hover:-translate-x-2 transition-transform duration-300" />
          Back to Blog
        </button>

        {/* Article Header */}
        <header className="mb-12 pb-10 border-b-2 border-gray-200">
            <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map(tag => (
                    <span key={tag} className="px-4 py-1.5 bg-gradient-to-r from-red-50 to-red-100 text-pmlsRed text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                        {tag}
                    </span>
                ))}
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-pmlsBlack mb-8 leading-tight font-bold">
                {post.title}
            </h1>

            <div className="flex items-center gap-8 text-base text-gray-600">
                <div className="flex items-center gap-2">
                    <User size={18} className="text-pmlsRed" />
                    <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-pmlsRed" />
                    <span>{post.date}</span>
                </div>
            </div>
        </header>

        {/* Article Content */}
        <div
            className="blog-post-content mb-16"
            dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt}</p>` }}
        >
            {/* Content rendered from HTML */}
        </div>

        {/* Article Footer */}
        <footer className="mt-20 pt-10 border-t-2 border-gray-200">
             <h3 className="text-2xl font-bold mb-6 text-pmlsBlack">Share this article</h3>
             <div className="flex gap-4">
                 <button
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center hover:from-pmlsRed hover:to-red-700 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110"
                    aria-label="Share"
                 >
                     <Tag size={18} />
                 </button>
             </div>
        </footer>
      </div>
    </article>
  );
};

export default BlogPostDetail;