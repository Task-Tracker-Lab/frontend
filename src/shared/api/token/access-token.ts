'use client';

class AccessToken {
  #tokenKey: string = 'token';

  set token(token: string) {
    localStorage.setItem(this.#tokenKey, token);
  }

  get token(): string | null {
    return localStorage.getItem(this.#tokenKey);
  }

  get header() {
    const token = this.token;

    return token && `Bearer ${token}`;
  }
}

const accessToken = new AccessToken();

export { accessToken };
