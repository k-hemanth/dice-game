import React, { FC, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import {
  Button,
  Card,
  CardText,
  CardTitle,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Progress,
  Row,
} from "reactstrap";
import { FaDollarSign, FaWallet } from "react-icons/fa";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dice from "./components/common/Dice";
import { format } from "date-fns";

const MainContainer = styled(Container)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Side = styled.div`
  flex: 1;
  padding: 20px;
`;

const LeftSide = styled(Side)`
  background-color: #f0f0f0;
  flex: 65%;
`;

const RightSide = styled(Side)`
  background-color: #e0e0e0;
  flex: 35%;
`;

const WelcomeBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const WalletInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Amount = styled.h4`
  margin-right: 10px;
`;

const CenteredDiv = styled.div`
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CircleContainer = styled.div`
  position: relative;
  width: 104px;
  height: 104px;
`;

const TimerText = styled.div`
  position: absolute;
  color: black;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
`;

interface TimelineEntryProps {
  balance: number;
}

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const positiveStyle = css`
  background-color: lightgreen;
`;

const negativeStyle = css`
  background-color: lightcoral;
`;

const TimelineEntry = styled.div<TimelineEntryProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  margin: 5px 0;

  ${(props) => (props.balance >= 0 ? positiveStyle : negativeStyle)}
`;

interface ButtonData {
  diceValue: number;
  count: number;
}

const DEFAULT_TIMER_FOR_BETTING = 2;

const DEFAULT_BET_DICES_DATA: ButtonData[] = [
  { diceValue: 1, count: 0 },
  { diceValue: 2, count: 0 },
  { diceValue: 3, count: 0 },
  { diceValue: 4, count: 0 },
  { diceValue: 5, count: 0 },
  { diceValue: 6, count: 0 },
];

const ModelBox: FC<{
  showModel: boolean;
  toggle: () => void;
  walletBalance: number;
  currentGameBalance: number;
}> = ({ showModel, toggle, walletBalance, currentGameBalance }) => {
  useEffect(() => {
    if (showModel) {
      const timeout = setTimeout(() => {
        toggle();
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [showModel]);

  return (
    <Modal
      isOpen={showModel}
      toggle={toggle}
      centered
      keyboard={false}
      backdrop="static"
    >
      <ModalHeader>Modal title</ModalHeader>
      <ModalBody>
        <h3>Updated Wallet Balance : ${walletBalance}</h3>
        <h3>Current game status : ${currentGameBalance}</h3>
      </ModalBody>
    </Modal>
  );
};

function App() {
  const [walletBalance, setWalletBalance] = useState<number>(100);
  const [progress, setProgress] = useState(100);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIMER_FOR_BETTING);
  const [rolling, setRolling] = useState(false);
  const [diceNumber, setDiceNumber] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [enableIncrementButton, setEnableIncrementButton] =
    useState<boolean>(true);
  const [showModel, setShowModel] = useState<boolean>(false);
  const [currentGameBalance, setCurrentGameBalance] = useState<number>(0);
  const [dicesData, setDicesData] = useState<ButtonData[]>(
    DEFAULT_BET_DICES_DATA
  );
  const [historyBalance, setHistoryBalance] = useState<
    { date: string; balance: number }[]
  >([]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (gameStarted) {
      interval = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
          setProgress(((timeLeft - 1) / 10) * 100);
        } else {
          if (interval) {
            clearInterval(interval);
            rollDice();
          }
        }
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timeLeft, gameStarted]);

  const handleStartGame = () => {
    setEnableIncrementButton(false);
    setGameStarted(true);
  };

  const updatedWalletBalance = (
    currentWalletBalance: number,
    bettingData: ButtonData[],
    diceValue: number
  ) => {
    let totalWinningBalance = 0;
    let totalLostBalance = 0;

    const updatedBalance = bettingData.reduce((acc, item) => {
      if (item.diceValue === diceValue) {
        const doubledCount = item.count * 2;
        totalWinningBalance += doubledCount;
        return acc + doubledCount;
      } else {
        totalLostBalance += item.count;
        return acc - item.count;
      }
    }, currentWalletBalance);

    return {
      updatedBalance,
      totalWinningBalance,
      totalLostBalance,
    };
  };
  const rollDice = () => {
    if (!rolling) {
      setRolling(true);
      const newNumber = Math.floor(Math.random() * 6) + 1;
      setEnableIncrementButton(true);
      setTimeout(() => {
        setDiceNumber(newNumber);
        setRolling(false);
        const { totalLostBalance, totalWinningBalance, updatedBalance } =
          updatedWalletBalance(walletBalance, dicesData, newNumber);
        setWalletBalance(updatedBalance);
        setCurrentGameBalance(totalWinningBalance - totalLostBalance);
        setHistoryBalance((prevState) => [
          ...prevState,
          {
            date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            balance: totalWinningBalance - totalLostBalance,
          },
        ]);
        showResult();
      }, 2000);
    }
  };

  const showResult = () => {
    setShowModel(true);
  };

  const handleIncrement = (index: number) => {
    const updatedButtons = dicesData.map((item, i) =>
      i === index ? { ...item, count: item.count + 1 } : item
    );

    setDicesData(updatedButtons);
  };

  const toggle = () => {
    setShowModel(false);
    setGameStarted(false);
    setTimeLeft(DEFAULT_TIMER_FOR_BETTING);
    setProgress(100);
    setRolling(false);
    setDicesData(DEFAULT_BET_DICES_DATA);
    setEnableIncrementButton(true);
    setCurrentGameBalance(0);
  };

  return (
    <MainContainer>
      <LeftSide>
        <WelcomeBar>
          <h4>Hello</h4>
          <WalletInfo>
            <Amount>${walletBalance}</Amount>
            <FaWallet size={24} />
          </WalletInfo>
        </WelcomeBar>

        <Row>
          <Col sm="12">
            <Card body>
              <CardText>
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
                      // padding: "20px",
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
                <Button
                  onClick={handleStartGame}
                  disabled={gameStarted}
                  color="info"
                >
                  Start Game
                </Button>
              </CenteredDiv>
            </Card>
          </Col>
        </Row>
        <Row style={{ paddingTop: "20px" }}>
          <Col sm="12">
            <Card body>
              <CardTitle tag="h5">
                {gameStarted
                  ? `Place you bet now...!!`
                  : `Start the game to place the bet`}
              </CardTitle>
              <CardText>
                <Row style={{ paddingTop: "20px" }}>
                  {dicesData.map((dice, index) => (
                    <Col sm={4} md={4} lg={4} key={index}>
                      <Dice value={dice.diceValue} rolling={false} />
                      <div style={{ padding: "20px" }}>
                        <Button
                          style={{ minWidth: "98px" }}
                          color="primary"
                          onClick={() => handleIncrement(index)}
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
          </Col>
        </Row>
      </LeftSide>
      <RightSide>
        <TimelineContainer>
          <h3>Balance History</h3>
          {historyBalance.map((entry, index) => (
            <TimelineEntry key={index} balance={entry.balance}>
              <div>{entry.date}</div>
              <div>{entry.balance}</div>
            </TimelineEntry>
          ))}
        </TimelineContainer>
      </RightSide>
      <ModelBox
        showModel={showModel}
        toggle={toggle}
        walletBalance={walletBalance}
        currentGameBalance={currentGameBalance}
      />
    </MainContainer>
  );
}

export default App;
