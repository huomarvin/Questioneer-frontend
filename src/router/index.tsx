import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Home } from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import NotFound from '@/pages/NotFound';
import ManageLayout from '@/layouts/ManageLayout';
import ManageList from '@/pages/ManageList';

export const HOME_PATHNAME = '/';
export const LOGIN_PATHNAME = '/login';
export const REGISTER_PATHNAME = '/register';
export const MANAGE_INDEX_PATHNAME = '/manage';
export const LIST = 'list';
export const MANAGE_LIST_PATHNAME = `${MANAGE_INDEX_PATHNAME}/${LIST}`;

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: HOME_PATHNAME,
        element: <Home />,
      },
      {
        path: LOGIN_PATHNAME,
        element: <Login />,
      },
      {
        path: REGISTER_PATHNAME,
        element: <Register />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
      {
        path: MANAGE_INDEX_PATHNAME,
        element: <ManageLayout />,
        children: [
          {
            path: LIST,
            element: <ManageList />,
          },
        ],
      },
    ],
  },
]);

export default router;
