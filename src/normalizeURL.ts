import {
  lacksProtocol,
} from "./utils";
/**
 * Normalize URL by adding https:// if it doesn't have a protocol.
 * @param url 
 * @returns normalized URL
 */
function normalizeURL(url: string) {
  // remove whitespace
  url = url.trim();
  url = url.replace(/\s/g, '');

  // convert to lowercase
  url = url.toLowerCase();

  // set https as default protocol if none is provided
  if ( lacksProtocol(url) ) {
    url = `https://${url}`;
  }
  return url;
}

export default normalizeURL;