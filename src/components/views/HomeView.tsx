import { FC } from "react";
import { Col, Row } from "reactstrap";
import HistoryTimeline from "../HistoryTimeline";
import SidePanel from "../SidePanel";
import { ButtonData, THistoryBalance } from "../../types";

interface IHomeViewProps {
  walletBalance: number;
  gameStarted: boolean;
  diceNumber: number;
  rolling: boolean;
  progress: number;
  timeLeft: number;
  handleStartGame: () => void;
  dicesData: ButtonData[];
  handleIncrement: (diceValue: number) => void;
  enableIncrementButton: boolean;
  historyBalance: THistoryBalance[];
}

const HomeView: FC<IHomeViewProps> = ({
  walletBalance,
  gameStarted,
  diceNumber,
  rolling,
  progress,
  timeLeft,
  handleStartGame,
  dicesData,
  handleIncrement,
  enableIncrementButton,
  historyBalance,
}) => {
  return (
    <Row>
      <Col sm="9" style={{ backgroundColor: "#f0f0f0" }}>
        <SidePanel
          walletBalance={walletBalance}
          gameStarted={gameStarted}
          diceNumber={diceNumber}
          rolling={rolling}
          handleStartGame={handleStartGame}
          dicesData={dicesData}
          handleIncrement={handleIncrement}
          enableIncrementButton={enableIncrementButton}
          progress={progress}
          timeLeft={timeLeft}
        />
      </Col>
      <Col sm="3" style={{ backgroundColor: "#e0e0e0" }}>
        <HistoryTimeline historyBalance={historyBalance} />
      </Col>
    </Row>
  );
};

export default HomeView;
