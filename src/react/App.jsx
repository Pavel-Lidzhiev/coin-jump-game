import { useRef } from "react";
import "../App.css";
import GameRunner from "./GameRunner";
import HUD from "./HUD";

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
    </div>
  );
}

export default App;
