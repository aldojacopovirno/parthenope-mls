import React, { useEffect, useRef, useState } from 'react';
import { BlogPost } from '../types';
import { Calendar, User, ArrowRight } from 'lucide-react';

const LLM_MECHANICS_POST: BlogPost = {
  id: 4,
  title: "The Mechanics of Language Understanding: An Introduction to LLMs",
  excerpt: "A rigorous yet approachable dive into how Large Language Models work, from tokenization and transformer architecture through concrete examples that make it all click.",
  content: `
    <h3>Intro: The Magic Behind the Machine</h3>
    <p>You know that moment when you ask ChatGPT something and it responds like it actually <em>gets</em> you? Yeah, we get it too. And spoiler alert: it's not magic. It's something arguably cooler—math and a lot of clever engineering working in harmony.</p>
    
    <p>Here's the thing: LLMs are just really, <em>really</em> good at predicting what word comes next. That's it. That's the core. But when you scale that simple idea to billions of parameters and train it on trillions of tokens, suddenly you've got a system that can write essays, debug your code, and have philosophical conversations with you at 2 AM.</p>

    <p>We're going to walk you through the actual mechanics of how this works. We're talking math, we're talking architecture, and we're talking a concrete example that'll make it all click. No fluff, no corporate speak—just the good stuff.</p>

    <h3>The Math Behind It All</h3>
    
    <h4>Tokenization: Breaking Language Into Bite-Sized Pieces</h4>
    <p>Before an LLM can even <em>think</em>, it needs to understand what you're saying. But here's the problem: your GPU doesn't speak English. So the first thing the model does is tokenization—basically, it breaks your text into chunks called tokens.</p>

    <p>Think of it like this: your message "understanding" might become <code>["understand", "ing"]</code> or <code>["under", "stand", "ing"]</code>, depending on the tokenization scheme. Different models use different approaches (Byte-Pair Encoding, SentencePiece, etc.), but the principle's the same: convert readable text into numbers that a neural network can munch on.</p>

    <p>Each token then gets mapped to a <strong>high-dimensional vector</strong>—imagine a point floating in 4096-dimensional space (or however many dimensions your model uses). Tokens with similar meanings hang out near each other in this space. Neat, right?</p>

    <p><strong>The Math</strong>: Given a vocabulary 𝒱 of size V, tokenization produces a sequence of integers (t<sub>1</sub>, t<sub>2</sub>, ..., t<sub>n</sub>) where t<sub>i</sub> ∈ {1, 2, ..., V}. The tokenizer τ maps text to tokens:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      τ: 𝒮* → ℤ<sup>n</sup><sub>V</sub>
    </blockquote>

    <p>Each token t<sub>i</sub> gets embedded via matrix <strong>E</strong> ∈ ℝ<sup>V×d</sup>:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      <strong>e</strong><sub>i</sub> = <strong>E</strong>[t<sub>i</sub>, :] ∈ ℝ<sup>d</sup>
    </blockquote>

    <p>To tell the model <em>where</em> each token sits in the sequence (because transformers don't naturally understand order), we add positional encodings using sinusoidal functions:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      PE<sub>(pos, 2i)</sub> = sin(pos / 10000<sup>2i/d</sup>)<br/>
      PE<sub>(pos, 2i+1)</sub> = cos(pos / 10000<sup>2i/d</sup>)
    </blockquote>

    <p>The final input at each position is just the sum:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      <strong>x</strong><sub>i</sub> = <strong>e</strong><sub>i</sub> + <strong>p</strong><sub>i</sub>
    </blockquote>

    <h4>The Transformer's Secret Sauce: Attention</h4>
    <p>Okay, this is where things get really interesting. The transformer architecture, introduced in 2017, completely changed the game because it solved a massive problem: <em>how do you understand relationships between words that are really far apart in a sentence?</em></p>

    <p>If you're reading "The cat sat on the mat and then it fell," your brain immediately knows "it" refers to something that fell—probably the cat or the mat. But the word "cat" is 7 tokens away from "it." How does a neural network figure that out?</p>

    <p><strong>Attention mechanisms</strong>—that's how.</p>

    <p>Here's the core idea: for each token, the model asks "okay, which <em>other</em> tokens in this sentence are actually important for understanding me?" It computes a compatibility score with every other token, converts those scores to probabilities (using softmax), and then creates a weighted blend of all the tokens based on those probabilities.</p>

    <p><strong>The Formula</strong>: For a query <strong>q</strong>, keys <strong>k</strong>, and values <strong>v</strong>:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      Attention(<strong>q</strong>, <strong>k</strong>, <strong>v</strong>) = softmax(<strong>q</strong><sup>T</sup> <strong>k</strong> / √d<sub>k</sub>) <strong>v</strong>
    </blockquote>

    <p>For a full sequence with matrices <strong>Q</strong>, <strong>K</strong>, <strong>V</strong>:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      Attention(<strong>Q</strong>, <strong>K</strong>, <strong>V</strong>) = softmax(<strong>Q</strong><strong>K</strong><sup>T</sup> / √d<sub>k</sub>)<strong>V</strong>
    </blockquote>

    <p>That √d<sub>k</sub> scaling factor? It prevents the attention scores from exploding and destroying the gradient signal during training. Trust us, without it things get ugly.</p>

    <p>But we're not done. Instead of just <em>one</em> attention head, transformers use <strong>multiple heads in parallel</strong>. Think of it like having 8 different "brains" paying attention to different aspects of the input simultaneously. Head 1 might focus on syntax, head 2 might track named entities, head 3 might pick up on semantic relationships—you get the idea.</p>

    <p>Each head has its own set of learned projection matrices that let it focus on different representation subspaces:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      head<sub>i</sub> = Attention(<strong>Q</strong><strong>W</strong><sup>Q</sup><sub>i</sub>, <strong>K</strong><strong>W</strong><sup>K</sup><sub>i</sub>, <strong>V</strong><strong>W</strong><sup>V</sup><sub>i</sub>)
    </blockquote>

    <p>The outputs get concatenated and projected one more time:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      MultiHead(<strong>Q</strong>, <strong>K</strong>, <strong>V</strong>) = Concat(head<sub>1</sub>, ..., head<sub>h</sub>)<strong>W</strong><sup>O</sup>
    </blockquote>

    <p><strong>One crucial detail</strong>: During training, we <em>cheat</em> a little. We use <strong>causal masking</strong>, which means the model can't peek at future tokens. Before softmax, we set attention logits for future positions to −∞, so they become zero probability. This is how the model learns to be a proper generative model—it can only use context that comes before the token it's trying to predict.</p>

    <h4>The Transformer Block: Putting It Together</h4>
    <p>A single transformer layer is actually a fairly elegant stack. You've got:</p>

    <ol style="margin: 16px 0;">
      <li><strong>Multi-head attention</strong> (we just explained this)</li>
      <li><strong>Residual connection + layer normalization</strong> (helps with training stability)</li>
      <li><strong>Feed-forward network</strong> (a simple two-layer MLP, but wide—usually 4d hidden units)</li>
      <li><strong>Another residual connection + layer norm</strong></li>
    </ol>

    <p>The beauty of residual connections is that they make it way easier to train really deep networks. Without them, gradients get squashed to death as they flow backward.</p>

    <p>Modern LLMs stack this block anywhere from 12 to 96 times. Each layer refines the representation, building up more abstract understanding as information flows through the network.</p>

    <h4>The Training Objective: Learn to Predict</h4>
    <p>So how does an LLM actually <em>learn</em>? Here's the secret: it's trained on a ridiculous amount of text to do one simple task—predict the next token.</p>

    <p>Given a sequence (t<sub>1</sub>, t<sub>2</sub>, ..., t<sub>n</sub>), the model learns to predict P(t<sub>i</sub> | t<sub>1</sub>, ..., t<sub>i-1</sub>) at each position. The hidden state at position i after all layers is <strong>h</strong><sub>i</sub> ∈ ℝ<sup>d</sup>, which gets projected to vocabulary logits:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      <strong>z</strong><sub>i</sub> = <strong>h</strong><sub>i</sub> <strong>W</strong><sup>T</sup> + <strong>b</strong>
    </blockquote>

    <p>where <strong>W</strong> ∈ ℝ<sup>V×d</sup> is the unembedding matrix. Then softmax gives us probabilities:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      P(t<sub>i</sub> | t<sub>1</sub>, ..., t<sub>i-1</sub>) = softmax(<strong>z</strong><sub>i</sub>)[t<sub>i</sub>]
    </blockquote>

    <p>The loss for the whole sequence is just cross-entropy:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      ℒ = −(1/n) Σ<sub>i=1</sub><sup>n</sup> log P(t<sub>i</sub> | t<sub>1</sub>, ..., t<sub>i-1</sub>)
    </blockquote>

    <p>Here's the wild part: <strong>this simple objective implicitly teaches the model about grammar, facts, logic, and reasoning.</strong> The model never explicitly learns to write essays or solve math problems—it just learns to statistically predict continuations of text. And that turns out to be enough to capture an enormous amount of world knowledge and reasoning ability.</p>

    <p>Training looks like this: compute loss on a batch of data, backprop gradients through billions of parameters, update weights slightly in the direction that reduces loss, repeat trillions of times. We're talking GPU clusters running for weeks.</p>

    <h3>Actually Making the Model Generate Text</h3>
    
    <h4>The Complexity Question</h4>
    <p>Here's something to think about: when you ask an LLM a question, it doesn't think in parallel. It computes <em>token by token</em>, in sequence. Each token requires a full forward pass through the entire model.</p>

    <p>The computational complexity of a single forward pass is:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      O(n·d² + n²·d)
    </blockquote>

    <p>The n² term? That's attention—comparing every token to every other token is expensive. The n·d² term is the feed-forward layers. For typical models, the feed-forward part is actually the bigger bottleneck.</p>

    <p>This is why generating long outputs is computationally expensive, and why services like ChatGPT have to be so careful about rate limiting. Every character you type and every word the model generates costs compute money.</p>

    <h4>How Do We Pick Which Token to Actually Use?</h4>
    <p>After the model computes a probability distribution over the vocabulary, it has to <em>choose</em> a token. There are several ways to do this, and they have surprisingly big effects on the output:</p>

    <p><strong>Greedy Decoding</strong>: Just pick the most likely token every time.
    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      t* = argmax<sub>v</sub> p<sub>v</sub>
    </blockquote>
    Simple, but your output gets repetitive and boring. Try it sometime—ask a model to write a poem with greedy decoding and see what happens.</p>

    <p><strong>Temperature-Scaled Sampling</strong>: Adjust the probability distribution by dividing logits by a temperature value T:
    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      p'<sub>v</sub> = exp(z<sub>v</sub> / T) / Σ<sub>u</sub> exp(z<sub>u</sub> / T)
    </blockquote>
    Low temperature (like 0.3) makes the distribution sharper, closer to greedy. High temperature (like 1.5) makes it more uniform and random. This is your "creativity knob."</p>

    <p><strong>Top-k Sampling</strong>: Only sample from the k most probable tokens:
    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      t ~ p', where p' is p restricted to Top-k
    </blockquote>
    This prevents the model from randomly generating gibberish while still allowing some creativity.</p>

    <p><strong>Top-p (Nucleus) Sampling</strong>: Sample from the smallest set of tokens whose cumulative probability exceeds a threshold p (usually 0.9). This adapts dynamically—if the model is very confident about a few tokens, it only considers those. If it's uncertain across many tokens, it considers more options.</p>

    <p>Most modern systems use some combination of temperature and top-p, which is why your ChatGPT outputs feel natural without being repetitive.</p>

    <h4>Putting It All Together: The Generation Loop</h4>
    <p>Here's what actually happens when you hit submit:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 12px;">
      Tokenize your input<br/>
      For each step:<br/>
      &nbsp;&nbsp;- Forward pass through the model (expensive!)<br/>
      &nbsp;&nbsp;- Get probability distribution for next token<br/>
      &nbsp;&nbsp;- Apply temperature / top-k / top-p<br/>
      &nbsp;&nbsp;- Sample a token<br/>
      &nbsp;&nbsp;- Add it to the sequence<br/>
      &nbsp;&nbsp;- Repeat
    </blockquote>

    <p>Each iteration of "forward pass → sample token" is one cycle. For a 100-token generation from a 7B parameter model, that's 100 full passes through 7 billion parameters. That's a <em>lot</em> of math.</p>

    <h3>A Concrete Example (Finally!)</h3>
    
    <p>Let's make this real. We're going to trace through a tiny example and see exactly what the model is doing.</p>

    <p><strong>Input</strong>: "The cat sat on the"<br/>
    <strong>Target</strong>: "mat"</p>

    <h4>Setup: Embedding and Tokenization</h4>
    <p>Imagine we have a vocabulary of 50,000 tokens and embedding dimension d = 8 (in real models it's more like 4096, but 8 is easier to visualize).</p>

    <p>Tokens: <code>[2, 3, 4, 5, 2, 6]</code> where:</p>
    <ul style="margin: 16px 0;">
      <li>Token 2 = "the"</li>
      <li>Token 3 = "cat"</li>
      <li>Token 4 = "sat"</li>
      <li>Token 5 = "on"</li>
      <li>Token 6 = "mat"</li>
    </ul>

    <p>Each token embeds to an 8-dimensional vector. Let's say:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      <strong>e</strong><sub>the</sub> = [0.1, −0.2, 0.5, 0.3, −0.1, 0.4, 0.2, −0.3]<sup>T</sup>
    </blockquote>

    <p>We add positional encodings (which encode "position 0," "position 1," etc.), and get:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      <strong>x</strong><sub>1</sub> = <strong>e</strong><sub>the</sub> + <strong>p</strong><sub>0</sub> ≈ [0.15, −0.18, 0.52, 0.31, −0.09, 0.41, 0.23, −0.28]<sup>T</sup>
    </blockquote>

    <p>And so on for all 6 positions.</p>

    <h4>Attention: The Model Focusing</h4>
    <p>Now we're at position 5 (the second "the"), and the model wants to figure out what token comes next. It computes an attention query at this position:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      <strong>q</strong><sub>5</sub> = <strong>x</strong><sub>5</sub> <strong>W</strong><sup>Q</sup>
    </blockquote>

    <p>And keys for all positions 1 through 5:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      <strong>k</strong><sub>i</sub> = <strong>x</strong><sub>i</sub> <strong>W</strong><sup>K</sup>, i ∈ {1,2,3,4,5}
    </blockquote>

    <p>The attention scores measure "how relevant is position i to position 5?":</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      s<sub>5,j</sub> = (<strong>q</strong><sub>5</sub> · <strong>k</strong><sub>j</sub>) / √8
    </blockquote>

    <p>Let's say these come out to:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      [s<sub>5,1</sub>, s<sub>5,2</sub>, s<sub>5,3</sub>, s<sub>5,4</sub>, s<sub>5,5</sub>] = [0.2, 2.1, 0.5, 1.8, 0.9]
    </blockquote>

    <p>When we apply softmax:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      softmax([0.2, 2.1, 0.5, 1.8, 0.9]) = [0.08, 0.52, 0.11, 0.22, 0.07]
    </blockquote>

    <p>Check it out: the model assigns 52% weight to position 2 ("cat") and 22% to position 4 ("on"). The model figured out that understanding "the [?]" requires knowing:</p>
    <ul style="margin: 16px 0;">
      <li>What the subject is ("cat")</li>
      <li>What the preposition is ("on")</li>
    </ul>

    <p>The values get combined according to these weights:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      output<sub>5</sub> = 0.08·<strong>v</strong><sub>1</sub> + 0.52·<strong>v</strong><sub>2</sub> + 0.11·<strong>v</strong><sub>3</sub> + 0.22·<strong>v</strong><sub>4</sub> + 0.07·<strong>v</strong><sub>5</sub>
    </blockquote>

    <p>This is the attention mechanism in action—it's learning to look at the right parts of the input.</p>

    <h4>Through the Layers and to the Output</h4>
    <p>After going through all transformer layers (let's say 12), the hidden state at position 5 has been refined over and over, incorporating multi-hop reasoning and increasingly abstract understanding.</p>

    <p>Finally, it gets projected to vocabulary logits:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      <strong>z</strong><sub>5</sub> = <strong>h</strong><sub>5</sub> <strong>W</strong><sup>T</sup><sub>unembed</sub>
    </blockquote>

    <p>And let's say this produces:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      P(mat | context) = 0.87<br/>
      P(floor | context) = 0.07<br/>
      P(ground | context) = 0.04
    </blockquote>

    <p>The model is 87% confident the answer is "mat." If we're using greedy decoding, we pick "mat." If we're sampling, we'll almost certainly pick "mat," but there's a small chance we might pick "floor" (which would be hilarious but grammatically weird).</p>

    <h4>What Happens During Training</h4>
    <p>The model never "sees" the answer during this forward pass. But during training, it does. It compares its prediction (87% confidence in "mat") to the ground truth ("mat" is correct), and computes:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      ℒ<sub>5</sub> = −log(0.87) ≈ 0.139
    </blockquote>

    <p>Gradients flow backward through all 12 layers, all those attention heads, the unembedding matrix, and down to the embeddings. Every single parameter gets nudged slightly to increase the probability of "mat" given this context.</p>

    <p>Multiply this by billions of training examples across trillions of tokens, and you've got the emergent intelligence we see in modern LLMs.</p>

    <h3>Why This Actually Works (And Why We Still Don't Fully Understand It)</h3>
    
    <p>Here's the honest part: what we've described explains <em>how</em> LLMs work mechanically. But it doesn't fully explain <em>why</em> they work so well.</p>

    <p>An LLM has no built-in concept of truth, reasoning, or logic. It's just predicting probability distributions. Yet somehow, by doing this really well across trillions of tokens, it acquires capabilities that genuinely seem like understanding.</p>

    <ul style="margin: 16px 0;">
      <li>It learns to follow instructions it was never explicitly trained on</li>
      <li>It can solve math problems it never "memorized"</li>
      <li>It can write code, poetry, and essays with creativity and coherence</li>
    </ul>

    <p>Some of this emerges at certain scales—something called <strong>emergent abilities</strong>. A 7B parameter model struggles with reasoning tasks. A 70B parameter model nails them. Why? We honestly don't have a complete answer. It's an active area of research.</p>

    <p>The point is: LLMs are powerful and elegant, but they're not magic. They're the product of scaling, smart architecture design, and a lot of compute. Understanding the mechanics helps you use them better, debug them more effectively, and appreciate just how crazy it is that they work at all.</p>

    <h3>The Bottom Line</h3>
    
    <p>An LLM is a transformer neural network trained to predict the next token in a sequence. It does this through a combination of:</p>

    <ul style="margin: 16px 0;">
      <li><strong>Tokenization and embedding</strong> to convert text to numbers</li>
      <li><strong>Multi-head attention</strong> to understand relationships between tokens</li>
      <li><strong>Transformer blocks</strong> stacked deep to build abstract representations</li>
      <li><strong>Next-token prediction</strong> as the training objective</li>
    </ul>

    <p>And somehow, this relatively simple framework, scaled to billions of parameters and trained on trillions of tokens, produces systems that can engage in sophisticated dialogue, solve complex problems, and generate creative content.</p>

    <p>Not bad for a bunch of matrix multiplications, right?</p>

    <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;"/>

    <p><em>Have questions? Spotted an error in our math? Think we skipped over something important? Drop a comment or hit us up on our socials. We're always down to talk about this stuff.</em></p>

    <p><em>— Andrea &amp; Aldo<br/>Parthenope Machine Learning Society</em></p>
  `,
  author: "Andrea Bucchignani, Aldo Jacopo Virno",
  date: "2025",
  imageUrl: "https://picsum.photos/800/600?random=4",
  tags: ["LLM", "Transformers", "Deep Learning", "NLP"]
};

// Array of all blog posts
const BLOG_POSTS: BlogPost[] = [
  LLM_MECHANICS_POST,
  // Add more posts here as needed
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
