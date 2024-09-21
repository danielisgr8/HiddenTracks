import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../data/user-context';

const ConversationsPage = () => {
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) navigate('/login');
  }, [user]);

  return (
    <div>
      <h2>Conversations page</h2>
      <p>User: {user}</p>
    </div>
  );
};

export default ConversationsPage;
