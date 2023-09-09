import filter from '../src/filter';
import {
  UnsupportedProviderError,
} from '../src/errors';

jest.mock('../src/constants', () => ({
  disallowedDomains: ['disallowed.com'], // these are example domains, replace with actual values if needed
}));

describe('filter function', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw UnsupportedProviderError for disallowed domains', async () => {
    const testUrl = 'http://disallowed.com/somePath';
    await expect(filter(testUrl)).rejects.toThrow(UnsupportedProviderError);
  });

  it('should not throw UnsupportedProviderError for allowed domains', async () => {
    const testUrl = 'http://allowed.com/somePath';
    await expect(filter(testUrl)).resolves.not.toThrow();
  });
});
