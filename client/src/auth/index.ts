import jwtDecode from 'jwt-decode';

export interface JWTAuthToken
{
  userId: number,
  email: string
}

export const storeToken = (token: string) =>
{
  localStorage.authToken = token;
}

export const clearToken = () =>
{
  delete localStorage.authToken;
}

export const getToken = (): string | null =>
{
  return localStorage.authToken;
}

export const getTokenEmail = (): string | null =>
{
  const token = getToken();

  return token ? jwtDecode<JWTAuthToken>(token).email : null;
}