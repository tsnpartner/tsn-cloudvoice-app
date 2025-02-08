import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { initiateCall } from "../../api/login-service"; // Import API function
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

function InitiateCall() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [statusMessage, setStatusMessage] = useState({
    success: "",
    error: "",
  });
  const [dialedNumber, setDialedNumber] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/login");
    } else {
      setToken(storedToken);
    }
  }, [navigate]);

  const handleDialPadClick = (digit) => {
    if (dialedNumber.length < 15) {
      const newNumber = dialedNumber + digit;
      setDialedNumber(newNumber);
      formik.setFieldValue("apartyno", newNumber);
    }
  };

  const handleResetDialPad = () => {
    setDialedNumber("");
    formik.setFieldValue("apartyno", "");
  };

  const formik = useFormik({
    initialValues: {
      cli: "7580812720", // Fixed CLI (hidden from UI)
      apartyno: "",
      bpartyno: "9028417996", // Fixed B Party Number (hidden from UI)
      reference_id: "123", // Fixed reference ID (hidden from UI)
    },
    validationSchema: Yup.object({
      apartyno: Yup.string()
        .matches(/^\d{5,15}$/, "Enter a valid phone number (5-15 digits)")
        .required("Number is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setStatusMessage({ success: "", error: "" });
      try {
        const response = await initiateCall(values, token);
        setStatusMessage({
          success: "Call Initiated Successfully!",
          error: "",
        });
        setDialedNumber("");
        formik.resetForm();
      } catch (error) {
        setStatusMessage({
          success: "",
          error: error.response?.data?.message || "Failed to initiate call.",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-primary">
      <div className="max-w-md w-full p-5 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Dial Number</h1>
        <form onSubmit={formik.handleSubmit}>
          {/* A Party Number (Dynamic) */}
          <div className="mb-4">
            <Label htmlFor="apartyno">Type Number</Label>
            <Input
              id="apartyno"
              name="apartyno"
              type="text"
              value={formik.values.apartyno}
              onChange={(e) => {
                setDialedNumber(e.target.value);
                formik.handleChange(e);
              }}
              placeholder="Enter Number"
              className="mt-1"
              maxLength="15"
            />
            {formik.errors.apartyno && (
              <p className="text-red-600 mt-1">{formik.errors.apartyno}</p>
            )}
          </div>

          {/* Dial Pad */}
          <div className="mb-4">
            <div className="flex flex-col items-center">
              <div className="grid grid-cols-3 gap-2 w-40">
                {[
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "*",
                  "0",
                  "#",
                ].map((num) => (
                  <Button
                    key={num}
                    className="p-3 text-lg bg-gray-300 rounded-md hover:bg-gray-400"
                    onClick={() => handleDialPadClick(num)}
                    type="button"
                  >
                    {num}
                  </Button>
                ))}
              </div>
              <Button
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={handleResetDialPad}
                type="button"
              >
                Clear
              </Button>
            </div>
          </div>

          <div className="text-center">
            {/* Submit Button */}
            <Button type="submit" disabled={formik.isSubmitting || !token}>
              {formik.isSubmitting ? "Calling..." : "Initiate Call"}
            </Button>

            {/* Success/Error Messages */}
            {statusMessage.success && (
              <p className="text-green-500 mt-2">{statusMessage.success}</p>
            )}
            {statusMessage.error && (
              <p className="text-red-500 mt-2">{statusMessage.error}</p>
            )}
          </div>
        </form>
        <Link to="/dashboard">Go Back</Link>
      </div>
    </div>
  );
}

export default InitiateCall;
