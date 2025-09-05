import { Link, useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const { answers, questions } = location.state || {
    answers: [],
    questions: [],
  };

  if (!answers.length || !questions.length) {
    return (
      <div className="p-8 max-w-xl mx-auto text-center">
        <h2 className="text-xl font-bold mb-4">No results to show</h2>
        <Link to="/quiz" className="px-4 py-2 rounded bg-indigo-600 text-white">
          Take Quiz
        </Link>
      </div>
    );
  }

  const correctCount = answers.reduce((acc, selectedIndex, i) => {
    if (selectedIndex === questions[i].correctIndex) return acc + 1;
    return acc;
  }, 0);

  function handleRestart() {
    navigate("/quiz");
  }

  return (
    <div className=" bg-black  mx-auto p-6 text-white flex  justify-center items-center">
      <div className="bg-[#1a1a1a] max-w-[900px] w-full p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-2">Your Score</h1>
        <p className="mb-4">
          You scored{" "}
          <span className="font-semibold">
            {correctCount}/{questions.length}
          </span>
        </p>

        <div className="space-y-3">
          {questions.map((q, i) => {
            const selectedIndex = answers[i];
            const correct = q.options[q.correctIndex];
            const selected =
              selectedIndex != null ? q.options[selectedIndex] : "(no answer)";
            const isRight = selectedIndex === q.correctIndex;

            return (
              <div key={i} className="p-3 rounded-lg border">
                <div className="font-medium">
                  {i + 1}. {q.question}
                </div>
                <div
                  className={` ${isRight ? "text-green-700" : "text-red-700"}`}
                >
                  Your answer: <span className="font-semibold">{selected}</span>
                </div>
                {!isRight && (
                  <div className="mt-1 text-white">
                    Correct: <span className="font-semibold">{correct}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleRestart}
            className="px-4 py-2 rounded bg-indigo-600 cursor-pointer text-white"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;
