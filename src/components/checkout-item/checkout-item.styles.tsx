import styled from 'styled-components';

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`;

export const Image = styled.div`
  width: 23%;
  padding-right: 15px;

  img {
    width: 80%;
  }
`;

export const BaseSpan = styled.span`
  width: 23%;

  span {
    margin-left: 15%;
  }
`;

export const Quantity = styled(BaseSpan)`
  display: flex;
`;

export const Arrow = styled.div`
  cursor: pointer;
  margin: 0 0.7rem;

  @media screen and (max-width: 800px) {
    margin: 0;
  }
`;

export const Value = styled.span`
  margin: 0 10px;
`;

export const RemoveButton = styled.div`
  margin-left: 1%;
  cursor: pointer;

  @media screen and (max-width: 800px) {
    margin: 0 3%;
  }
`;
