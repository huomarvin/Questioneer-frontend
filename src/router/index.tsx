import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Home } from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import NotFound from '@/pages/NotFound';
import ManageLayout from '@/layouts/ManageLayout';
import ManageList from '@/pages/ManageList';
import QuestionLayout from '@/layouts/QuestionLayout';
import QuestionEdit from '@/pages/QuestionEdit';

export const HOME_PATHNAME = '/';
export const LOGIN_PATHNAME = '/login';
export const REGISTER_PATHNAME = '/register';
export const MANAGE_INDEX_PATHNAME = '/manage';
export const LIST = 'list';
export const EDIT = 'edit';
export const TRASH = 'trash';
export const QUESTION_INDEX_PATHNAME = '/question';
export const MANAGE_LIST_PATHNAME = `${MANAGE_INDEX_PATHNAME}/${LIST}`;
export const QUESTION_EDIT_PATHNAME = `${QUESTION_INDEX_PATHNAME}/${EDIT}`;
export const MANAGE_TRASH_PATHNAME = `${MANAGE_INDEX_PATHNAME}/${TRASH}`;

export function isLoginOrRegister(pathname: string) {
  if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true;
  return false;
}

export function isNoNeedUserInfo(pathname: string) {
  if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true;
  return false;
}

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
  {
    path: QUESTION_INDEX_PATHNAME,
    element: <QuestionLayout />,
    children: [
      {
        path: `${EDIT}/:id`,
        element: <QuestionEdit />,
      },
    ],
  },
]);

export default router;
