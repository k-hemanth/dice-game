import { Button, Card, CardText, Col, Progress, Row } from "reactstrap";

import Dice from "../common/Dice";
import {
  CenteredDiv,
  CircleContainer,
  TimerText,
} from "../../styles/CommonStyles";
import { FC, memo } from "react";

interface IGameCardProps {
  diceNumber: number;
  rolling: boolean;
  progress: number;
  timeLeft: number;
  handleStartGame: () => void;
  gameStarted: boolean;
}

const GameCard: FC<IGameCardProps> = memo(
  ({
    diceNumber,
    rolling,
    progress,
    timeLeft,
    handleStartGame,
    gameStarted,
  }) => {
    return (
      <Card body>
        <CardText tag="div">
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Dice value={diceNumber} rolling={rolling} />
            </Col>
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CircleContainer>
                <Progress
                  value={progress}
                  color="info"
                  style={{ width: "104px", height: "104px" }}
                >
                  <TimerText>{timeLeft}s</TimerText>
                </Progress>
              </CircleContainer>
            </Col>
          </Row>
        </CardText>
        <CenteredDiv>
          <Button onClick={handleStartGame} disabled={gameStarted} color="info">
            Start Game
          </Button>
        </CenteredDiv>
      </Card>
    );
  }
);

export default GameCard;
