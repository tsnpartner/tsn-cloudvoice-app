import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Loader } from "lucide-react"; // Loader icon for animation

function UnderConstructionPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-center p-4">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
        <Loader className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Coming Soon</h1>
        <p className="text-gray-600 mb-4">
          This page is under construction. We're working hard to launch soon!
        </p>
        <Button
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() => navigate("/dashboard")}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}

export default UnderConstructionPage;
