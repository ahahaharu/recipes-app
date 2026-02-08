import { api } from './instance';

export interface LoginParams {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  accessToken: string;
}

export const loginUser = async (credentials: LoginParams): Promise<User> => {
  const response = await api.post<User>('/auth/login', credentials);
  return response.data;
};
