import { BlogPost } from '../types';

export const llmMechanicsPost: BlogPost = {
  id: 1,
  title: "The Mechanics of Language Understanding: An Introduction to LLMs",
  excerpt: "At its core, an LLM is trying to solve a deceptively simple problem: given some text, what word comes next? Let's pop the hood and see what's actually going on inside these things.",
  content: `
    <h3>The Big Picture: What Are We Even Building?</h3>
    <p>Remember when autocorrect was the pinnacle of "smart text technology"? Yeah, those days feel like ancient history now. Large Language Models have burst onto the scene, and suddenly we're having conversations with AI that can write poetry, debug code, and explain quantum physics. But here's the thing: most people treat LLMs like magic boxes. You throw words in, you get words out, and somewhere in between... neural network stuff happens?</p>

    <p>Let's pop the hood and see what's actually going on inside these things.</p>

    <p>At its core, an LLM is trying to solve a deceptively simple problem: <strong>given some text, what word comes next?</strong> That's it. That's the whole game. But this seemingly mundane task turns out to be incredibly powerful because to predict the next word well, the model needs to understand grammar, facts, context, reasoning, and even a bit of common sense.</p>

    <p>Think about it: if I say "The cat sat on the...", you're probably thinking "mat" or "chair" or "roof". You're definitely not thinking "philosophy" or "Tuesday". You're using everything you know about cats, sitting, and how the world works to make that prediction. LLMs do something surprisingly similar, just with billions of parameters instead of a lifetime of experience.</p>

    <h3>The Foundation: Tokens and Embeddings</h3>
    <p>Before we dive into the architecture, we need to talk about how text becomes something a neural network can actually work with.</p>

    <h4>Tokenization: Breaking It Down</h4>
    <p>LLMs don't see words—they see <strong>tokens</strong>. A token might be a whole word, part of a word, or even a single character, depending on how common it is. For example, "understanding" might be split into "under" and "standing", while "the" stays as one token. This is done using algorithms like Byte-Pair Encoding (BPE) that learn which chunks of text appear frequently enough to deserve their own token.</p>

    <p>Why tokens instead of characters or words? It's a Goldilocks solution: characters are too granular (your model would be enormous), and words are too rigid (you can't handle typos or new words). Tokens are <em>just right</em>.</p>

    <h4>Embeddings: Giving Tokens Meaning</h4>
    <p>Once we have tokens, we need to convert them into numbers. But not just any numbers—we need <strong>embeddings</strong>: high-dimensional vectors that capture semantic meaning.</p>

    <p>Here's the cool part: similar words get similar vectors. The embedding for "king" will be close to "queen" in this high-dimensional space. And here's where the famous example comes in:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      vector("king") − vector("man") + vector("woman") ≈ vector("queen")
    </blockquote>

    <p>Each token gets mapped to a learned embedding vector <strong>e</strong> ∈ ℝ<sup>d</sup>, where d is typically between 768 and 12,288 depending on the model size. These embeddings are learned during training and capture rich semantic relationships.</p>

    <h4>Example: From Text to Tensors</h4>
    <p>Let's trace through a real example. Say we input: "Machine learning is awesome"</p>

    <ol style="margin: 16px 0;">
      <li><strong>Tokenization</strong>: <code>["Machine", "learning", "is", "awesome"]</code> → Token IDs: <code>[5574, 6509, 374, 12738]</code></li>
      <li><strong>Embedding</strong>: Each ID gets mapped to its vector:
        <ul style="margin: 8px 0;">
          <li>Token 5574 → <code>[0.23, −0.67, 0.91, ..., 0.45]</code> (a 768-dim vector)</li>
          <li>Token 6509 → <code>[−0.12, 0.83, −0.34, ..., 0.78]</code></li>
          <li>And so on...</li>
        </ul>
      </li>
    </ol>

    <p>Now we have a sequence of vectors: a matrix <strong>X</strong> ∈ ℝ<sup>n×d</sup> where n is the sequence length and d is the embedding dimension.</p>

    <h3>The Heart: Transformer Architecture</h3>
    <p>Okay, here's where it gets spicy. The transformer architecture, introduced in the legendary "Attention Is All You Need" paper, is what made modern LLMs possible. Let's break it down piece by piece.</p>

    <h4>Self-Attention: The Secret Sauce</h4>
    <p>Self-attention lets each token "look at" every other token in the sequence and decide what's important. When processing the word "it" in "The cat drank water because it was thirsty", the model needs to figure out that "it" refers to "cat", not "water". Self-attention makes this happen.</p>

    <p><strong>The Math:</strong></p>

    <p>For each token, we create three vectors:</p>
    <ul style="margin: 16px 0;">
      <li><strong>Query</strong> (<strong>Q</strong>): "What am I looking for?"</li>
      <li><strong>Key</strong> (<strong>K</strong>): "What do I contain?"</li>
      <li><strong>Value</strong> (<strong>V</strong>): "What information do I pass forward?"</li>
    </ul>

    <p>These are computed via learned linear transformations:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      <strong>Q</strong> = <strong>X</strong><strong>W</strong><sup>Q</sup>, <strong>K</strong> = <strong>X</strong><strong>W</strong><sup>K</sup>, <strong>V</strong> = <strong>X</strong><strong>W</strong><sup>V</sup>
    </blockquote>

    <p>where <strong>W</strong><sup>Q</sup>, <strong>W</strong><sup>K</sup>, <strong>W</strong><sup>V</sup> ∈ ℝ<sup>d×d<sub>k</sub></sup> are learned weight matrices.</p>

    <p>The attention mechanism then computes:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      Attention(<strong>Q</strong>, <strong>K</strong>, <strong>V</strong>) = softmax(<strong>QK</strong><sup>T</sup> / √d<sub>k</sub>)<strong>V</strong>
    </blockquote>

    <p>Let's unpack this:</p>
    <ol style="margin: 16px 0;">
      <li><strong>QK</strong><sup>T</sup> gives us a similarity score between every pair of tokens (higher = more related)</li>
      <li>We divide by √d<sub>k</sub> to keep gradients stable (this is crucial for training)</li>
      <li>Softmax converts scores to probabilities (they sum to 1)</li>
      <li>We multiply by <strong>V</strong> to get a weighted sum of values</li>
    </ol>

    <h4>Multi-Head Attention: Different Perspectives</h4>
    <p>One attention mechanism is good, but multiple is better. <strong>Multi-head attention</strong> runs several attention operations in parallel, each focusing on different aspects of the relationships.</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      MultiHead(<strong>Q</strong>, <strong>K</strong>, <strong>V</strong>) = Concat(head<sub>1</sub>, ..., head<sub>h</sub>)<strong>W</strong><sup>O</sup>
    </blockquote>

    <p>where each head is:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      head<sub>i</sub> = Attention(<strong>Q</strong><strong>W</strong><sub>i</sub><sup>Q</sup>, <strong>K</strong><strong>W</strong><sub>i</sub><sup>K</sup>, <strong>V</strong><strong>W</strong><sub>i</sub><sup>V</sup>)
    </blockquote>

    <p>Think of it like having multiple experts, each specialized in noticing different patterns: one might focus on syntactic relationships, another on semantic meaning, another on long-range dependencies.</p>

    <h4>Example: Attention in Action</h4>
    <p>Let's see attention working on: "The cat sat on the mat because it was soft"</p>

    <p>When processing "it":</p>
    <ul style="margin: 16px 0;">
      <li><strong>Attention to "mat"</strong>: 0.72 (high score - likely referent)</li>
      <li><strong>Attention to "cat"</strong>: 0.15 (medium score - grammatically possible)</li>
      <li><strong>Attention to "soft"</strong>: 0.08 (low score - descriptor, not referent)</li>
      <li><strong>Attention to other words</strong>: 0.05 (background noise)</li>
    </ul>

    <p>The model learns these attention patterns during training. Different heads might focus on different things—one might specialize in pronoun resolution, another in subject-verb agreement.</p>

    <h3>Feed-Forward Networks: Adding Complexity</h3>
    <p>After attention, each token's representation passes through a <strong>feed-forward network (FFN)</strong>, which is just a couple of dense layers with a non-linearity:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      FFN(<strong>x</strong>) = GeLU(<strong>x</strong><strong>W</strong><sub>1</sub> + <strong>b</strong><sub>1</sub>)<strong>W</strong><sub>2</sub> + <strong>b</strong><sub>2</sub>
    </blockquote>

    <p>The hidden dimension in the FFN is typically 4× the model dimension (so if d = 768, the FFN expands to 3,072, then back down to 768). This is where the model learns complex, non-linear transformations of the information gathered by attention.</p>

    <h4>Residual Connections and Layer Normalization</h4>
    <p>To make training stable and allow gradients to flow through deep networks, we use <strong>residual connections</strong> (skip connections) and <strong>layer normalization</strong>:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      <strong>x</strong><sub>l+1</sub> = LayerNorm(<strong>x</strong><sub>l</sub> + Sublayer(<strong>x</strong><sub>l</sub>))
    </blockquote>

    <p>where Sublayer could be either multi-head attention or the FFN. This "add the input back to the output" trick prevents the vanishing gradient problem and lets us stack dozens of layers.</p>

    <h3>Putting It All Together: The Full Forward Pass</h3>
    <p>A complete transformer block looks like this:</p>

    <ol style="margin: 16px 0;">
      <li><strong>Multi-head self-attention</strong> with residual connection and layer norm</li>
      <li><strong>Feed-forward network</strong> with residual connection and layer norm</li>
    </ol>

    <p>And we stack these blocks—typically 12 to 96 times depending on the model size. GPT-3 has 96 layers. That's a lot of computation, but each layer refines the representation a bit more.</p>

    <p><strong>The full process for generating text:</strong></p>

    <ol style="margin: 16px 0;">
      <li>Input: "Machine learning is"</li>
      <li>Tokenize and embed the input</li>
      <li>Pass through all transformer blocks</li>
      <li>Final output vectors pass through a linear layer + softmax to get probabilities over all possible next tokens</li>
      <li>Sample from this distribution (or pick the highest probability token)</li>
      <li>Get: "awesome" (hopefully!)</li>
      <li>Append "awesome" to input and repeat for the next word</li>
    </ol>

    <p>Mathematically, at the output layer:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      P(token<sub>i</sub>) = softmax(<strong>W</strong><sub>out</sub> <strong>h</strong><sub>final</sub> + <strong>b</strong><sub>out</sub>)<sub>i</sub>
    </blockquote>

    <p>where <strong>h</strong><sub>final</sub> is the last token's hidden state after all transformer blocks.</p>

    <h3>Training: Learning from the Internet</h3>

    <h4>Pre-training: Next Token Prediction</h4>
    <p>LLMs are trained with a simple objective: <strong>predict the next token</strong>. Given a massive corpus of text (think: large chunks of the internet), we feed in sequences and train the model to predict what comes next.</p>

    <p>The loss function is just cross-entropy:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      ℒ = −(1/N) Σ<sub>i=1</sub><sup>N</sup> log P(x<sub>i</sub> | x<sub>1</sub>, ..., x<sub>i−1</sub>)
    </blockquote>

    <p>where we're summing over all tokens in our training data. We're maximizing the probability that the model assigns to the actual next token.</p>

    <h4>Scaling Laws</h4>
    <p>Here's something fascinating: LLM performance improves predictably with scale. If you increase the number of parameters, the amount of training data, or the compute budget, performance gets better in a smooth, predictable way. This is why we keep seeing bigger models—because we know they'll be better.</p>

    <h4>Example: Training Dynamics</h4>
    <p>Imagine training on the sequence: "The capital of France is Paris"</p>

    <ul style="margin: 16px 0;">
      <li><strong>Input to model</strong>: "The capital of France is"</li>
      <li><strong>Target</strong>: "Paris"</li>
      <li><strong>Model predicts</strong>: Maybe 40% "Paris", 25% "Lyon", 20% "France", 15% others</li>
      <li><strong>Loss</strong>: We get penalized proportional to how much probability we didn't assign to "Paris"</li>
      <li><strong>Backpropagation</strong>: Update all those billions of parameters slightly to make "Paris" more likely next time</li>
    </ul>

    <p>After seeing millions of similar examples, the model learns that capitals go with countries, city names are likely answers, and "Paris" specifically pairs with "France".</p>

    <h3>Fine-tuning and RLHF: Making Them Actually Useful</h3>
    <p>Raw pre-trained models are good at predicting text, but they're not great conversationalists. They might complete "How to build a bomb" just as readily as "How to build a treehouse" because they're just predicting likely text continuations.</p>

    <p>Enter <strong>RLHF</strong> (Reinforcement Learning from Human Feedback):</p>

    <ol style="margin: 16px 0;">
      <li><strong>Supervised Fine-Tuning</strong>: Train on high-quality human demonstrations of helpful, harmless responses</li>
      <li><strong>Reward Model Training</strong>: Humans rank model outputs, and we train a model to predict which outputs humans prefer</li>
      <li><strong>RL Optimization</strong>: Use algorithms like PPO (Proximal Policy Optimization) to optimize the LLM to generate responses that score highly according to the reward model</li>
    </ol>

    <p>The objective becomes:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      ℒ<sub>RL</sub> = 𝔼<sub>x∼D, y∼π<sub>θ</sub>(y|x)</sub>[r(x, y) − β log(π<sub>θ</sub>(y|x) / π<sub>ref</sub>(y|x))]
    </blockquote>

    <p>where r(x, y) is the reward from the reward model, and the second term (KL divergence from the reference model) keeps the model from going off the rails.</p>

    <h3>Limitations and Future Directions</h3>
    <p>Let's be real: LLMs aren't perfect.</p>

    <ul style="margin: 16px 0;">
      <li><strong>Hallucinations</strong>: They sometimes confidently state false information</li>
      <li><strong>Context window</strong>: They can only "remember" a limited amount of previous text</li>
      <li><strong>Compute cost</strong>: Training and running these models is expensive and energy-intensive</li>
      <li><strong>Reasoning</strong>: They struggle with complex multi-step reasoning</li>
      <li><strong>Grounding</strong>: They don't have real-world experience or sensory input</li>
    </ul>

    <p>But the field is moving fast. We're seeing improvements in reasoning (chain-of-thought prompting), longer context windows (up to millions of tokens), and better efficiency (smaller models that punch above their weight).</p>

    <h3>Wrapping Up</h3>
    <p>So there you have it: LLMs are sophisticated pattern matching machines that learned about language, facts, and reasoning by trying to predict the next word in billions of text sequences. Through the magic of self-attention, they can capture complex relationships in language, and through fine-tuning, they can be steered toward being helpful assistants.</p>

    <p>They're not truly "understanding" in the human sense—they don't have consciousness or subjective experience. But they're doing something impressive enough that the distinction might matter less than we thought. The transformer architecture gave us a powerful tool for processing sequential data, and we're still discovering everything it can do.</p>

    <p>Next time you're chatting with an LLM, you'll know: underneath, it's all just matrix multiplications, attention scores, and the learned weights of billions of parameters trying their best to predict what a helpful AI would say next.</p>

    <p>And honestly? That's pretty cool.</p>

    <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;"/>

    <p><em>Want to dive deeper? Check out the original "Attention Is All You Need" paper, or explore the GPT and BERT papers to see how these concepts get applied in practice. And if you're feeling ambitious, try implementing a mini transformer from scratch—there's no better way to really understand this stuff than getting your hands dirty with the code.</em></p>

    <p><em>— Parthenope Machine Learning Society</em></p>
  `,
  author: "A. Bucchignani, A. J. Virno",
  date: "December 8, 2025",
  imageUrl: "https://picsum.photos/800/600?random=1",
  tags: ["LLM", "Transformers", "Deep Learning", "NLP"]
};
