export function withTrailingLine(content: string) {
  const lines = [content.trim(), ''];
  return lines.join('\r\n');
}
