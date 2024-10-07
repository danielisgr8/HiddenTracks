import React from 'react';
import { ConversationSummary } from '@danielisgr8/hidden-tracks-client';
import { useUser } from '../../data/user-context';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  border: 2px solid black;
  padding: 0.2rem;
`;

const ConversationLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

interface ConversationProps {
  conversation: ConversationSummary;
}

const Conversation = ({ conversation }: ConversationProps) => {
  const user = useUser();

  return (
    <ConversationLink to={`/conversation/${conversation.conversationId}`}>    
      <Container>
        <p>ID: {conversation.conversationId}</p>
        <p>Recipients: {conversation.recipients.filter((recipient) => recipient !== user).join(', ')}</p>
        <p>Encoding format: {conversation.encodingFormat}</p>
      </Container>
    </ConversationLink>
  );
}

export default Conversation;
