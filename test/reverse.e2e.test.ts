import {
  reverser 
} from '../src/reverser';
import filter from '../src/filter';
import validateURL from '../src/validateURL';

jest.mock('../src/filter', () => ({
  __esModule: true, 
  default: jest.fn()
}));

jest.mock('../src/validateURL', () => ({
  __esModule: true,
  default: jest.fn()
}));

/**
 * 
 * @group e2e
 */
describe('reverser', () => {

  beforeEach(() => {
    (filter as jest.Mock).mockImplementation(() => {});
    (validateURL as jest.Mock).mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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
      { url: 'udp://notavalidurl', error: 'Invalid protocol: udp:'},
    ])
    ('should throw an error if the URl is invalid', async (data) => {
      await expect(reverser(data.url)).rejects.toThrow(data.error);
    }, 6000);
})
