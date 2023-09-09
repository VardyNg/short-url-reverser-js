import validateURL from '../src/validateURL';
import {
  InvalidURLError,
} from '../src/errors';


/**
 * 
 * @group unit
 */
describe('urlValidation', () => {
  it
    .each([
      'https://bit.ly/44JE2FY',
      'https://tinyurl.com/4hfst357',
      'https://t.ly/OpseN',
    ])
    ('should not throw an error if the URL is valid', (url) => {
      expect(() => validateURL(url)).not.toThrow();
    });

  it
    .each([
      'abc',
    ])
    ('should throw an error if the URL is invalid', (url) => {
      expect(
        () => validateURL(url)
      ).toThrow(InvalidURLError);
    }
    );
});