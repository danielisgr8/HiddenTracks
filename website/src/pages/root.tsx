import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const RootContainer = styled.div`
  border: 3px solid black;
  margin: 0.5rem;
  padding: 0.5rem;
  height: calc(100vh - 2 * 0.5rem);
  width: calc(100vw - 2 * 0.5rem);
  max-width: calc(80vh - 2 * 0.5rem);
  box-sizing: border-box;
`;

const Root = () => (
  <RootContainer>
    <Outlet />
  </RootContainer>
);

export default Root;
