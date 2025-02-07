const express = require("express");
const router = express.Router();
const {
  initiateCall,
  handleCallEvents,
  getAllCallEvents,
} = require("../controllers/vodafoneController");

/**
 * Initiate a Vodafone Call (Protected)
 */
router.post("/initiate-call", initiateCall);

/**
 * Vodafone Call Events Callback (Receives call events from Vodafone)
 */
router.post("/callevents", handleCallEvents);

/**
 * Retrieve All Stored Vodafone Call Events
 */
router.get("/events", getAllCallEvents);

module.exports = router;
