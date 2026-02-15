import "../App.css";
import GameRunner from "./GameRunner";
import HUD from "./HUD";

function App() {
  return (
    <div className="App">
      <HUD />
      <div className="table">
        <div className="game">
          <GameRunner />
        </div>
      </div>
    </div>
  );
}

export default App;
