import styled from 'styled-components';

export const AuthenticationContainer = styled.div`
  display: flex;
  gap: 10%;
  justify-content: center;

  @media screen and (max-width: 800px) {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;
