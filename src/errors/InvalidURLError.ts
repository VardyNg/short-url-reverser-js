class InvalidURLError extends Error {
  constructor() {
    super('Invalid URL');
    Object.setPrototypeOf(this, InvalidURLError.prototype);
  }
}

export default InvalidURLError;