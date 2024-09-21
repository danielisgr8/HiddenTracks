import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/error-page';
import LoginPage from './pages/login-page';
import NewConversationPage from './pages/new-conversation-page';
import ConversationPage from './pages/conversation-page';
import ConversationsPage from './pages/conversations-page';
import Root from './pages/root';
import { UserProvider } from './data/user-context';

import './app.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ConversationsPage />
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'conversation/new',
        element: <NewConversationPage />,
      },
      {
        path: 'conversation/:id',
        element: <ConversationPage />
      },
    ]
  },
]);

const App = () => (
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);

export default App;
