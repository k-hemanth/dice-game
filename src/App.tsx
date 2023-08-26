import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "reactstrap";
import { format } from "date-fns";
import "bootstrap/dist/css/bootstrap.min.css";

import HomeView from "./components/views/HomeView";
import ModalBox from "./components/common/ModalBox";
import { ButtonData } from "./types";

const MainContainer = styled(Container)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const DEFAULT_TIMER_FOR_BETTING = 10;

const DEFAULT_BET_DICES_DATA: ButtonData[] = [
  { diceValue: 1, count: 0 },
  { diceValue: 2, count: 0 },
  { diceValue: 3, count: 0 },
  { diceValue: 4, count: 0 },
  { diceValue: 5, count: 0 },
  { diceValue: 6, count: 0 },
];

const App: FC = () => {
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
            setEnableIncrementButton(true);
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

  const handleIncrement = (diceValue: number) => {
    const updatedButtons = dicesData.map((item) =>
      item.diceValue === diceValue ? { ...item, count: item.count + 1 } : item
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
      <HomeView
        walletBalance={walletBalance}
        gameStarted={gameStarted}
        diceNumber={diceNumber}
        rolling={rolling}
        progress={progress}
        timeLeft={timeLeft}
        handleStartGame={handleStartGame}
        dicesData={dicesData}
        handleIncrement={handleIncrement}
        enableIncrementButton={enableIncrementButton}
        historyBalance={historyBalance}
      />
      <ModalBox
        currentGameBalance={currentGameBalance}
        showModel={showModel}
        toggle={toggle}
        walletBalance={walletBalance}
      />
    </MainContainer>
  );
};

export default App;
