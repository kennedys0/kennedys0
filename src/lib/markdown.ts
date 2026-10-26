export type InlineToken =
  | { type: 'text'; content: string }
  | { type: 'bold'; content: string }
  | { type: 'code'; content: string }
  | { type: 'italic'; content: string }
  | { type: 'link'; text: string; url: string };

/**
 * Tokenizes an inline markdown string into structured tokens (bold, code, italic, link, text).
 * Handles double asterisks (**bold**), inline code (`code`), links ([text](url)), and italics (*text*).
 */
export function tokenizeInlineMarkdown(text: string): InlineToken[] {
  if (!text) return [];

  // Match **bold**, __bold__, `code`, [text](url), *italic*, _italic_
  const regex = /(\*\*[\s\S]+?\*\*|__[\s\S]+?__|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*\n]+?\*|_[^_\n]+?_)/g;
  const rawParts = text.split(regex);
  const tokens: InlineToken[] = [];

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
