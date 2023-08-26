import { styled } from "styled-components";

export const CenteredDiv = styled.div`
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CircleContainer = styled.div`
  position: relative;
  width: 104px;
  height: 104px;
`;

export const TimerText = styled.div`
  position: absolute;
  color: black;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
`;
