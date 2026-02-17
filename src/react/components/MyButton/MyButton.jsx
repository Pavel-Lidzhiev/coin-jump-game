import "./MyButton.css";

export default function MyButton({
  direction,
  active,
  onPressStart,
  onPressEnd,
  children,
}) {
  return (
    <button
      className={`arrow-btn ${active ? "active" : ""}`}
      onMouseDown={() => onPressStart(direction)}
      onMouseUp={() => onPressEnd(direction)}
      onMouseLeave={() => onPressEnd(direction)}
      onTouchStart={() => onPressStart(direction)}
      onTouchEnd={() => onPressEnd(direction)}
    >
      {children}
    </button>
  );
}
