import { useState, useEffect } from 'react';
import Blogs from './components/Blog';
import LoginForm from './components/LoginForm';
import Notification from './components/Notif';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [errorMessage]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      console.log('fetch');
      const user = await loginService.login({
        username,
        password
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setErrorMessage('Wrong Credentials');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };

  const createBlog = async (title, author, url) => {
    try {
      const blog = await blogService.create({ title, author, url }, user.token);
      setBlogs(blogs.concat(blog));
    } catch (exception) {
      setErrorMessage(exception.message);
    }
  };

  return (
    <div>
      <h1 className='title'>Blogs</h1>
      <Notification message={errorMessage} />
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <p>
            <span className='active-user'>{user.name}</span> logged in
            <button onClick={handleLogout}>Logout</button>
          </p>
          <BlogForm createBlog={createBlog} />
          <Blogs blogs={blogs} />
        </div>
      )}
    </div>
  );
};

export default App;
