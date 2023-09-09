class UnsupportedProviderError extends Error {
  constructor() {
    super('Unsupported provider');
    Object.setPrototypeOf(this, UnsupportedProviderError.prototype);
  }
}

export default UnsupportedProviderError;