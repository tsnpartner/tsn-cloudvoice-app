const mongoose = require("mongoose");

const vodafoneEventSchema = new mongoose.Schema({
  SERVICE_TYPE: String,
  EVENT_TYPE: String,
  CALL_ID: String,
  DNI: String,
  A_PARTY_NO: String,
  CALL_START_TIME: String,
  A_PARTY_DIAL_START_TIME: String,
  A_PARTY_DIAL_END_TIME: String,
  A_PARTY_CONNECTED_TIME: String,
  A_DIAL_STATUS: String,
  A_PARTY_END_TIME: String,
  B_PARTY_NO: String,
  B_PARTY_DIAL_START_TIME: String,
  B_PARTY_DIAL_END_TIME: String,
  B_PARTY_CONNECTED_TIME: String,
  B_PARTY_END_TIME: String,
  B_DIAL_STATUS: String,
  REF_ID: String,
  RecordVoice: String,
  receivedAt: { type: Date, default: Date.now }, // Timestamp when event was received
});

module.exports = mongoose.model("VodafoneEvent", vodafoneEventSchema);
