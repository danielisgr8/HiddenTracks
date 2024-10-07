import React from 'react';
import { useParams } from 'react-router-dom';

const ConversationPage = () => {
  const params = useParams();
  const conversationId = params.id || 'unknown';

  return (
    <div>
      <h2>Conversation {conversationId}</h2>
    </div>
  );
};

export default ConversationPage;
