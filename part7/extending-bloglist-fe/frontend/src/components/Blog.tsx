import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Blog from '../interfaces/blogs';

const BlogDetail = () => {
  const queryClient = useQueryClient();
  const { blogId } = useParams();
  const blogs = queryClient.getQueryData(['blogs']) as Blog[];
  const findBlog = blogs.find((b) => b.id === blogId);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      {findBlog && (
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold capitalize underline">{findBlog.title}</h1>
          <p>author: {findBlog.author}</p>
          <p>url: {findBlog.url}</p>
          <p>likes: {findBlog.likes}</p>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
