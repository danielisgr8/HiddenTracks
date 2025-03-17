import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { UnstyledLink } from '../shared-components';

const RootContainer = styled.div`
  border: 3px solid black;
  margin: 0.5rem;
  height: calc(100vh - 2 * 0.5rem);
  width: calc(100vw - 2 * 0.5rem);
  max-width: calc(80vh - 2 * 0.5rem);
  box-sizing: border-box;
`;

const Header = styled.div`
  width: 100%;
  padding: 0.5rem;
  border-bottom: 3px solid black;
  box-sizing: border-box;
  text-align: center;
`;

const OutletContainer = styled.div`
  padding: 0.5rem;
`;

const Root = () => (
  <RootContainer>
    <Header>
      <UnstyledLink to='/'>
        <h2>Hidden Tracks</h2>
      </UnstyledLink>
    </Header>
    <OutletContainer>
      <Outlet />
    </OutletContainer>
  </RootContainer>
);

export default Root;
