// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/auth/LoginPage";
// import ResetPassword from "./pages/auth/ResetPasswordPage";
// import ForgotPassword from "./pages/auth/ForgotPasswordPage";
// import Dashboard from "./pages/dashboard/Dashboard";
// import InitiateCall from "./pages/call/InitiateCall";
// import CallLogsPage from "./pages/call/CallLogsPage";
// import MissedCallPage from "./pages/call/MissedCallPage";
// import AICallPage from "./pages/call/AICallPage";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password/:token" element={<ResetPassword />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/call/initiate-call" element={<InitiateCall />} />
//         <Route path="/call/call-log" element={<CallLogsPage />} />
//         <Route path="/call/miss-call" element={<MissedCallPage />} />
//         <Route path="/ai/ai-call" element={<AICallPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/LoginPage";
import ResetPassword from "./pages/auth/ResetPasswordPage";
import ForgotPassword from "./pages/auth/ForgotPasswordPage";
import Dashboard from "./pages/dashboard/Dashboard";
import InitiateCall from "./pages/call/InitiateCall";
import CallLogsPage from "./pages/call/CallLogsPage";
import MissedCallPage from "./pages/call/MissedCallPage";
import MainLayout from "./layouts/MainLayout"; // Import the layout
import AICallPage from "./pages/ai/AICallPage";
import TicketsPage from "./pages/tickets/TicketsPage";
import AdminSettingPage from "./pages/admin-setting/AdminSettingPage";
import ReportingPage from "./pages/reporting/ReportingPage";
import SegmentsPage from "./pages/crm/SegmentsPage";
import ContactsPage from "./pages/crm/ContactsPage";
import LeadsPage from "./pages/crm/LeadsPage";
import SenderIdPage from "./pages/sms/SenderIdPage";
import SMSTemplate from "./pages/sms/SMSTemplate";
import SMSLogs from "./pages/sms/SMSLogs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication Routes (No Sidebar or Header) */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected Routes (Wrapped with MainLayout) */}
        <Route path="/" element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* crm routes */}
          <Route path="/crm/segments" element={<SegmentsPage />} />
          <Route path="/crm/contacts" element={<ContactsPage />} />
          <Route path="/crm/leads" element={<LeadsPage />} />
          {/* call routes */}
          <Route path="/call/initiate-call" element={<InitiateCall />} />
          <Route path="/call/call-log" element={<CallLogsPage />} />
          <Route path="/call/miss-call" element={<MissedCallPage />} />
          {/* sms routes */}
          <Route path="/sms/sender-id" element={<SenderIdPage />} />
          <Route path="/sms/sms-tempelete" element={<SMSTemplate />} />
          <Route path="/sms/sms-logs" element={<SMSLogs />} />
          {/* other routes */}
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/admin/setting" element={<AdminSettingPage />} />
          <Route path="/reporting" element={<ReportingPage />} />
          <Route path="/ai/ai-call" element={<AICallPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
