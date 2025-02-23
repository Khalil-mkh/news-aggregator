import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-tarawera-500">
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
        <img
          src="/src/assets/logo.svg"
          alt="Logo"
          className="h-8 w-auto sm:h-12"
        />
      </div>

      <div className="flex flex-col items-center justify-center flex-grow px-4">
        <h1 className="text-4xl font-bold text-gray-50 sm:text-6xl">404</h1>
        <p className="mt-4 text-lg text-gray-50 text-center sm:text-xl">
          We can't seem to find the page you're looking for!
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-4 py-2 bg-tarawera-400 text-white rounded-lg hover:bg-tarawera-700 transition-colors sm:mt-8 sm:px-6 sm:py-2"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
