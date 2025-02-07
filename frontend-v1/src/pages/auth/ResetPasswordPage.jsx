import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/login-service"; // Import API
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

function ResetPasswordPage() {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState({
    success: "",
    error: "",
  });

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setStatusMessage({ success: "", error: "" });

      try {
        await resetPassword(token, values); // Call API with token
        setStatusMessage({
          success: "Password successfully reset!",
          error: "",
        });

        // Redirect to login after a short delay
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        setStatusMessage({
          success: "",
          error: error.response?.data?.message || "Failed to reset password.",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-primary">
      <div className="max-w-md w-full p-5 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="********"
              className="mt-1"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-600 mt-1">{formik.errors.password}</p>
            )}
          </div>

          <Button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>

          {/* Success/Error Messages */}
          {statusMessage.success && (
            <p className="text-green-500 mt-2">{statusMessage.success}</p>
          )}
          {statusMessage.error && (
            <p className="text-red-500 mt-2">{statusMessage.error}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
