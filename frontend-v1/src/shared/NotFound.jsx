import React from "react";
import { Link } from "react-router-dom";
import { CornerDownLeft } from "lucide-react";

function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-primary">
      <div className="max-w-md w-full p-5 bg-white rounded shadow text-center">
        <h1 className="text-4xl font-bold mb-4 text-red-600">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-4">
          Oops! The page you are looking for doesn't exist.
        </p>
        <Link to="/login" className="text-dark flex justify-center underline">
          <CornerDownLeft /> Return to login page
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
