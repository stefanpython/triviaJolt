import "./GameOver.css";

function GameOver() {
  return (
    <div className="game-over">
      <h1>Game Over</h1>
      <p>Your final score is:</p>

      <h4>Think you can do better ?</h4>
      <button className="again-btn" onClick={() => window.location.reload()}>
        Play again
      </button>
    </div>
  );
}

export default GameOver;
