import { useEffect, useState } from "react";
import Square from "./Square";

// Define the possible values for a player
type Player = "X" | "O" | null | string;

const Board = () => {
  // State to keep track of the squares in the board
  const [squares, setSquares] = useState(Array(9).fill(null));

  // State to keep track of the current player
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(
    Math.round(Math.random() * 1) === 1 ? "X" : "O"
  );

  // State to store the winner of the game
  const [winner, setWinner] = useState<Player>(null);

  // Function to set the value of a square when clicked
  const setSquareValue = (index: number): void => {
    const newData = squares.map((val: string, i: number): string => {
      if (i === index) {
        return currentPlayer;
      }
      return val;
    });
    setSquares(newData);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  // Function to reset the game
  const reset = () => {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O");
  };

  // Function to determine the winner of the game
  const setGameWinner = (squares: Player[]) => {
    const winningCombinations = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal from top-left to bottom-right
      [2, 4, 6], // Diagonal from top-right to bottom-left
    ];

    // Check each winning combination
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]; // Return the winner (either "X" or "O")
      }
    }

    return null;
  };

  // useEffect hook to check for a winner or tie after every update
  useEffect(() => {
    const w = setGameWinner(squares);
    if (w) {
      setWinner(w);
    }
    if (!w && !squares.filter((square) => !square).length) {
      setWinner("Tie");
    }
  });

  return (
    <div className="App">
      {/* Display current player's turn */}
      {!winner && <p>Hey {currentPlayer}, it's your turn</p>}

      {/* Display the winner */}
      {winner && winner !== "Tie" && <p>Congratulations {winner}, you won</p>}

      {/* Display tie message */}
      {winner && winner === "Tie" && <p>It's a tie</p>}

      <div className="grid">
        {/* Render squares */}
        {Array(9)
          .fill(null)
          .map((_, i) => {
            return (
              <Square
                key={i}
                onClick={() => setSquareValue(i)}
                value={squares[i]}
                winner={winner}
              />
            );
          })}
      </div>

      {/* Reset button */}
      <div className="btn">
        <button className="reset" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Board;
