# The Best ChatGPT $100 Can Buy

**An interactive, slide-by-slide walkthrough of Andrej Karpathy's [nanochat](https://github.com/karpathy/nanochat) — the whole ChatGPT pipeline in one repo.**

Where nanoGPT covered only pretraining, nanochat covers the lot: tokeniser → pretraining → midtraining → SFT → optional RL → eval → serve. One `speedrun.sh` script trains a small ChatGPT clone end-to-end on a single 8×H100 node in roughly four hours — "the best ChatGPT that $100 can buy."

---

## [Launch Presentation](https://brendanjameslynskey.github.io/nanochat_presentation/)

---

## What's Covered

| Part | Topic |
|------|-------|
| 1 | **What is nanochat** — one cohesive repo for the whole pipeline, the $100 / 4-hour speedrun, the report card, and the contrast with nanoGPT |
| 2 | **The Tokeniser** — a custom fast BPE tokeniser (Rust) trained on the data; vocab size; why train your own |
| 3 | **Base Pretraining** — the depth-parameterised transformer, RoPE / RMSNorm / ReLU² / GQA, and the CORE metric |
| 4 | **Midtraining & SFT** — the chat format and special tokens, tool use, multiple-choice data, and the ARC / GSM8K / MMLU / HumanEval report card |
| 5 | **Optional RL** — "GRPO"-style reinforcement learning on GSM8K, and what RL adds beyond SFT |
| 6 | **Serve & the Speedrun** — the KV-cached engine and ChatGPT-style web UI, how `speedrun.sh` stitches every stage together, and scaling the dollar budget |

The presentation closes with a pipeline summary, a "where this fits in Zero-to-Hero" context slide, and key takeaways.

## Interactive Demos

- **Pipeline stepper** — click any stage (tokeniser → pretrain → midtrain → SFT → RL → eval → serve) to see a description and its rough cost/time slice of the speedrun.
- **Budget tier selector** — pick ~$100 (d20), ~$300 (d26) or ~$1000 to see the qualitative report-card differences.

## Format

Built with [Reveal.js](https://revealjs.com/). Use `→` to advance, `↓` for sub-sections, and `Esc` for the slide overview.

## Part of

This presentation is part of [Karpathy: Neural Networks Zero to Hero](https://github.com/BrendanJamesLynskey/LLM_Hub_Karpathy_Zero_to_Hero), itself part of the [LLMs](https://github.com/BrendanJamesLynskey/LLMs) hub.

Credit to Andrej Karpathy's [nanochat](https://github.com/karpathy/nanochat) (released October 2025).
