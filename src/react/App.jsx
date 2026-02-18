import { useRef, useState } from "react";
import "./App.css";
import GameRunner from "./game/GameRunner";
import HUD from "./components/HUD/HUD";
import VirtualGamePad from "./components/VirtualGamePad/VirtualGamePad";
import PauseButton from "./components/PauseButton/PauseButton";
import VictoryScreen from "./components/VictoryScreen/VictoryScreen";

function App() {
  const addCoinRef = useRef(null);
  const hudRef = useRef(null);
  const [player, setPlayer] = useState(null);

  return (
    <div className="App">
      <HUD coinsRef={addCoinRef} ref={hudRef} player={player} />
      <div className="table">
        <div className="game">
          <GameRunner
            addCoin={addCoinRef}
            hudRef={hudRef}
            setPlayer={setPlayer}
          />
        </div>
      </div>
      <VictoryScreen />
      <VirtualGamePad />
      <PauseButton />
    </div>
  );
}

export default App;
