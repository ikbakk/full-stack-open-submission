import { useQuery } from '@tanstack/react-query';
import { getAll } from '../utils/blog';
import Blog from '../interfaces/blogs';
import { Link } from 'react-router-dom';

const Blogs = () => {
  // const querClient = useQueryClient();
  const blogList = useQuery({
    queryKey: ['blogs'],
    queryFn: () => getAll(),
  });

  return (
    <div className="flex w-full flex-col">
      {blogList.isLoading ? (
        <div>Loading</div>
      ) : (
        blogList.data?.map((blog: Blog) => (
          <Link
            to={`/blogs/${blog.id}`}
            className="w-full p-2 text-xl font-semibold capitalize hover:bg-slate-200"
            key={blog.id}
          >
            {blog.title}
          </Link>
        ))
      )}
    </div>
  );
};

export default Blogs;
