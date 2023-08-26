import { Container } from "reactstrap";
import { styled } from "styled-components";

export const MainContainer = styled(Container)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const Side = styled.div`
  flex: 1;
  padding: 20px;
`;

export const LeftSide = styled(Side)`
  background-color: #f0f0f0;
  flex: 65%;
`;

export const RightSide = styled(Side)`
  background-color: #e0e0e0;
  flex: 35%;
`;