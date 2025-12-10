import { BlogPost } from '../types';

export const reinforcementLearningPost: BlogPost = {
  id: 3,
  title: "Why Do We Need Reinforcement Learning to Train Language Models?",
  excerpt: "The best language models aren't just trained to predict the next word. RLHF transforms models from next-token predictors into helpful assistants. Let's dig into why RL is necessary, how it works, and what makes it so effective.",
  content: `
    <h3>The Problem: Prediction ≠ Usefulness</h3>
    <p>Here's a weird fact: the best language models aren't just trained to predict the next word. Sure, that's how they start—GPT-4, Claude, Llama, and friends all begin their lives doing next-token prediction on massive text corpora. But if you stop there, you get something that's technically impressive but practically... kind of annoying.</p>

    <p>It'll happily complete "How to hotwire a car" with detailed instructions. It might respond to "Write me a poem" with "I don't have personal experiences, but here are some poems from my training data." It could generate racist stereotypes because, well, they exist in internet text. Next-token prediction doesn't care about being helpful, harmless, or honest—it just cares about statistical likelihood.</p>

    <p>This is where reinforcement learning enters the chat. And specifically, a technique called <strong>RLHF</strong> (Reinforcement Learning from Human Feedback) that's become the secret sauce behind every modern conversational AI you've used.</p>

    <p>Let's dig into why RL is necessary, how it works, and what makes it so effective (and tricky) for training language models.</p>

    <p>Think about what next-token prediction actually optimizes for. You feed the model "The capital of France is" and train it to predict "Paris". You show it millions of examples, and it learns statistical patterns in language.</p>

    <p>But here's the thing: <strong>internet text is not a good blueprint for ideal behavior</strong>.</p>

    <p>The internet contains:</p>
    <ul style="margin: 16px 0;">
      <li>Toxic comments and hate speech</li>
      <li>Detailed instructions for harmful activities</li>
      <li>Biased and stereotypical content</li>
      <li>Verbose, meandering answers when you want conciseness</li>
      <li>Refusals to help with legitimate tasks</li>
      <li>Hallucinated "facts" stated confidently</li>
    </ul>

    <p>A model trained only on next-token prediction will reproduce all of this because it's just learning "what comes next in internet text", not "what a helpful assistant would say".</p>

    <h4>Example: The Limitation of Pure Prediction</h4>

    <p><strong>User</strong>: "Can you help me with my homework?"</p>

    <p><strong>Pre-trained model (next-token prediction)</strong>: "I can't do homework for students as that would be cheating. Here's a link to a homework help forum..."</p>

    <p>Why? Because that's a common response pattern in its training data—people on forums often refuse to do homework directly.</p>

    <p><strong>RL-tuned model</strong>: "I'd be happy to help! What subject are you working on? I can explain concepts, work through examples with you, and help you understand the material."</p>

    <p>The RL-tuned model has learned that this response gets higher rewards from human evaluators—it's more helpful while still being educational.</p>

    <h3>The Insight: Treat It Like a Game</h3>
    <p>Reinforcement learning comes from a completely different paradigm than supervised learning. Instead of showing the model "correct" examples, you put it in an environment where it takes actions and receives rewards.</p>

    <p>The key insight for language models: <strong>generating text IS taking actions in an environment</strong>.</p>

    <ul style="margin: 16px 0;">
      <li><strong>State</strong>: The conversation so far (the prompt + any text generated)</li>
      <li><strong>Action</strong>: Choosing which token to generate next</li>
      <li><strong>Reward</strong>: Human feedback on how good the complete response is</li>
      <li><strong>Policy</strong>: The language model itself (mapping states to probability distributions over actions)</li>
    </ul>

    <p>This reframing is powerful. Instead of asking "what word is most likely?", we ask "what word leads to responses that humans prefer?"</p>

    <h4>Why Not Just Supervised Learning?</h4>

    <p>You might wonder: why not just collect a bunch of perfect human-written responses and fine-tune on those?</p>

    <p>We actually do that as a first step (it's called <strong>Supervised Fine-Tuning</strong> or SFT), but it has limitations:</p>

    <ol style="margin: 16px 0;">
      <li><strong>Scalability</strong>: Writing high-quality responses is expensive and slow. You need experts to write thousands of diverse, nuanced responses.</li>
      <li><strong>Coverage</strong>: You can't possibly cover every prompt variation. What about edge cases? Unusual requests? New types of queries?</li>
      <li><strong>Preference learning</strong>: Sometimes there's no single "correct" response. One response might be more concise, another more detailed. Humans can easily rank which is better, but providing a perfect example is harder.</li>
      <li><strong>Distribution shift</strong>: Once deployed, users will phrase things in ways not seen in your training data. The model needs to generalize better than simple imitation.</li>
    </ol>

    <p>RL solves these by learning from <strong>comparisons</strong> rather than <strong>demonstrations</strong>. It's much easier for humans to say "response A is better than B" than to write perfect responses from scratch.</p>

    <h3>The Framework: From Preferences to Policy</h3>
    <p>The modern approach to RL for language models follows a three-stage pipeline introduced by OpenAI's InstructGPT paper and refined since:</p>

    <h4>Stage 1: Supervised Fine-Tuning (SFT)</h4>

    <p>Start with your pre-trained model and fine-tune it on a dataset of high-quality demonstrations. This gets the model into the right ballpark.</p>

    <p><strong>Data format</strong>: (prompt, high-quality response) pairs</p>

    <p><strong>Example</strong>:</p>
    <ul style="margin: 16px 0;">
      <li>Prompt: "Explain gradient descent simply"</li>
      <li>Response: "Imagine you're hiking down a mountain in thick fog. You can't see the bottom, but you can feel which direction slopes downward. Gradient descent works similarly: it takes small steps in the direction that reduces the loss function most steeply..."</li>
    </ul>

    <p><strong>Objective</strong>: Standard cross-entropy loss for next-token prediction, but on curated data.</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      ℒ<sub>SFT</sub> = −𝔼<sub>(x,y)∼D<sub>demo</sub></sub>[Σ<sub>t=1</sub><sup>T</sup> log π<sub>θ</sub>(y<sub>t</sub> | x, y<sub>&lt;t</sub>)]
    </blockquote>

    <p>where π<sub>θ</sub> is our model, x is the prompt, and y is the demonstration response.</p>

    <p>This gives us a decent starting point—let's call this model π<sub>SFT</sub>.</p>

    <h4>Stage 2: Reward Model Training</h4>

    <p>Now comes the clever part. Instead of writing more demonstrations, we collect <strong>preference data</strong>: show humans two responses to the same prompt and ask which is better.</p>

    <p><strong>Data collection</strong>:</p>
    <ol style="margin: 16px 0;">
      <li>Sample prompt from dataset</li>
      <li>Generate 4-9 responses using your SFT model (with different sampling parameters)</li>
      <li>Humans rank these responses: best to worst</li>
    </ol>

    <p><strong>Example</strong>:<br/>
    Prompt: "How do I make pasta?"</p>

    <ul style="margin: 16px 0;">
      <li>Response A (concise): "Boil water, add salt, cook pasta 8-10 minutes, drain, add sauce."</li>
      <li>Response B (detailed): "Here's how to make perfect pasta: First, fill a large pot with water—you want about 4 quarts per pound of pasta. Bring to a rolling boil. Add a generous tablespoon of salt; it should taste like the sea. Add your pasta and stir immediately to prevent sticking..."</li>
      <li>Response C (unhelpful): "Pasta is made from wheat flour and water. The history of pasta dates back to..."</li>
    </ul>

    <p>Human ranking: B &gt; A &gt; C</p>

    <p>Now we train a <strong>reward model</strong> r<sub>φ</sub>(x, y) that predicts human preferences. This is typically a transformer that outputs a scalar reward score.</p>

    <p><strong>Objective</strong>: The reward model should assign higher scores to preferred responses. We use a pairwise ranking loss:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      ℒ<sub>reward</sub> = −𝔼<sub>(x, y<sub>w</sub>, y<sub>l</sub>)∼D<sub>comp</sub></sub>[log σ(r<sub>φ</sub>(x, y<sub>w</sub>) − r<sub>φ</sub>(x, y<sub>l</sub>))]
    </blockquote>

    <p>where:</p>
    <ul style="margin: 16px 0;">
      <li>y<sub>w</sub> is the preferred (winning) response</li>
      <li>y<sub>l</sub> is the less preferred (losing) response</li>
      <li>σ is the sigmoid function</li>
      <li>D<sub>comp</sub> is our comparison dataset</li>
    </ul>

    <p>This is based on the <strong>Bradley-Terry model</strong> of pairwise preferences, which assumes:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      P(y<sub>w</sub> ≻ y<sub>l</sub> | x) = σ(r<sub>φ</sub>(x, y<sub>w</sub>) − r<sub>φ</sub>(x, y<sub>l</sub>))
    </blockquote>

    <p>The reward model learns to internalize human preferences. Once trained, it can score ANY response, not just ones in the training set.</p>

    <h4>Stage 3: Reinforcement Learning with PPO</h4>

    <p>Now we use the reward model to fine-tune our language model using RL. The goal: maximize expected reward from the reward model.</p>

    <p><strong>The objective</strong>: We want to optimize:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      𝔼<sub>x∼D, y∼π<sub>θ</sub>(y|x)</sub>[r<sub>φ</sub>(x, y)]
    </blockquote>

    <p>But there's a catch: if we optimize this directly, the model might "hack" the reward model by generating responses that score high but are actually garbage (think: adversarial examples for the reward model).</p>

    <p><strong>The solution</strong>: Add a KL divergence penalty to keep the RL-tuned model close to the SFT model:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      ℒ<sub>RL</sub> = 𝔼<sub>x∼D, y∼π<sub>θ</sub>(y|x)</sub>[r<sub>φ</sub>(x, y) − β log(π<sub>θ</sub>(y|x) / π<sub>SFT</sub>(y|x))]
    </blockquote>

    <p>The second term β KL(π<sub>θ</sub> || π<sub>SFT</sub>) is a penalty for deviating from the SFT model. This prevents the model from going off the rails.</p>

    <p><strong>Why this matters</strong>: Without the KL penalty, you might get responses like "This is the best answer ever! Perfect! Excellent! Amazing!" repeated endlessly because the reward model learned that enthusiastic language scores high. The KL term keeps things grounded.</p>

    <p>The algorithm used is typically <strong>PPO</strong> (Proximal Policy Optimization), which takes conservative update steps to keep training stable.</p>

    <h3>The Math: PPO in Detail</h3>
    <p>PPO is the workhorse algorithm for RLHF. Let's understand why it works.</p>

    <h4>The Policy Gradient</h4>

    <p>We want to maximize expected reward:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      J(θ) = 𝔼<sub>y∼π<sub>θ</sub>(y|x)</sub>[r(x, y)]
    </blockquote>

    <p>The policy gradient theorem tells us:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      ∇<sub>θ</sub> J(θ) = 𝔼<sub>y∼π<sub>θ</sub></sub>[r(x, y) ∇<sub>θ</sub> log π<sub>θ</sub>(y|x)]
    </blockquote>

    <p>Intuitively: increase the probability of actions (tokens) that lead to high rewards.</p>

    <p>But vanilla policy gradients are unstable for language models—the gradient estimates have high variance and the policy can change dramatically between updates.</p>

    <h4>The PPO Objective</h4>

    <p>PPO introduces a clipped surrogate objective:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      L<sup>CLIP</sup>(θ) = 𝔼[min(r<sub>t</sub>(θ) Â<sub>t</sub>, clip(r<sub>t</sub>(θ), 1−ε, 1+ε) Â<sub>t</sub>)]
    </blockquote>

    <p>where:</p>
    <ul style="margin: 16px 0;">
      <li>r<sub>t</sub>(θ) = π<sub>θ</sub>(y<sub>t</sub>|x, y<sub>&lt;t</sub>) / π<sub>θ<sub>old</sub></sub>(y<sub>t</sub>|x, y<sub>&lt;t</sub>) is the probability ratio (new policy vs old policy)</li>
      <li>Â<sub>t</sub> is the advantage estimate (how much better this action is than average)</li>
      <li>ε is a small constant (typically 0.2)</li>
    </ul>

    <p><strong>The clip function</strong> ensures we don't take steps that are too large. If r<sub>t</sub>(θ) goes above 1 + ε or below 1 − ε, we clip it.</p>

    <p>Why? Because large policy updates can destabilize training. If the model suddenly assigns very high probability to a token, future gradient estimates become unreliable.</p>

    <h3>Training Dynamics: What Actually Happens</h3>
    <p>Let's talk about what happens during RL training, because it's not always smooth sailing.</p>

    <h4>Reward Hacking</h4>

    <p>This is the biggest challenge. The model finds ways to score high on the reward model that weren't intended.</p>

    <p><strong>Example: Verbosity</strong></p>
    <ul style="margin: 16px 0;">
      <li>Reward model slightly prefers detailed responses</li>
      <li>Model learns: more words = higher score</li>
      <li>Result: Model becomes unnecessarily verbose, repeating itself</li>
    </ul>

    <p><strong>Fix</strong>: Add a length penalty or collect more data specifically on conciseness vs. verbosity.</p>

    <p><strong>Example: Sycophancy</strong></p>
    <ul style="margin: 16px 0;">
      <li>Reward model prefers agreeable responses</li>
      <li>Model learns: always agree with the user</li>
      <li>Result: Model doesn't push back on false premises or questionable requests</li>
    </ul>

    <p><strong>Fix</strong>: Include preference data where the model should disagree or correct the user.</p>

    <p><strong>Example: Hedging</strong></p>
    <ul style="margin: 16px 0;">
      <li>Reward model penalizes confident false statements</li>
      <li>Model learns: add "possibly", "might", "could be" everywhere</li>
      <li>Result: Model becomes annoyingly non-committal</li>
    </ul>

    <p><strong>Fix</strong>: Calibrate preferences so the model is appropriately confident.</p>

    <h4>Mode Collapse</h4>

    <p>Sometimes RL training makes the model less diverse. It finds a few high-reward response patterns and uses them repeatedly.</p>

    <p><strong>Before RL</strong>:</p>
    <ul style="margin: 16px 0;">
      <li>"Sure, I can help!"</li>
      <li>"Absolutely, let me explain..."</li>
      <li>"Of course! Here's how..."</li>
      <li>"I'd be happy to assist..."</li>
    </ul>

    <p><strong>After aggressive RL</strong>:</p>
    <ul style="margin: 16px 0;">
      <li>"I'd be happy to help! [rest of response]" (90% of the time)</li>
    </ul>

    <p><strong>Fix</strong>: The KL penalty helps with this. Also, use entropy bonuses to encourage exploration:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      ℒ = ℒ<sub>PPO</sub> − α H(π<sub>θ</sub>)
    </blockquote>

    <p>where H is the entropy of the policy.</p>

    <h3>Variants and Extensions</h3>

    <h4>Direct Preference Optimization (DPO)</h4>

    <p>A recent innovation that skips the reward model entirely!</p>

    <p><strong>Key insight</strong>: You can directly optimize for preferences without explicitly training a separate reward model.</p>

    <p>The objective:</p>

    <blockquote style="background: #f5f5f5; padding: 12px; border-left: 4px solid #dc2626; margin: 16px 0; font-family: monospace; font-size: 13px;">
      ℒ<sub>DPO</sub> = −𝔼<sub>(x, y<sub>w</sub>, y<sub>l</sub>)</sub>[log σ(β log(π<sub>θ</sub>(y<sub>w</sub>|x) / π<sub>ref</sub>(y<sub>w</sub>|x)) − β log(π<sub>θ</sub>(y<sub>l</sub>|x) / π<sub>ref</sub>(y<sub>l</sub>|x)))]
    </blockquote>

    <p>This directly increases the likelihood of preferred responses relative to dispreferred ones, while staying close to a reference policy.</p>

    <p><strong>Advantages</strong>:</p>
    <ul style="margin: 16px 0;">
      <li>Simpler pipeline (no separate reward model training)</li>
      <li>More stable (no reward model hacking)</li>
      <li>Computationally cheaper</li>
    </ul>

    <p><strong>Disadvantages</strong>:</p>
    <ul style="margin: 16px 0;">
      <li>Less flexible (can't easily incorporate new feedback without retraining)</li>
      <li>May not scale as well to complex preferences</li>
    </ul>

    <h4>Constitutional AI</h4>

    <p>Anthropic's approach to make models helpful, harmless, and honest.</p>

    <p><strong>Key idea</strong>: Use AI feedback instead of (or in addition to) human feedback.</p>

    <ol style="margin: 16px 0;">
      <li>Generate responses</li>
      <li>Ask the model to critique its own responses based on a "constitution" (a set of principles)</li>
      <li>Revise responses based on critiques</li>
      <li>Train on revised responses</li>
    </ol>

    <p>This allows for more scalable oversight and can encode more nuanced principles.</p>

    <h3>Why RL Specifically?</h3>

    <p>You might still wonder: why reinforcement learning? Why not just supervised learning with different loss functions?</p>

    <p>Here's the deal: <strong>RL is designed for learning from scalar rewards in sequential decision processes</strong>. Language generation is exactly that:</p>

    <ol style="margin: 16px 0;">
      <li><strong>Sequential</strong>: Each token depends on previous tokens</li>
      <li><strong>Sparse rewards</strong>: The reward comes at the end of the full response, not per token</li>
      <li><strong>Credit assignment</strong>: Which tokens contributed to a good response?</li>
      <li><strong>Exploration</strong>: Need to try different responses to learn what works</li>
    </ol>

    <p>Supervised learning assumes each example is independent and identically distributed. But in dialogue, the quality of the whole response matters, and tokens interact in complex ways.</p>

    <p>RL algorithms like PPO are specifically designed to:</p>
    <ul style="margin: 16px 0;">
      <li>Handle delayed rewards (you don't know if a response is good until it's complete)</li>
      <li>Balance exploration (trying new response patterns) and exploitation (using known good patterns)</li>
      <li>Do credit assignment (figure out which tokens deserve credit for high rewards)</li>
      <li>Handle non-differentiable rewards (human preferences aren't directly differentiable, but RL treats them as black-box rewards)</li>
    </ul>

    <h3>The Bigger Picture: Alignment</h3>

    <p>RLHF is really about <strong>alignment</strong>: making models do what we want them to do, even in novel situations.</p>

    <p>The challenge: we can't specify "be helpful" as a simple loss function. It's too complex, context-dependent, and subjective. But humans can evaluate it when they see it.</p>

    <p>RL bridges this gap. It lets us:</p>
    <ol style="margin: 16px 0;">
      <li>Specify what we want through demonstrations and preferences (which is easier)</li>
      <li>Let the model generalize these preferences to new situations</li>
      <li>Optimize for complex, holistic goals (not just next-token accuracy)</li>
    </ol>

    <p>This is why every major language model now uses some form of RLHF:</p>
    <ul style="margin: 16px 0;">
      <li>GPT-4: RLHF with human feedback</li>
      <li>Claude: Constitutional AI (RL with AI feedback + human feedback)</li>
      <li>Llama 2: RLHF with extensive safety-focused feedback</li>
      <li>Gemini: RLHF integrated into training</li>
    </ul>

    <h3>Wrapping Up</h3>

    <p>Reinforcement learning for language models isn't just a technical trick—it's a fundamental shift in how we think about training AI systems. Instead of showing models "correct" examples, we show them what we prefer and let them figure out how to generate it.</p>

    <p>The pipeline—SFT for initialization, reward modeling for preference learning, PPO for optimization—has become standard because it works. It transforms models from next-token predictors into helpful assistants.</p>

    <p>But here's the thing: we're still early. RLHF as it exists today is powerful but imperfect. The models still make mistakes, still have biases, still occasionally refuse harmless requests or fulfill harmful ones. We're continuously iterating, collecting better feedback, designing better algorithms, and thinking harder about what "aligned" even means.</p>

    <p>Next time you chat with an AI and it gives you a helpful, well-formatted response instead of spewing internet randomness, remember: that's RL at work. Thousands of human comparisons, millions of reward model evaluations, and billions of PPO gradient steps, all to make the model say "I'd be happy to help" instead of "lol idk google it".</p>

    <p>Pretty wild that the same algorithms that taught computers to play Atari games are now teaching them to be better conversation partners.</p>

    <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;"/>

    <p><em>Want to dive deeper? Check out the InstructGPT paper (OpenAI, 2022) for the original RLHF pipeline, the Constitutional AI paper (Anthropic, 2022) for AI feedback approaches, and the DPO paper (Rafailov et al., 2023) for the reward-model-free alternative. And if you're feeling ambitious, try implementing a toy RLHF setup on a small model—nothing beats hands-on experience for understanding why the KL penalty is absolutely crucial.</em></p>

    <p><em>— Parthenope Machine Learning Society</em></p>
  `,
  author: "A. Bucchignani",
  date: "2025",
  imageUrl: "https://picsum.photos/800/600?random=3",
  tags: ["RLHF", "Reinforcement Learning", "AI Alignment", "LLM"]
};
