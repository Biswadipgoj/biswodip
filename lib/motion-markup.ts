/** Static, escaped glyph markup avoids hydrating a React fiber for every letter. */
export function escapeMotionText(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export function glyphMarkup(text: string) {
  return [...text].map(letter => '<span data-glyph="">' + escapeMotionText(letter) + '</span>').join('');
}

export function headingMarkup(text: string) {
  return text.split(/(\s+)/).map(word => /^\s+$/.test(word)
    ? escapeMotionText(word)
    : '<span class="motion-word">' + escapeMotionText(word) + '</span>').join('');
}

export function codeMarkup(lines: readonly string[]) {
  return lines.map((line, index) => '<span class="code-row"><span class="line-number">' + String(index + 1).padStart(2, '0') + '</span><span class="code-line">' + escapeMotionText(line) + '</span>\n</span>').join('');
}
