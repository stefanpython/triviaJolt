import "./GameOver.css";

function GameOver({ score }) {
  return (
    <div className="game-over">
      <h1>Game Over</h1>
      <p className="score">Your final score is: {score} / 10</p>

      <h4>Think you can do better ?</h4>
      <button className="again-btn" onClick={() => window.location.reload()}>
        Play again
      </button>
    </div>
  );
}

export default GameOver;
