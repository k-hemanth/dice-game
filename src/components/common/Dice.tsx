import { FC, memo } from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";

const Pip = styled.div`
  display: block;
  align-self: center;
  justify-self: center;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #333;
`;

const Face = styled(animated.div)`
  display: grid;
  grid-template-areas:
    "a . c"
    "e g f"
    "d . b";

  flex: 0 0 auto;
  margin-left: 16px;
  padding: 10px;
  width: 104px;
  height: 104px;

  background-color: #e7e7e7;
  box-shadow: inset 0 5px white, inset 0 -5px #bbb, inset 5px 0 #d7d7d7,
    inset -5px 0 #d7d7d7;
  border-radius: 10%;

  & ${Pip}:nth-child(2) {
    grid-area: b;
  }

  & ${Pip}:nth-child(3) {
    grid-area: c;
  }

  & ${Pip}:nth-child(4) {
    grid-area: d;
  }

  & ${Pip}:nth-child(5) {
    grid-area: e;
  }

  & ${Pip}:nth-child(6) {
    grid-area: f;
  }

  & ${Pip}:nth-child(odd):last-child {
    grid-area: g;
  }
`;

const Dice: FC<{ value: number; rolling: boolean }> = memo(
  ({ value, rolling }) => {
    const rollAnimation = useSpring({
      transform: rolling ? "rotateX(1080deg)" : "rotateX(0deg)",
      config: { duration: rolling ? 1000 : 0 },
    });

    const pips = Number.isInteger(value)
      ? Array(value)
          .fill(0)
          .map((_, i) => <Pip key={i} />)
      : null;

    return <Face style={rollAnimation}>{pips}</Face>;
  }
);

export default Dice;
