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

export const getJwt = (res: any): string | null =>
{
  if (res.headers.authorization)
  {
    let headers = res.headers.authorization.split(' ');
    if (headers[0] === 'Bearer')
    {
      return headers[1];
    }
  }
  
  return null;
}