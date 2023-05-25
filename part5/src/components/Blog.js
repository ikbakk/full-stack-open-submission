import { useState } from 'react';

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
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
            <p>likes: {blog.likes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
