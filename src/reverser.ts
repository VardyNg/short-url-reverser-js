import request from 'request';
import filter from './filter';
import validateURL from './validateURL';
import normalizeURL from './normalizeURL';

/**
 * Reverse a shortened URL to its original URL.
 * @param shortenedURL - The shorten url to reverse.
 * @returns The original URL.
 */
export async function reverser(shortenedURL: string) {

  // filter the unsupported URL
  filter(shortenedURL);
  // validate the URL
  validateURL(shortenedURL);
  // normalize the URL
  shortenedURL = normalizeURL(shortenedURL);
  
  return new Promise<string>((resolve, reject) => {
    request({
      url: shortenedURL,
      method: 'HEAD', // Use HEAD method to only retrieve headers, not the entire page content
      followAllRedirects: true, // Automatically follow redirects
      timeout: 5000, // Set a timeout of 5 seconds
    }, (error, response) => {
      if (error) {
        reject(error);
      } else {
        // Get the final URL after all redirects
        const responseURL = response.request.uri.href;
        resolve(responseURL);
      }
    });
  });
}