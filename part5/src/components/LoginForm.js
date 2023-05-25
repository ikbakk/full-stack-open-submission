import { useState } from 'react';
import { func } from 'prop-types';

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
            id='username'
            type='text'
            value={username}
            name='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='text'
            value={password}
            name='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type='submit'>
          Login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: func.isRequired
};

export default LoginForm;
