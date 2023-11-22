import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { AppProvider } from './contexts/AppContext.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BlogDetail from './components/Blog.tsx';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/blogs/:blogId',
    element: <BlogDetail />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
