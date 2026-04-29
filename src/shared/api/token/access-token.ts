class AccessToken {
  static #token: string | null = null;

  static set token(token: string) {
    this.#token = token;
  }

  static get token(): string | null {
    return this.#token;
  }

  static get header() {
    return this.getHeader();
  }

  static clear() {
    this.#token = null;
  }

  static getHeader(token: string | null = this.token) {
    return token && `Bearer ${token}`;
  }
}

export { AccessToken };
