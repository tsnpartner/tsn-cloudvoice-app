import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

// Auth APIs
export const login = (data) => axios.post(`${API_URL}/api/auth/login`, data);
export const logout = () => axios.post(`${API_URL}/api/auth/logout`);
export const forgotPassword = (data) =>
  axios.post(`${API_URL}/api/auth/forgot-password`, data);
export const resetPassword = (token, data) =>
  axios.post(`${API_URL}/api/auth/reset-password/${token}`, data);

// Admin APIs
export const getAdminExample = (token) =>
  axios.get(`${API_URL}/api/admin/example`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Manager APIs
export const getManagerExample = (token) =>
  axios.get(`${API_URL}/api/manager/example`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Super Admin APIs
export const createUser = (token, data) =>
  axios.post(`${API_URL}/api/super-admin/create-user`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const resetAnyUserPassword = (token, data) =>
  axios.post(`${API_URL}/api/super-admin/reset-user-password`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// User APIs
export const getUserExample = (token) =>
  axios.get(`${API_URL}/api/user/example`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Vodafone APIs
export const initiateCall = (data) =>
  axios.post(`${API_URL}/api/vodafone/initiate-call`, data);

export const handleCallEvents = (data) =>
  axios.post(`${API_URL}/api/vodafone/callevents`, data);

export const getAllCallEvents = () =>
  axios.get(`${API_URL}/api/vodafone/events`);
