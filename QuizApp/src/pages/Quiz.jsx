import { useState, useEffect } from "react";
import QuestionCard from "../components/QuestionCard.jsx";
const quizQuestions = [
  {
    id: 1,
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correctIndex: 3,
    difficulty: "easy",
  },
  {
    id: 2,
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style System",
      "Colorful Style Sheets",
    ],
    correctIndex: 1,
    difficulty: "easy",
  },
  {
    id: 3,
    question: "Which HTML tag is used to define an internal style sheet?",
    options: ["<script>", "<style>", "<css>", "<link>"],
    correctIndex: 1,
    difficulty: "medium",
  },
  {
    id: 4,
    question: "Which company developed the React library?",
    options: ["Google", "Facebook", "Twitter", "Microsoft"],
    correctIndex: 1,
    difficulty: "medium",
  },
  {
    id: 5,
    question: "What is the command to create a new React app using Vite?",
    options: [
      "npx create-react-app app",
      "npm create vite@latest",
      "yarn create react-app",
      "npx vite create",
    ],
    correctIndex: 1,
    difficulty: "hard",
  },
  {
    id: 6,
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<js>", "<javascript>", "<scripting>", "<script>"],
    correctIndex: 3,
    difficulty: "easy",
  },
  {
    id: 7,
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: ["//", "<!-- -->", "##", "--"],
    correctIndex: 0,
    difficulty: "easy",
  },
  {
    id: 8,
    question: "Which React hook is used to perform side effects?",
    options: ["useState", "useEffect", "useReducer", "useMemo"],
    correctIndex: 1,
    difficulty: "medium",
  },
  {
    id: 9,
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["Undefined", "Number", "Boolean", "Float"],
    correctIndex: 3,
    difficulty: "medium",
  },
  {
    id: 10,
    question: "Which CSS property controls the text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    correctIndex: 2,
    difficulty: "easy",
  },
];

import { useNavigate } from "react-router-dom";
function Quiz() {
  
  const [questions,setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const total = questions.length;

  useEffect(() => {
    fetch('questions.json')
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setAnswers(Array(data.length).fill(null)); 
      })
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);
  

  function handleSelect(optIdx) {
    const newAnswers = [...answers];
    newAnswers[index] = optIdx;
    setAnswers(newAnswers);
    setSelected(optIdx);
  }

  function handleNext() {
    if (index < total - 1) {
      setIndex((prev) => prev + 1);
      setSecondsLeft(30);
    } else {
      
      navigate("/result", { state: { answers, questions } });
    }
  }
  useEffect(() => {
    if (secondsLeft <= 0) {
      handleNext();
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);
  return (
    
    <div className="bg-black  w-screen h-screen flex flex-col  justify-center items-center ">
       {questions.length > 0 ? (
        <>
      <QuestionCard
        q={questions[index]}
        currentIndex={index}
        total={questions.length}
        secondsLeft={secondsLeft}
        selected={selected}
        handleSelect={handleSelect}
      />

      <button
        onClick={handleNext}
        className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-900 text-lg cursor-pointer mx-2 font-semibold text-white"
      >
        {index === questions.length - 1 ? "Finish" : "Next"}
      </button>
      </>) : (
        <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-t-transparent border-purple-600 rounded-full animate-spin"></div>
        <p className="text-white text-lg mt-4">Loading questions...</p>
      </div>

      )
       }
    </div>
  );
}


export default Quiz;
