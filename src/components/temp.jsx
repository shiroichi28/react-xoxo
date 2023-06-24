type Player = "X" | "O" | null | string;

const getRandomPlayer = (): Player =>
  Math.round(Math.random()) === 1 ? "X" : "O";

const Square = ({
  value,
  onClick,
  winner,
}: {
  winner: Player,
  value: Player,
  onClick: () => void,
}) => {
  if (!value) {
    return (
      <button className="square" onClick={onClick} disabled={Boolean(winner)} />
    );
  }
  return (
    <button className={`square square_${value.toLowerCase()}`} disabled>
      {value}
    </button>
  );
};

const Board = () => {
  const [squares, setSquares] =
    useState < Array < Player >> Array(9).fill(null);
  const [currentPlayer, setCurrentPlayer] =
    useState < Player > getRandomPlayer();
  const [winner, setWinner] = useState < Player > null;

  const setSquareValue = (index: number): void => {
    if (squares[index] || winner) {
      return; // Square already filled or game ended
    }

    const newData = [...squares];
    newData[index] = currentPlayer;
    setSquares(newData);

    const gameWinner = setGameWinner(newData);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const reset = () => {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(getRandomPlayer());
  };

  const setGameWinner = (squares: Array<Player>): Player => {
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

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    if (!squares.includes(null)) {
      return "Tie";
    }

    return null;
  };

  const makeComputerMove = () => {
    if (winner || currentPlayer === "X") {
      return; // Game already ended or not the computer's turn
    }

    const emptySquares = squares.reduce(
      (acc: number[], square: Player, index: number) => {
        if (!square) {
          acc.push(index);
        }
        return acc;
      },
      []
    );

    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    const computerMove = emptySquares[randomIndex];

    setSquareValue(computerMove);
  };

  useEffect(() => {
    if (currentPlayer === "O") {
      makeComputerMove();
    }
  }, [currentPlayer]); // Run whenever the currentPlayer changes

  return (
    <div className="App">
      {!winner && <p>Hey {currentPlayer}, it's your turn</p>}
      {winner && winner !== "Tie" && <p>Congratulations {winner}, you won</p>}
      {winner && winner === "Tie" && <p>It's a Tie</p>}

      <div className="grid">
        {squares.map((value, index) => (
          <Square
            key={index}
            onClick={() => setSquareValue(index)}
            value={value}
            winner={winner}
          />
        ))}
      </div>
      <div className="btn">
        <button className="reset" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Board;
