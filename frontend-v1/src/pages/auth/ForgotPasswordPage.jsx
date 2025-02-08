// import React, { useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import { forgotPassword } from "../../api/login-service"; // Import API
// import { Label } from "../../components/ui/label";
// import { Input } from "../../components/ui/input";
// import { Button } from "../../components/ui/button";
// import { Link } from "react-router-dom";
// import { CornerDownLeft } from "lucide-react";

// function ForgotPassword() {
//   const navigate = useNavigate();
//   const [statusMessage, setStatusMessage] = useState({
//     success: "",
//     error: "",
//   });

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//     },
//     validationSchema: Yup.object({
//       email: Yup.string()
//         .email("Invalid email address")
//         .required("Email is required"),
//     }),
//     onSubmit: async (values, { setSubmitting }) => {
//       setStatusMessage({ success: "", error: "" });

//       try {
//         const response = await forgotPassword(values);

//         // Extract reset token from API response (assuming it's in response.data.token)
//         const resetToken = response.data.token;
//         setStatusMessage({ success: response.data.message, error: "" });

//         // Redirect to reset password page with the token
//         navigate(`/reset-password/${resetToken}`);
//       } catch (error) {
//         setStatusMessage({
//           success: "",
//           error: error.response?.data?.message || "Failed to send reset email.",
//         });
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   return (
//     <div className="flex items-center justify-center min-h-screen p-4 bg-primary">
//       <div className="max-w-md w-full p-5 bg-white rounded shadow">
//         <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
//         <form onSubmit={formik.handleSubmit}>
//           <div className="mb-4">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               name="email"
//               type="email"
//               value={formik.values.email}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               placeholder="example@example.com"
//               className="mt-1"
//             />
//             {formik.touched.email && formik.errors.email && (
//               <p className="text-red-600 mt-1">{formik.errors.email}</p>
//             )}
//           </div>
//           <Button type="submit" disabled={formik.isSubmitting}>
//             {formik.isSubmitting ? "Sending..." : "Send Reset Email"}
//           </Button>

//           {/* Success/Error Messages */}
//           {statusMessage.success && (
//             <p className="text-green-500 mt-2">{statusMessage.success}</p>
//           )}
//           {statusMessage.error && (
//             <p className="text-red-500 mt-2">{statusMessage.error}</p>
//           )}
//         </form>
//         <br />
//         <Link to="/login" className="text-dark flex underline">
//           <CornerDownLeft /> Return to login page
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default ForgotPassword;

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../api/login-service"; // Import API
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { CornerDownLeft } from "lucide-react";

function ForgotPassword() {
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState({
    success: "",
    error: "",
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setStatusMessage({ success: "", error: "" });

      try {
        await forgotPassword(values); // Assuming this sends the reset email
        navigate("/reset-password-confirmation"); // Redirect to confirmation page
      } catch (error) {
        setStatusMessage({
          success: "",
          error: error.response?.data?.message || "Failed to send reset email.",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-primary">
      <div className="max-w-md w-full p-5 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="example@example.com"
              className="mt-1"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-600 mt-1">{formik.errors.email}</p>
            )}
          </div>
          <Button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Sending..." : "Send Reset Email"}
          </Button>

          {/* Success/Error Messages */}
          {statusMessage.error && (
            <p className="text-red-500 mt-2">{statusMessage.error}</p>
          )}
        </form>
        <br />
        <Link to="/login" className="text-dark flex underline">
          <CornerDownLeft /> Return to login page
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
