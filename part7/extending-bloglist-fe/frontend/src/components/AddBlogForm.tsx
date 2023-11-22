/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { create } from '../utils/blog';
import { useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContext';

// type AddBlogFormProps = {};

const AddBlogForm = () => {
  const { token } = useContext(AppContext);
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });
  const queryClient = useQueryClient();
  const blog = useMutation({
    mutationKey: ['blogMutation'],
    mutationFn: () => create(newBlog, token),
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs']) as any;
      queryClient.setQueryData(['blogs'], [...blogs, newBlog]);
      setNewBlog({
        title: '',
        author: '',
        url: '',
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    blog.mutate();
  };
  return (
    <div className="mb-4">
      <h2 className="text-3xl font-semibold">New blog</h2>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title</label>
          <input
            className="rounded-md bg-slate-400 p-2"
            placeholder="title"
            type="text"
            name="title"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="author">Author</label>
          <input
            className="rounded-md bg-slate-400 p-2"
            placeholder="author"
            type="text"
            name="author"
            value={newBlog.author}
            onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="url">Url</label>
          <input
            className="rounded-md bg-slate-400 p-2"
            placeholder="url"
            type="text"
            name="url"
            value={newBlog.url}
            onChange={(e) => setNewBlog({ ...newBlog, url: e.target.value })}
          />
        </div>
        <button className="w-full rounded-md bg-slate-200 px-4 py-2" type="submit">
          {blog.isPending ? 'Adding...' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default AddBlogForm;
