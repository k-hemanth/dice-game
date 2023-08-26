import { FC } from "react";
import { FaDollarSign } from "react-icons/fa";
import { Button, Card, CardText, CardTitle, Col, Row } from "reactstrap";
import Dice from "../common/Dice";
import { ButtonData } from "../../types";

interface IGameDicesProps {
  gameStarted: boolean;
  dicesData: ButtonData[];
  handleIncrement: (diceValue: number) => void;
  enableIncrementButton: boolean;
}

const GameDices: FC<IGameDicesProps> = ({
  gameStarted,
  dicesData,
  handleIncrement,
  enableIncrementButton,
}) => {
  return (
    <Card body style={{ marginTop: "18px" }}>
      <CardTitle tag="h5">
        {gameStarted
          ? `Place you bet now...!!`
          : `Start the game to place the bet`}
      </CardTitle>
      <CardText tag="div" >
        <Row style={{ paddingTop: "20px" }}>
          {dicesData.map((dice) => (
            <Col sm={4} md={4} lg={4} key={dice.diceValue}>
              <Dice value={dice.diceValue} rolling={false} />
              <div style={{ padding: "20px" }}>
                <Button
                  style={{ minWidth: "98px" }}
                  color="primary"
                  onClick={() => handleIncrement(dice.diceValue)}
                  disabled={enableIncrementButton}
                >
                  <FaDollarSign />
                  {dice.count}
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </CardText>
    </Card>
  );
};

export default GameDices;
