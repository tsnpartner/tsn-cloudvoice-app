// const express = require("express");
// const session = require("express-session");
// const MongoStore = require("connect-mongo");
// const connectDB = require("./config/db");
// const cors = require("cors");
// require("dotenv").config();

// const authRoutes = require("./routes/authRoutes");
// const superAdminRoutes = require("./routes/superAdminRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const managerRoutes = require("./routes/managerRoutes");
// const userRoutes = require("./routes/userRoutes");
// const vodafoneRoutes = require("./routes/vodafoneRoutes");

// const app = express();

// // CORS Configuration
// const corsOptions = {
//   origin: process.env.FRONTEND_URL, // Ensure it's correct without trailing slash
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Include OPTIONS
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true, // Allow credentials (cookies, sessions)
// };
// app.use(cors(corsOptions));

// // Handle preflight requests globally
// app.options("*", cors(corsOptions));

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(express.json());

// // Sessions
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//       mongoUrl: process.env.MONGO_URI,
//       collectionName: "sessions",
//     }),
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24, // 1 day
//     },
//   })
// );

// // Routes (After CORS & Middleware)
// app.use("/api/auth", authRoutes);
// app.use("/api/super-admin", superAdminRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/manager", managerRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/vodafone", vodafoneRoutes);

// // Start Server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

// Import Routes
const authRoutes = require("./routes/authRoutes");
const superAdminRoutes = require("./routes/superAdminRoutes");
const adminRoutes = require("./routes/adminRoutes");
const managerRoutes = require("./routes/managerRoutes");
const userRoutes = require("./routes/userRoutes");
const vodafoneRoutes = require("./routes/vodafoneRoutes");

const app = express();

// ✅ Connect to MongoDB
connectDB();

const corsOptions = {
  origin: ["https://tsnvoicebot.io/"], // Allow only this domain
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies/sessions
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests

// ✅ Middleware
app.use(express.json());

// ✅ Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // True for HTTPS
      sameSite: "None", // Required for cross-origin cookies
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/super-admin", superAdminRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/manager", managerRoutes);
app.use("/api/user", userRoutes);
app.use("/api/vodafone", vodafoneRoutes);

// ✅ Server Listen
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
