// Define the possible values for a player
type Player = "X" | "O" | null | string;

// Square component represents an individual square on the board
const Square = ({
  value,
  onClick,
  winner,
}: {
  winner: Player; // The winner of the game
  value: Player; // The value of the square ("X", "O", or null)
  onClick: () => void; // Function to handle click event
}) => {
  // If the square has no value (not filled), render a button that can be clicked
  if (!value) {
    return (
      <button className="square" onClick={onClick} disabled={Boolean(winner)} />
    );
  }

  // If the square has a value, render a disabled button with appropriate styling
  return (
    <button className={`square square_${value.toLowerCase()}`} disabled>
      {value}
    </button>
  );
};

export default Square;
