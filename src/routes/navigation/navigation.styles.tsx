import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NavigationContainer = styled.div`
  height: 6rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Navlinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 2.5%;
`;

export const Navlink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;

export const Logo = styled(Navlink)`
  height: 100%;
  width: 50px;
  padding: 1.5rem 0.3rem 0 0.3rem;
`;
