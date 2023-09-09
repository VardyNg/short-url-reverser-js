import {
  reverser
} from '../src/reverser';
import filter from '../src/filter';
import validateURL from '../src/validateURL';
import normalizeURL from '../src/normalizeURL';
import request from 'request';

jest.mock('../src/filter', () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock('../src/validateURL', () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock('../src/normalizeURL', () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock('request');

/**
 *
 * @group unit
 */
describe('reverser', () => {

  beforeEach(() => {
    (filter as jest.Mock).mockImplementation(() => {});
    (validateURL as jest.Mock).mockImplementation(() => {});
    (normalizeURL as jest.Mock).mockImplementation((url: string) => url);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the original URL', async () => {
    // Arrange
    const url = 'https://final-redirected-url.com/';
    const response = {
      request: {
        uri: {
          href: url,
        }
      }
    };
    require('request').mockImplementation((options: any, callback:any) => {
      callback(null, response);
    });
    // Act
    const result = await reverser('https://bit.ly/3d9cQhT');
    // Assert
    expect(result).toBe(url);
  });
})
