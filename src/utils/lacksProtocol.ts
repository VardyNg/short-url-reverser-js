/**
 * Check if a URL lacks a protocol.
 * @param url 
 * @returns true if URL lacks a protocol, false otherwise
 */
function lacksProtocol(url: string) {
  return !/^[a-z][a-z0-9+\-.]*:\/\//i.test(url);
}

export default lacksProtocol;