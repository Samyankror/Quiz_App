function QuestionCard({
  q,
  currentIndex,
  total,
  secondsLeft,
  selected,
  handleSelect,
}) {
  return (
    <div className="max-w-[400px] w-full bg-[#1a1a1a] text-white p-6 rounded-2xl shadow-md mb-2">
      <div className="flex  justify-between mb-4">
        <div className="text-lg font-semibold">
          Question {currentIndex + 1} of {total}
        </div>
        <div>
          <div className="font-medium">
            Difficulty :{" "}
            <span
              className={`font-semibold ${
                q.difficulty === "hard"
                  ? "text-red-600"
                  : q.difficulty === "medium"
                  ? "text-orange-600"
                  : "text-blue-500"
              }`}
            >
              {q.difficulty}
            </span>
          </div>
          {typeof secondsLeft === "number" && (
            <div className=" font-medium">Time: {secondsLeft}s</div>
          )}
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-4 ">{q.question}</h2>

      <div className="grid gap-3">
        {q.options.map((opt, idx) => {
          const isSelected = selected === idx;
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`text-left p-3 rounded-lg border  cursor-pointer
            ${
              isSelected
                ? " focus:ring-2 focus:ring-offset-1 transition-all  text-white"
                : "text-white bg-[#1a1a1a]"
            }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuestionCard;
