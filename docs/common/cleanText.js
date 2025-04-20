export function cleanText(text) {
    return text
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }