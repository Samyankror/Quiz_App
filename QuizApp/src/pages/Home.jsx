import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-black  w-screen h-screen flex justify-center items-center ">
      <div className="bg-[#1a1a1a] shadow-lg rounded-lg py-10 px-30 text-center">
        <h1 className="text-4xl font-bold text-white mb-8">Quiz App</h1>
        <button
          onClick={() => navigate("/quiz")}
          className="bg-purple-600 hover:bg-purple-800 text-white font-semibold text-xl px-5 py-2 rounded cursor-pointer"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default Home;
