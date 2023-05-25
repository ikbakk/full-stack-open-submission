import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, likeUpdate, blogDelete }) => {
  const [visible, setVisible] = useState(false);

  const userId = blogService.getUserId();

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    likeUpdate(blog.id, updatedBlog);
  };

  const handleDelete = () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      blogDelete(blog.id);
    }
  };

  return (
    <div className='blog-btn'>
      <div>
        <h2>
          {blog.title}
          <button onClick={toggleVisibility}>
            {visible ? 'Hide' : 'Show'}
          </button>
        </h2>
        {visible && (
          <div>
            <h3>{blog.author}</h3>
            <p>{blog.url}</p>
            <p>
              <span>likes: {blog.likes}</span>
              <button onClick={handleLike}>Like</button>
            </p>
            <div>
              <h4>Posted by {blog.user.name ? blog.user.name : 'Anonymous'}</h4>
              {blog.user.id === userId && (
                <button onClick={handleDelete}>Delete</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
