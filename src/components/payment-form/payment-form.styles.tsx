import styled from 'styled-components';
import Button from '../button/button.component';

export const PaymentFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10%;

  h2 {
    font-weight: lighter;
  }
`;

export const FormContainer = styled.form`
  height: 100px;
  min-width: 80%;
`;

export const PaymentButton = styled(Button)`
  margin-left: auto;
  margin-top: 30px;
`;
