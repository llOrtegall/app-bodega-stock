import { createBrowserRouter } from 'react-router-dom';
import { HomePage, NotFound } from '../Pages';
import { Root } from './root';
import axios from 'axios';

axios.defaults.withCredentials = true

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      }
    ],
  },
]);

export { router };
