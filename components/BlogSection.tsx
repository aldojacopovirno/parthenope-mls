import React, { useEffect, useRef, useState } from 'react';
import { BlogPost } from '../types';

const SAMPLE_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Understanding Attention Mechanisms",
    excerpt: "A deep dive into how Transformers changed the NLP landscape forever, explaining the math behind Self-Attention.",
    content: `
      <p>The introduction of the Transformer model in "Attention Is All You Need" marked a turning point in Natural Language Processing. Before Transformers, Recurrent Neural Networks (RNNs) and LSTMs were the standard for sequence modeling. However, they suffered from the vanishing gradient problem and struggled with long-range dependencies.</p>
      <h3>The Core Idea</h3>
      <p>Attention mechanisms allow the model to weigh the importance of different words in a sentence when encoding a specific word. Instead of processing tokens sequentially, Transformers process them in parallel, using <strong>Self-Attention</strong> to understand context.</p>
      <p>Mathematically, the attention function is described as mapping a query and a set of key-value pairs to an output. The output is computed as a weighted sum of the values, where the weight assigned to each value is computed by a compatibility function of the query with the corresponding key.</p>
      <blockquote>"Attention is not just about focus; it's about understanding the relationships between every part of the input."</blockquote>
      <p>This architecture has paved the way for models like BERT, GPT-4, and Gemini, enabling tasks ranging from translation to creative writing.</p>
    `,
    author: "Marco Rossi",
    date: "Oct 12, 2024",
    imageUrl: "https://picsum.photos/800/600?random=1",
    tags: ["NLP", "Deep Learning"]
  },
  {
    id: 2,
    title: "Reinforcement Learning in Robotics",
    excerpt: "Exploring policy gradients and Q-learning applied to simple robotic arm simulations.",
    content: `
      <p>Reinforcement Learning (RL) has shown tremendous promise in the field of robotics. By defining a reward function, we can train agents to perform complex tasks without explicitly programming the movements.</p>
      <h3>Q-Learning vs. Policy Gradients</h3>
      <p>In our recent experiments at the PMLS lab, we compared Q-Learning approaches against Policy Gradient methods like PPO (Proximal Policy Optimization) for a 3-DOF robotic arm simulation.</p>
      <ul>
        <li><strong>Q-Learning:</strong> Effective for discrete action spaces but struggles with continuous control required for smooth robotic movement.</li>
        <li><strong>Policy Gradients:</strong> Better suited for high-dimensional continuous action spaces, offering smoother convergence in our simulations.</li>
      </ul>
      <p>The results showed that while PPO required more compute time, the stability of the learned policy was significantly higher.</p>
    `,
    author: "Giulia Bianchi",
    date: "Nov 05, 2024",
    imageUrl: "https://picsum.photos/800/600?random=2",
    tags: ["RL", "Robotics"]
  },
  {
    id: 3,
    title: "The Ethics of Generative AI",
    excerpt: "Discussion on bias, copyright, and the societal impact of large scale generative models.",
    content: `
      <p>As Generative AI models become more ubiquitous, the ethical considerations surrounding their deployment have moved to the forefront of the conversation.</p>
      <h3>Key Concerns</h3>
      <p>One of the primary issues is <strong>Bias</strong>. Models trained on internet text inevitably absorb the biases present in that data. At PMLS, we are researching methods to detect and mitigate these biases in open-source datasets.</p>
      <p>Another major topic is <strong>Copyright</strong>. Does training on copyrighted data constitute fair use? The legal landscape is still evolving, but as researchers, we must advocate for transparency and respect for content creators.</p>
      <p>Finally, we must consider the <strong>energy consumption</strong> of training large models. Sustainable AI is not just a buzzword; it is a necessity for the future of our field.</p>
    `,
    author: "Alessandro Verdi",
    date: "Jan 15, 2025",
    imageUrl: "https://picsum.photos/800/600?random=3",
    tags: ["Ethics", "AI Safety"]
  }
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
        <div className={`flex justify-between items-end mb-12 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div>
             <h2 className="font-serif text-4xl mb-2">Research & Insights</h2>
             <p className="text-gray-500">Latest articles from our members</p>
          </div>
          <button className="hidden md:block text-pmlsRed font-medium hover:underline decoration-2 underline-offset-4">
            View all posts
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SAMPLE_POSTS.map((post, index) => (
            <article 
              key={post.id} 
              onClick={() => onPostClick(post)}
              className={`bg-white group cursor-pointer hover:shadow-xl transition-all duration-700 transform border border-gray-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="overflow-hidden h-48">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs font-bold text-pmlsRed uppercase tracking-wider">{tag}</span>
                  ))}
                </div>
                <h3 className="font-serif text-2xl mb-3 group-hover:text-pmlsRed transition-colors">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex justify-between items-center text-xs text-gray-400 border-t pt-4">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className={`mt-8 text-center md:hidden transition-opacity duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <button className="text-pmlsRed font-medium hover:underline">View all posts</button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;