import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Quiz from './pages/Quiz';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "quiz",
    element: <Quiz />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);


