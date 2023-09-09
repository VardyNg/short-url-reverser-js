import {
  reverser 
} from '../src/reverser';

/**
 * 
 * @group e2e
 */
describe('reverser', () => {
  it
    .each([
      { shortenedURL: 'bit.ly/3PcFOJL', originalURL: 'https://www.youtube.com/watch?v=bo5j8SE3HdU&list=RDbo5j8SE3HdU&start_radio=1' },
      { shortenedURL: 'tinyurl.com/4hfst357', originalURL: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { shortenedURL: 't.ly/OpseN', originalURL: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { shortenedURL: 'rb.gy/yqnom', originalURL: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { shortenedURL: 'n9.cl/lxgn', originalURL: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    ])
    ('should return the original URL', async (data) => {
      // Arrange
      const urls = [
        data.shortenedURL,
        `http://${data.shortenedURL}`,
        `https://${data.shortenedURL}`,
      ];

      for (const url of urls) {
        // Act
        const fullURL = await reverser(url);
        // Assert
        expect(fullURL).toBe(data.originalURL);
      }
    }, 60000);

  it
    .each([
      { url: 'https://thismustbenotworking.com', error: 'ENOTFOUND'},
      { url: 'https://notavalidurl', error: 'getaddrinfo EAI_AGAIN notavalidurl'},
      { url: 'http://notavalidurl', error: 'getaddrinfo EAI_AGAIN notavalidurl'},
      { url: 'udp://notavalidurl', error: 'Invalid URL'},
    ])
    ('should throw an error if the URl is invalid', async (data) => {
      await expect(reverser(data.url)).rejects.toThrow(data.error);
    }, 6000);
})
