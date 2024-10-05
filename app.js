const express = require("express");
const app = express();
const router = require("./src/apis");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");

const path = require("path");

// Security middleware imports
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const cors = require("cors");




// Configure rate limiting
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 1000, // limit each IP to 1000 requests per windowMs
});

// CORS options
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  // origin: 'https://www.sayujapthai.fr',

  // List of allowed origins
  credentials: true, // Enable credentials (cookies, authorization headers)
  optionSuccessStatus: 200,
};

// Use security middleware
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(xss());
app.use(limiter);

// Use non-security middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// API routes
app.use("/api/v1", router);

// Home route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Sayu Japthai Server" });
});

// Catch all non-defined routes
app.use("*", (req, res, next) => {
  next(createError(404, "Route not found"));
});

// update code 
app.use("*", (req, res) => {
res.sendFile(path.join(__dirname, 'client/build' , 'index.html'))
})

// Server error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

module.exports = app;
