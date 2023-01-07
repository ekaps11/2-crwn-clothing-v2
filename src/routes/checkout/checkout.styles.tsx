import styled from 'styled-components';

export const CheckoutContainer = styled.div`
  width: 90%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  margin: 0 4%;
`;

export const CheckoutHeader = styled.div`
  width: 100%;
  height: 3rem;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgrey;

  @media screen and (max-width: 800px) {
    div {
      span {
        width: 22%;
        font-size: 70%;
      }
    }
  }
`;

export const CheckoutTotal = styled.span`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;
`;
