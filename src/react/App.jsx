import { useRef } from "react";
import "./App.css";
import GameRunner from "./game/GameRunner";
import HUD from "./components/HUD/HUD";
import VirtualGamePad from "./components/VirtualGamePad/VirtualGamePad";
import PauseButton from "./components/PauseButton/PauseButton";

function App() {
  const addCoinRef = useRef(null);
  const hudRef = useRef(null);

  return (
    <div className="App">
      <HUD coinsRef={addCoinRef} ref={hudRef} />
      <div className="table">
        <div className="game">
          <GameRunner addCoin={addCoinRef} hudRef={hudRef} />
        </div>
      </div>
      <VirtualGamePad />
      <PauseButton />
    </div>
  );
}

export default App;
