import { arrowKeys } from "../../../utils/constants";
import MyButton from "../MyButton/MyButton";
import useKeyboardControls from "../../../utils/hooks/useKeyboardControls";
import "./VirtualGamePad.css";

export default function VirtualGamePad() {
  const [activeKeys, pressStart, pressEnd] = useKeyboardControls({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  });

  const handlePressStart = (direction) => {
    arrowKeys[direction] = true;
    pressStart(direction);
  };

  const handlePressEnd = (direction) => {
    arrowKeys[direction] = false;
    pressEnd(direction);
  };

  return (
    <div className="virtual-gamepad">
      <div className="arrow-row">
        <MyButton
          direction="ArrowUp"
          active={activeKeys.ArrowUp}
          onPressStart={handlePressStart}
          onPressEnd={handlePressEnd}
        >
          ↑
        </MyButton>
      </div>

      <div className="arrow-row">
        <MyButton
          direction="ArrowLeft"
          active={activeKeys.ArrowLeft}
          onPressStart={handlePressStart}
          onPressEnd={handlePressEnd}
        >
          ←
        </MyButton>

        <MyButton
          direction="ArrowDown"
          active={activeKeys.ArrowDown}
          onPressStart={handlePressStart}
          onPressEnd={handlePressEnd}
        >
          ↓
        </MyButton>

        <MyButton
          direction="ArrowRight"
          active={activeKeys.ArrowRight}
          onPressStart={handlePressStart}
          onPressEnd={handlePressEnd}
        >
          →
        </MyButton>
      </div>
    </div>
  );
}
