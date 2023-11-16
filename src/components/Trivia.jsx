import { useState, useEffect } from "react";
import "./Trivia.css";
import GameOver from "./GameOver";

const Trivia = () => {
  const [questions, setQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [displayCheck, setDisplayCheck] = useState(false);
  const [count, setCount] = useState(2);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Fisher-Yates shuffle function
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Fetch trivia questions
  const fetchQuestions = () => {
    fetch("https://the-trivia-api.com/api/questions?limit=2")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching a response");
        }
        return response.json();
      })
      .then((data) => {
        // Shuffle the answers, including the correct answer
        const shuffledQuestions = data.map((question) => {
          return {
            ...question,
            answers: shuffleArray([
              ...question.incorrectAnswers,
              question.correctAnswer,
            ]),
          };
        });
        setQuestions(shuffledQuestions);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAnswer = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const checkAnswer = () => {
    const correctAnswer = questions[currentQuestion].correctAnswer;
    const isAnswerCorrect = selectedAnswer === correctAnswer;
    setIsCorrect(isAnswerCorrect);

    // Increment the score if the answer is correct
    if (isAnswerCorrect) setScore((prevScore) => prevScore + 1);

    // Set variable to true in order to hide check button
    setDisplayCheck(!displayCheck);

    // Decrement count
    setCount((prevCount) => prevCount - 1);

    // Set gameOver true after 10 questions
    if (count === 1) setGameOver(true);
  };

  const nextQuestion = () => {
    setCurrentQuestion((currentQuestion + 1) % questions.length);
    setSelectedAnswer("");
    setIsCorrect(null);

    // Allow display check button
    setDisplayCheck(false);
  };

  if (!questions) {
    return <div>Loading...</div>;
  }

  console.log(gameOver);

  return (
    <>
      {gameOver ? (
        <GameOver />
      ) : (
        <div className="trivia-container">
          <h1>Welcome to Trivia</h1>
          {questions && questions[currentQuestion] ? (
            <>
              {count > 0 && <h2>{questions[currentQuestion].question}</h2>}

              {questions[currentQuestion].answers &&
              questions[currentQuestion].answers.length > 0 ? (
                <ul>
                  {questions[currentQuestion].answers.map((answer, index) => (
                    <li key={index}>
                      <input
                        type="radio"
                        value={answer}
                        checked={selectedAnswer === answer}
                        onChange={handleAnswer}
                      />
                      {answer}
                    </li>
                  ))}
                </ul>
              ) : (
                <div>No answers available for this question.</div>
              )}

              {selectedAnswer && !displayCheck && (
                <button onClick={checkAnswer}>Check</button>
              )}

              {isCorrect !== null && (
                <div>
                  {isCorrect ? "Correct!" : "Incorrect!"}

                  {count > 0 && (
                    <button onClick={nextQuestion}>Next Question</button>
                  )}
                </div>
              )}
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      )}
    </>
  );
};

export default Trivia;
<GameOver />;
