import { useState } from 'react';

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    handleLogin(username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            value={username}
            name='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='text'
            value={username}
            name='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
