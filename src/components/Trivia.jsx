import { useState, useEffect } from "react";
import "./Trivia.css";

const Trivia = () => {
  const [questions, setQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Fetch trivia questions
  const fetchQuestions = () => {
    fetch("https://the-trivia-api.com/api/questions?limit=10")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching a response");
        }
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
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
    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const nextQuestion = () => {
    setCurrentQuestion((currentQuestion + 1) % questions.length);
    setSelectedAnswer("");
    setIsCorrect(null);
  };

  if (!questions) {
    return <div>Loading...</div>;
  }

  console.log(score);

  return (
    <div className="Trivia">
      {questions && questions[currentQuestion] ? (
        <>
          <h2>{questions[currentQuestion].question}</h2>
          {questions[currentQuestion].incorrectAnswers &&
          questions[currentQuestion].incorrectAnswers.length > 0 ? (
            <ul>
              {questions[currentQuestion].incorrectAnswers.map(
                (answer, index) => (
                  <li key={index}>
                    <input
                      type="radio"
                      value={answer}
                      checked={selectedAnswer === answer}
                      onChange={handleAnswer}
                    />
                    {answer}
                  </li>
                )
              )}
              {/* Include the correct answer as an option */}
              <li>
                <input
                  type="radio"
                  value={questions[currentQuestion].correctAnswer}
                  checked={
                    selectedAnswer === questions[currentQuestion].correctAnswer
                  }
                  onChange={handleAnswer}
                />
                {questions[currentQuestion].correctAnswer}
              </li>
            </ul>
          ) : (
            <div>No answers available for this question.</div>
          )}
          {selectedAnswer && <button onClick={checkAnswer}>Check</button>}
          {isCorrect !== null && (
            <div>
              {isCorrect ? "Correct!" : "Incorrect!"}
              <button onClick={nextQuestion}>Next Question</button>
            </div>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Trivia;
