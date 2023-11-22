import { useState, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const LoginForm = () => {
  const { login } = useContext(AppContext);
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login.mutate(loginData);
  };
  return (
    <form onSubmit={(e) => handleLogin(e)} className="flex gap-2">
      <input
        value={loginData.username}
        className="rounded-md px-2 py-1 outline outline-1"
        onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
        type="text"
        placeholder="username"
      />
      <input
        value={loginData.password}
        className="rounded-md px-2 py-1 outline outline-1"
        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        type="password"
        placeholder="password"
      />
      <button className="rounded-md bg-slate-300 px-4 py-2" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
