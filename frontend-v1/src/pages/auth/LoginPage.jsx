import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/login-service";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import logo from "../../assets/images/telesource-fevicon.png";

function Login() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setApiError(""); // Reset error state before API call
      try {
        const response = await login(values);
        console.log("Login Successful:", response.data);

        // Store user details and token
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);

        // Navigate to the Dashboard after login
        navigate("/dashboard", { replace: true });
      } catch (error) {
        console.error("Login Failed:", error.response?.data || error.message);
        setApiError(
          error.response?.data?.message || "Login failed. Please try again."
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side - Brand Info */}
      <div className="w-full md:w-1/2 p-8 bg-primary flex flex-col items-center justify-center">
        <img src={logo} alt="Logo" className="h-16 w-16 object-contain" />
        <p className="mt-4 text-center text-white">
          Effortlessly manage your customer relationships and business
          operations. Streamline tasks, track progress, and foster better
          connections. Your growth journey starts here!
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded shadow">
          <h1 className="text-2xl font-bold mb-6 text-center capitalize">
            Login
          </h1>
          {/* Show API error message */}
          {apiError && (
            <p className="text-red-600 text-center mb-4">{apiError}</p>
          )}
          <form onSubmit={formik.handleSubmit}>
            {/* Username Field */}
            <div className="mb-4">
              <Label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your username"
              />
              {formik.touched.username && formik.errors.username && (
                <p className="text-red-600 mt-1 text-sm">
                  {formik.errors.username}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="example@example.com"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-600 mt-1 text-sm">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="********"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-600 mt-1 text-sm">
                  {formik.errors.password}
                </p>
              )}
              <Link
                to="/forgot-password"
                className="mt-2 text-primary hover:underline text-sm flex justify-end"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
          {/* Signup Link */}
          <p className="mt-4 text-center">Don’t have an account?</p>{" "}
          <p className="mt-4 text-center">
            Send an email to HR to create:{" "}
            <span className="text-primary">
              <a href="mailto:hr@telesourcenow.com">hr@telesourcenow.com</a>
            </span>
          </p>{" "}
        </div>
      </div>
    </div>
  );
}

export default Login;
