import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConversationSummary } from '@danielisgr8/hidden-tracks-client';
import { useUser } from '../../data/user-context';
import Conversation from './conversation';

const ConversationsPage = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);

  useEffect(() => {
    if (user === null) navigate('/login');
  }, [user]);

  useEffect(() => {
    if (user === null) return;
    // TODO: Make actual call to service
    setConversations([{ conversationId: 'asdf', recipients: ['daniel', 'greg'], encodingFormat: '1' }]);
  }, []);

  return (
    <div>
      <h2>Conversations</h2>
      <p>User: {user}</p>

      {conversations.map((conversation) => (
        <Conversation conversation={conversation} key={conversation.conversationId} />
      ))}
    </div>
  );
};

export default ConversationsPage;
