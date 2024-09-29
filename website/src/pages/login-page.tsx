import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useUser, useUserDispatch } from '../data/user-context';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const LoginPage = () => {
  const [userInput, setUserInput] = useState('');
  const user = useUser();
  const userDispatch = useUserDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) navigate('/');
  }, [user]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (userInput.trim().length === 0 || userDispatch === null) return;
    userDispatch({ type: 'login', username: userInput.trim() });
  };

  return (
    <Container>
      <h2>Login page</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input id="username" value={userInput} onChange={(event) => setUserInput(event.target.value)}/>
        </div>

        <input type="submit" value="Submit"/>
      </form>
    </Container>
  );
};

export default LoginPage;
