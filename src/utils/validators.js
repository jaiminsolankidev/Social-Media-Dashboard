/**
 * Validate email address format
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).trim().toLowerCase());
}

/**
 * Validate username (3-20 characters, alphanumeric and underscores)
 * @param {string} username
 * @returns {boolean}
 */
export function isValidUsername(username) {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(String(username).trim());
}

/**
 * Validate password length
 * @param {string} password
 * @param {number} minLength
 * @returns {boolean}
 */
export function isValidPassword(password, minLength = 6) {
  return typeof password === 'string' && password.length >= minLength;
}

/**
 * Validate image file
 * @param {File} file
 * @param {number} maxSizeBytes
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateImageFile(file, maxSizeBytes = 5 * 1024 * 1024) {
  if (!file) {
    return { valid: false, error: 'Please select an image file.' };
  }

  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file format. Please upload JPG, PNG, WEBP or GIF.' };
  }

  if (file.size > maxSizeBytes) {
    return { valid: false, error: 'Image size exceeds maximum limit of 5MB.' };
  }

  return { valid: true };
}
