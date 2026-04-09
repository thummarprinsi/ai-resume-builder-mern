
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">

      <div className="text-center max-w-lg w-full">

        {/* Logo / Brand */}
        <h1 className="text-blue-600 text-xl font-semibold mb-6">
          ResumeBuilder
        </h1>

        {/* 404 */}
        <h2 className="text-7xl md:text-8xl font-bold text-gray-800">
          404
        </h2>

        {/* Title */}
        <h3 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-700">
          Page not found
        </h3>

        {/* Description */}
        <p className="mt-3 text-gray-500">
          The page you are looking for might have been removed,
          renamed or temporarily unavailable.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">

          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go Home
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
          >
            Create Resume
          </button>

        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-gray-200"></div>

        {/* Footer Help Text */}
        <p className="mt-4 text-sm text-gray-400">
          Need help? Contact support
        </p>

      </div>
    </div>
  );
};

export default NotFound;