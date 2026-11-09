/**
 * Truncate text to a specified maximum length with ellipsis
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text || '';
  return `${text.slice(0, maxLength).trim()}...`;
}

/**
 * Extract hashtags from a string
 * @param {string} text
 * @returns {string[]}
 */
export function extractHashtags(text) {
  if (!text) return [];
  const matches = text.match(/#[a-zA-Z0-9_]+/g);
  return matches ? matches.map(tag => tag.slice(1).toLowerCase()) : [];
}

/**
 * Copy text to clipboard with fallback
 * @param {string} text
 * @returns {Promise<boolean>}
 */
export async function copyToClipboard(text) {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.warn('Failed to copy to clipboard', err);
    return false;
  }
}

/**
 * Share content using Web Share API or fallback to clipboard
 * @param {{ title: string, text: string, url: string }} data
 * @returns {Promise<'shared'|'copied'|'failed'>}
 */
export async function shareContent(data) {
  if (navigator?.share) {
    try {
      await navigator.share(data);
      return 'shared';
    } catch (err) {
      if (err.name !== 'AbortError') {
        const copied = await copyToClipboard(data.url || window.location.href);
        return copied ? 'copied' : 'failed';
      }
      return 'failed';
    }
  }
  const copied = await copyToClipboard(data.url || window.location.href);
  return copied ? 'copied' : 'failed';
}

/**
 * Generate a random unique ID with prefix
 * @param {string} prefix
 * @returns {string}
 */
export function generateId(prefix = 'id') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
}
