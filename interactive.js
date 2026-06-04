// ========== nanochat — interactive demos ==========
// All DOM access is guarded with `if (!el) return;` so any slide can be
// served in isolation without throwing.

// ---------- Demo 1: Pipeline Stepper ----------
// Click a stage in the end-to-end pipeline to reveal what it does plus a
// rough cost/time slice of the ~$100, ~4-hour d20 speedrun.
const PIPELINE_STAGES = [
    {
        icon: '🔤', name: 'Tokeniser',
        desc: 'Train a custom byte-level BPE tokeniser (Rust implementation) on ~2B characters of web text. The d20 speedrun uses a 65,536-token vocabulary; current master defaults to 32,768 (2¹⁵). A bespoke tokeniser compresses this corpus better than an off-the-shelf one.',
        meta: ['scripts.tok_train', 'vocab 2¹⁵–2¹⁶', '~1 min']
    },
    {
        icon: '📚', name: 'Pretrain',
        desc: 'Train the base transformer on a FineWeb-style web corpus. The dial is --depth: d20 for the $100 run (GPT-2 grade sits around d24–d26). Architecture: rotary embeddings, RMSNorm, ReLU² MLP, GQA, untied embeddings. This stage dominates the compute budget.',
        meta: ['scripts.base_train', '~4e19 FLOPs', '~3 hours']
    },
    {
        icon: '💬', name: 'Midtrain',
        desc: 'Adapt the base model to conversations: introduce the chat special tokens, mix in multiple-choice (MMLU-style) data and Python tool-use examples. Short but pivotal — it teaches the model the *format* of being a chat assistant.',
        meta: ['scripts.mid_train', 'chat + tools + MC', '~8 min']
    },
    {
        icon: '🎯', name: 'SFT',
        desc: 'Supervised fine-tuning on curated, high-quality conversations (e.g. SmolTalk) with proper sequence padding. Sharpens instruction-following and response quality on top of the midtrained model.',
        meta: ['scripts.chat_sft', 'SmolTalk + identity', '~7 min']
    },
    {
        icon: '🏆', name: 'RL (opt.)',
        desc: 'Optional reinforcement learning on a verifiable task — GSM8K grade-school maths — using a simplified "GRPO" (rewards minus the group mean, no z-scoring). Squeezes out extra capability where answers can be auto-checked.',
        meta: ['scripts.chat_rl', 'GSM8K reward', '~1.5 hours']
    },
    {
        icon: '📊', name: 'Eval',
        desc: 'Score the model across the suite — CORE for the base model, then ARC-Easy/Challenge, MMLU, GSM8K, HumanEval and ChatCORE for the chat model — and write a single markdown "report card" summarising the whole run.',
        meta: ['scripts.base_eval / chat_eval', 'report.md', 'seconds']
    },
    {
        icon: '🚀', name: 'Serve',
        desc: 'Talk to your model in a ChatGPT-like web UI. A KV-cached inference engine drives a minimal chat web app (and a CLI). The same model you just trained, now interactive in the browser.',
        meta: ['scripts.chat_web', 'KV-cache engine', 'live']
    }
];

function selectPipelineStage(idx) {
    const detail = document.getElementById('pipe-detail');
    if (!detail) return;
    const stages = document.querySelectorAll('.pipe-stage');
    stages.forEach((s, i) => s.classList.toggle('active', i === idx));

    const s = PIPELINE_STAGES[idx];
    if (!s) return;
    const metaHtml = s.meta.map(m => `<span>${m}</span>`).join('');
    detail.innerHTML =
        `<h4>${s.icon} ${s.name}</h4>` +
        `<p>${s.desc}</p>` +
        `<div class="pipe-meta">${metaHtml}</div>`;
}

document.addEventListener('DOMContentLoaded', () => {
    const strip = document.getElementById('pipeline');
    if (!strip) return;
    strip.querySelectorAll('.pipe-stage').forEach((el, i) => {
        el.addEventListener('click', () => selectPipelineStage(i));
    });
    selectPipelineStage(0); // default to the first stage
});

// ---------- Demo 2: Budget Tier Selector ----------
// Pick a dollar tier to see the qualitative report-card difference.
const TIERS = {
    '100': {
        title: '~$100 · d20 · "a kindergartener"',
        body: '<p>The flagship speedrun: <span class="tier-stat">depth-20</span> model, ' +
              '~<span class="tier-stat">4e19 FLOPs</span>, the full pipeline in roughly ' +
              '<span class="tier-stat">4 hours</span> on one 8×H100 node.</p>' +
              '<p>Report card: base CORE ≈ 0.22; chat MMLU ≈ 0.31, ARC-Easy ≈ 0.39, ' +
              'GSM8K ≈ 0.05, HumanEval ≈ 0.09. Coherent, conversational, but factually shallow ' +
              'and happy to hallucinate.</p>'
    },
    '300': {
        title: '~$300 · d26 · GPT-2 grade',
        body: '<p>Push the dial to roughly <span class="tier-stat">depth-26</span>, train longer on more ' +
              'tokens. This is around where the model crosses the <span class="tier-stat">GPT-2 CORE = 0.2565</span> ' +
              'bar — the target of the public "time-to-GPT-2" leaderboard.</p>' +
              '<p>Noticeably stronger across every report-card row; still a micro-model, but a capable one.</p>'
    },
    '1000': {
        title: '~$1000 · deeper · the project ceiling',
        body: '<p>nanochat explicitly targets accessible end-to-end models under ' +
              '<span class="tier-stat">$1000</span>. Deeper transformers trained on extended token horizons ' +
              'keep climbing the same report card.</p>' +
              '<p>The single <code>--depth</code> dial sets width, heads, learning rate, training horizon and ' +
              'weight decay automatically — you just ask for a bigger model.</p>'
    }
};

function selectTier(key) {
    const panel = document.getElementById('tier-panel');
    if (!panel) return;
    document.querySelectorAll('.tier-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.tier === key);
    });
    const t = TIERS[key];
    if (!t) return;
    panel.innerHTML = `<h4>${t.title}</h4>${t.body}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const controls = document.getElementById('tier-controls');
    if (!controls) return;
    controls.querySelectorAll('.tier-btn').forEach(b => {
        b.addEventListener('click', () => selectTier(b.dataset.tier));
    });
    selectTier('100'); // default tier
});
