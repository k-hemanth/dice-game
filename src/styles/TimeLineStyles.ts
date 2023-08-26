import { css, styled } from "styled-components";
import { TimelineEntryProps } from "../types";

export const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const positiveStyle = css`
  background-color: lightgreen;
`;

export const negativeStyle = css`
  background-color: lightcoral;
`;

export const TimelineEntry = styled.div<TimelineEntryProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  margin: 5px 0;

  ${({ balance }) => {
    return balance >= 0 ? positiveStyle : negativeStyle;
  }}
`;
