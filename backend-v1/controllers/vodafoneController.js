// // controllers/vodafoneController.js
// const axios = require("axios");

// async function getVodafoneToken() {
//   const { C2C_USERNAME, C2C_PASSWORD, C2C_AUTH_TOKEN_ENDPOINT } = process.env;

//   try {
//     const response = await axios.post(
//       C2C_AUTH_TOKEN_ENDPOINT,
//       {
//         username: C2C_USERNAME.trim(),
//         password: C2C_PASSWORD.trim(),
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     // Should return { idToken: "...", expiresIn: 1800 }
//     return response.data.idToken;
//   } catch (error) {
//     console.error(
//       "Error fetching Vodafone token:",
//       error?.response?.data || error.message
//     );
//     throw new Error("Could not fetch Vodafone token");
//   }
// }

// /**
//  * POST /api/vodafone/initiate-call
//  *
//  * Example Request Body:
//  * {
//  *   "cli":"9610012328",
//  *   "apartyno":"9898989898",
//  *   "bpartyno": "9898989898",
//  *   "reference_id":"123",
//  *   "dtmfflag": 0,
//  *   "recordingflag": 0
//  * }
//  */
// exports.initiateCall = async (req, res) => {
//   const {
//     cli,
//     apartyno,
//     bpartyno,
//     reference_id,
//     dtmfflag = 0,
//     recordingflag = 0,
//   } = req.body;

//   try {
//     // 1) Get token from Vodafone (using your C2C credentials in .env)
//     const token = await getVodafoneToken();

//     // 2) Initiate call
//     const { C2C_INITIATE_CALL_ENDPOINT } = process.env;
//     const requestBody = {
//       cli,
//       apartyno,
//       bpartyno,
//       reference_id,
//       dtmfflag,
//       recordingflag,
//     };

//     const response = await axios.post(C2C_INITIATE_CALL_ENDPOINT, requestBody, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     // Example response
//     // {
//     //   status: 1,
//     //   message: { RespId: 200, Response: "success", ReqId: 101 },
//     //   requestid: "101"
//     // }
//     res.status(200).json({
//       message: "Call initiated successfully",
//       vodafoneResponse: response.data,
//     });
//   } catch (error) {
//     console.error(
//       "Error initiating call:",
//       error?.response?.data || error.message
//     );
//     res.status(500).json({
//       message: "Error initiating call",
//       error: error?.response?.data || error.message,
//     });
//   }
// };

const axios = require("axios");
const VodafoneEvent = require("../models/VodafoneEvent");

/**
 * Fetch Vodafone Authentication Token
 */
async function getVodafoneToken() {
  const { C2C_USERNAME, C2C_PASSWORD, C2C_AUTH_TOKEN_ENDPOINT } = process.env;

  try {
    const response = await axios.post(
      C2C_AUTH_TOKEN_ENDPOINT,
      {
        username: C2C_USERNAME.trim(),
        password: C2C_PASSWORD.trim(),
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data.idToken; // Returns the authentication token
  } catch (error) {
    console.error(
      "❌ Error fetching Vodafone token:",
      error?.response?.data || error.message
    );
    throw new Error("Could not fetch Vodafone token");
  }
}

/**
 * Initiate Vodafone Call
 * @route POST /api/vodafone/initiate-call
 */
exports.initiateCall = async (req, res) => {
  try {
    const {
      cli,
      apartyno,
      bpartyno,
      reference_id,
      dtmfflag = 0,
      recordingflag = 0,
    } = req.body;

    // 1️⃣ Get a new Vodafone API token
    const token = await getVodafoneToken();

    // 2️⃣ Call Vodafone's initiate-call API
    const { C2C_INITIATE_CALL_ENDPOINT } = process.env;
    const requestBody = {
      cli,
      apartyno,
      bpartyno,
      reference_id,
      dtmfflag,
      recordingflag,
    };

    const response = await axios.post(C2C_INITIATE_CALL_ENDPOINT, requestBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res.status(200).json({
      message: "Call initiated successfully",
      vodafoneResponse: response.data,
    });
  } catch (error) {
    console.error(
      "❌ Error initiating Vodafone call:",
      error?.response?.data || error.message
    );
    return res.status(500).json({
      message: "Error initiating call",
      error: error?.response?.data || error.message,
    });
  }
};

/**
 * Handle Vodafone Call Events
 * @route POST /api/vodafone/callevents
 */
exports.handleCallEvents = async (req, res) => {
  try {
    const eventData = req.body;

    if (!eventData || Object.keys(eventData).length === 0) {
      return res.status(400).json({ message: "Invalid event data received" });
    }

    // Store event in MongoDB
    const newEvent = new VodafoneEvent(eventData);
    await newEvent.save();

    console.log(
      "✅ Vodafone Call Event Received:",
      JSON.stringify(eventData, null, 2)
    );

    return res.status(200).json({ message: "Event received successfully" });
  } catch (error) {
    console.error("❌ Error saving Vodafone event:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Get All Vodafone Call Events
 * @route GET /api/vodafone/events
 */
exports.getAllCallEvents = async (req, res) => {
  try {
    const events = await VodafoneEvent.find().sort({ receivedAt: -1 }); // Latest first
    return res.status(200).json({ events });
  } catch (error) {
    console.error("❌ Error retrieving Vodafone events:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
