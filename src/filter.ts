import {
  UnsupportedProviderError,
} from './errors';
import {
  disallowedDomains,
} from './constants';
/**
 * Filter unsupported short url providers.
 * @param url - The short url to filter.
 * @throws {UnsupportedProviderError} If the short url provider is not supported.
 */
async function filter(url: string) {
  // cast to URL object to get hostname
  const urlObject = new URL(url);
  // convert to lowercase for case-insensitive comparison
  const hostname = urlObject.hostname.toLowerCase();

  // check if the hostname is in the disallowedDomains array
  for (const domain of disallowedDomains) {
    if (hostname === domain.toLowerCase()) {
      throw new UnsupportedProviderError();
    }
  }
  // if the hostname is not in the disallowedDomains array, return
  return;
}

export default filter;