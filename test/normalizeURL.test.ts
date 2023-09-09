import normalizeURL from '../src/normalizeURL';
import { lacksProtocol } from '../src/utils';

/**
 * 
 * @group unit
 */
describe('normalizeURL', () => {
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it
  .each([
    { url: 'abc.com', expected: 'https://abc.com' }, 
  ])
  ('should give HTTPS if url has no protocol', (data) => {
      // Arrange
      jest.mock('../src/utils', () => ({
        lacksProtocol: jest.fn().mockReturnValue(true),
      }));
      const url = data.url;
      // Act
      const normalizedURL = normalizeURL(url);
      // Assert
      expect(normalizedURL).toBe(data.expected);
    });

  it('should remove whitespace from url', () => {
    // Arrange
    const url = ' abc .com ';
    // Act
    const normalizedURL = normalizeURL(url);
    // Assert
    const hasWhiteSpace = /\s/g.test(normalizedURL);
    expect(hasWhiteSpace).toBeFalsy();
  });

  it('should convert url to lowercase', () => {
    // Arrange
    const url = 'ABC.com';
    // Act
    const normalizedURL = normalizeURL(url);
    // Assert
    const isUpperCase = /[A-Z]/g.test(normalizedURL);
    expect(isUpperCase).toBeFalsy();
  });
});