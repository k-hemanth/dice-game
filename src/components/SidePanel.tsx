import  { FC } from "react";
import { Amount, WalletInfo, WelcomeBar } from "../styles/WelcomeBarStyles";
import GameCard from "./Game/GameCard";
import { FaWallet } from "react-icons/fa";
import { ButtonData } from "../types";
import GameDices from "./Game/GameDices";

interface ISidePanelProps {
  walletBalance: number;
  gameStarted: boolean;
  diceNumber: number;
  rolling: boolean;
  handleStartGame: () => void;
  dicesData: ButtonData[];
  handleIncrement: (diceValue: number) => void;
  enableIncrementButton: boolean;
  progress: number;
  timeLeft: number;
}

const SidePanel: FC<ISidePanelProps> = ({
  walletBalance,
  gameStarted,
  diceNumber,
  rolling,
  handleStartGame,
  dicesData,
  handleIncrement,
  enableIncrementButton,
  progress,
  timeLeft,
}) => {
  return (
    <div>
      <WelcomeBar>
        <h4>Hello</h4>
        <WalletInfo>
          <Amount>${walletBalance}</Amount>
          <FaWallet size={24} />
        </WalletInfo>
      </WelcomeBar>
      <GameCard
        diceNumber={diceNumber}
        rolling={rolling}
        progress={progress}
        timeLeft={timeLeft}
        handleStartGame={handleStartGame}
        gameStarted={gameStarted}
      />
      <GameDices
        gameStarted={gameStarted}
        dicesData={dicesData}
        handleIncrement={handleIncrement}
        enableIncrementButton={enableIncrementButton}
      />
    </div>
  );
};

export default SidePanel;
