import { describe, it } from 'node:test';
import assert from 'node:assert';

// Pure logic mirror for Node ESM test runner
function tokenizeInlineMarkdown(text) {
  if (!text) return [];

  const regex = /(\*\*[\s\S]+?\*\*|__[\s\S]+?__|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*\n]+?\*|_[^_\n]+?_)/g;
  const rawParts = text.split(regex);
  const tokens = [];

  for (const part of rawParts) {
    if (!part) continue;

    if (
      (part.startsWith('**') && part.endsWith('**') && part.length >= 4) ||
      (part.startsWith('__') && part.endsWith('__') && part.length >= 4)
    ) {
      tokens.push({ type: 'bold', content: part.slice(2, -2) });
    } else if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      tokens.push({ type: 'code', content: part.slice(1, -1) });
    } else if (part.startsWith('[') && part.endsWith(')')) {
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        tokens.push({ type: 'link', text: linkMatch[1], url: linkMatch[2] });
      } else {
        tokens.push({ type: 'text', content: part });
      }
    } else if (
      (part.startsWith('*') && part.endsWith('*') && part.length >= 2) ||
      (part.startsWith('_') && part.endsWith('_') && part.length >= 2)
    ) {
      tokens.push({ type: 'italic', content: part.slice(1, -1) });
    } else {
      tokens.push({ type: 'text', content: part });
    }
  }

  return tokens;
}

describe('Markdown Inline Tokenizer', () => {
  it('parses double asterisks (**bold**) into bold tokens without asterisk characters', () => {
    const input = '1. **Registration**: Submitter provides `https://webhook.attacker.example/receive`.';
    const tokens = tokenizeInlineMarkdown(input);

    const boldToken = tokens.find((t) => t.type === 'bold');
    assert.ok(boldToken, 'Bold token should exist');
    assert.strictEqual(boldToken.content, 'Registration');
    assert.strictEqual(boldToken.content.includes('**'), false);

    const codeToken = tokens.find((t) => t.type === 'code');
    assert.ok(codeToken, 'Code token should exist');
    assert.strictEqual(codeToken.content, 'https://webhook.attacker.example/receive');
    assert.strictEqual(codeToken.content.includes('`'), false);
  });

  it('handles multiple bold sections in a single sentence', () => {
    const input = '**DNS Rebinding**: The attacker now responds with TTL=0 and IP `169.254.169.254`.';
    const tokens = tokenizeInlineMarkdown(input);

    assert.strictEqual(tokens[0].type, 'bold');
    assert.strictEqual(tokens[0].content, 'DNS Rebinding');
    assert.strictEqual(tokens[1].content, ': The attacker now responds with TTL=0 and IP ');
    assert.strictEqual(tokens[2].type, 'code');
    assert.strictEqual(tokens[2].content, '169.254.169.254');
  });

  it('handles links, italics, and plain text', () => {
    const input = 'Check [OWASP](https://owasp.org) for *critical* updates.';
    const tokens = tokenizeInlineMarkdown(input);

    assert.strictEqual(tokens[0].content, 'Check ');
    assert.strictEqual(tokens[1].type, 'link');
    assert.strictEqual(tokens[1].text, 'OWASP');
    assert.strictEqual(tokens[1].url, 'https://owasp.org');
    assert.strictEqual(tokens[2].content, ' for ');
    assert.strictEqual(tokens[3].type, 'italic');
    assert.strictEqual(tokens[3].content, 'critical');
  });
});
