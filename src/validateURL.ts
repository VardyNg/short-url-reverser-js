import {
  InvalidURLError,
} from './errors';
/**
 * Validate URL.
 * @param url - The URL to validate.
 * @throws {InvalidURLError} If the URL is invalid.
 */

function validateURL(url: string) {
  try {
    const urlObj = new URL(url);
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      throw Error('Invalid protocol: ' + urlObj.protocol);
    }
  } catch (error) {
    throw new InvalidURLError();
  }
}

export default validateURL;