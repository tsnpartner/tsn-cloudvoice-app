import React from "react";
import { Link } from "react-router-dom";
import { CornerDownLeft } from "lucide-react";

function ResetPasswordConfirmation() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-primary">
      <div className="max-w-md w-full p-5 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Password Reset Email Sent
        </h1>
        <p className="text-center text-gray-600">
          Please check your email. A reset link has been sent to your email ID.
        </p>
        <br />
        <Link to="/login" className="text-dark flex justify-center underline">
          <CornerDownLeft /> Return to login page
        </Link>
      </div>
    </div>
  );
}

export default ResetPasswordConfirmation;
