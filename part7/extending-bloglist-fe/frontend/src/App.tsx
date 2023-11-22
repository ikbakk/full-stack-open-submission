import { useContext, useState } from 'react';
import { AppContext } from './contexts/AppContext';
import AddBlogForm from './components/AddBlogForm';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';

function App() {
  const [newBlog, setnewBlog] = useState(false);
  const [login, setLogin] = useState(false);
  const { user } = useContext(AppContext);
  const status = user ? `${user.name} is logged in` : 'you are not logged in';

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-semibold">Blogs</h2>
        <p className="capitalize">{status}</p>
        {!user && login && <LoginForm />}
        {!user && (
          <button
            onClick={() => setLogin(!login)}
            className="bg- rounded-md bg-slate-200 px-4 py-2"
          >
            {login ? 'close login form' : 'open login form'}
          </button>
        )}
      </div>
      {user && (
        <div>
          {newBlog && <AddBlogForm />}
          <button
            className="bg-rounded-md  bg-red-200 px-4 py-2"
            onClick={() => setnewBlog(!newBlog)}
          >
            {newBlog ? 'cancel' : 'create'}
          </button>
        </div>
      )}
      <div>
        <Blogs />
      </div>
    </div>
  );
}

export default App;
