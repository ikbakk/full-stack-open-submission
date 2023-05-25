import { useState } from 'react';

const Blog = ({ blog, likeUpdate }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    likeUpdate(blog.id, updatedBlog);
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
