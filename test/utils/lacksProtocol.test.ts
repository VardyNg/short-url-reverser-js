import { lacksProtocol } from "../../src/utils";

describe('lacksProtocol', () => {
  it
    .each([
      { url: 'abc.com', expected: true },
      { url: 'http://abc.com', expected: false },
      { url: 'https://abc.com', expected: false },
      { url: 'udp://abc.com', expected: false },
    ])
    ('should determine whether to url has protocol', (data) => {
      // Arrange
      const url = data.url;
      // Act
      const result = lacksProtocol(url);
      // Assert
      expect(result).toBe(data.expected);
    });
      
});