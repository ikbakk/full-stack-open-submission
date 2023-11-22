/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from 'react';
import { User } from '../interfaces/user';
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

interface IAppContext {
  user: User | null;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  login: UseMutationResult<AxiosResponse<any, any>, Error, LoginInput, unknown>;
}

interface LoginInput {
  username: string;
  password: string;
}

export const AppContext = createContext({} as IAppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const baseUrl = 'http://localhost:5000';

  const login = useMutation({
    mutationKey: ['token'],
    mutationFn: async ({ username, password }: LoginInput) =>
      await axios.post(`${baseUrl}/api/login`, {
        username,
        password,
      }),
    onSuccess: (data) => {
      setToken(data.data.token);
      setUser({
        username: data.data.username,
        name: data.data.name,
      });
      localStorage.setItem('tokenFso', data.data.token);
      localStorage.setItem('userFso', JSON.stringify(data.data));
    },
  });

  useEffect(() => {
    if (token === '' && user === null) {
      const tokenStorage = localStorage.getItem('tokenFso');
      const userStorage = localStorage.getItem('userFso');
      if (userStorage) {
        setUser(JSON.parse(userStorage));
      }
      if (tokenStorage) {
        setToken(tokenStorage);
      }
    }
  }, [token, user]);

  const value = {
    token,
    setToken,
    user,
    login,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
