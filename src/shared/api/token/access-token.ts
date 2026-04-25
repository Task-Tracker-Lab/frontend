class AccessToken {
  static _token: string | null = null;

  static set token(token: string) {
    this._token = token;
  }

  static get token(): string | null {
    return this._token;
  }

  static get header() {
    return this.getHeader();
  }

  static clear() {
    this._token = null;
  }

  static getHeader(token: string | null = this.token) {
    return token && `Bearer ${token}`;
  }
}

export { AccessToken };
