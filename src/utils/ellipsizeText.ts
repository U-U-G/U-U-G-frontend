export function ellipsizeText(
  text: string | null | undefined,
  maxChars: number,
  suffix = '...',
  empty = '-',
): string {
  const s = text?.trim() || empty
  if (s.length <= maxChars) return s
  return s.slice(0, maxChars) + suffix
}
