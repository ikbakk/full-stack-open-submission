import { useState, useEffect, useRef } from 'react';
import Blogs from './components/Blog';
import LoginForm from './components/LoginForm';
import Notification from './components/Notif';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import Toggle from './components/FormToggle';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

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
      setMessage('Error: Wrong Credentials');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };

  const createBlog = async (title, author, url) => {
    try {
      blogFormRef.current.toggleVisibility();
      const blog = await blogService.create({ title, author, url }, user.token);
      setBlogs(blogs.concat(blog));
    } catch (exception) {
      setMessage('Error: All fields must be filled to add a new blog');
    }
  };

  return (
    <div>
      <h1 className='title'>Blogs</h1>
      <Notification message={message} />
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <p>
            <span className='active-user'>{user.name}</span> logged in
            <button onClick={handleLogout}>Logout</button>
          </p>
          <Toggle ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Toggle>
          <Blogs blogs={blogs} />
        </div>
      )}
    </div>
  );
};

export default App;
