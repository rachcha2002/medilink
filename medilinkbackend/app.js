require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const helmet = require("helmet");

const staffRoutes = require("./routes/staffRoutes");
const medicalInfoRoutes = require("./routes/medicalInfoRoutes");
const billingRoutes = require("./routes/paymentRoutes");

const hospitalRoutes = require("./routes/hospitalRoutes");
const hospitaladminRoutes = require("./routes/hospitaladminRoutes");
const patientRoutes = require("./routes/patientRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,PATCH");
  res.setHeader("Access-Control-Allow-Headers", "authorization, Content-Type");

  next();
});



app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'", 
          "https://sandbox.payhere.lk",  // Allow PayHere sandbox scripts
          "https://www.google-analytics.com" // Allow Google Analytics scripts
        ],
        connectSrc: ["'self'", "https://sandbox.payhere.lk"],
        imgSrc: ["'self'", "data:"], // Allow images from your domain and data URIs
        styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles for now
      },
    },
  })
);

// Routes
app.use("/api/staffroutes", staffRoutes);

app.use("/api/medicalinfo", medicalInfoRoutes);

app.use("/api/payment", billingRoutes);

app.use("/api/hospital", hospitalRoutes);

app.use("/api/hospitaladmin", hospitaladminRoutes);


app.use("/api/patients", patientRoutes);

app.use("/api/appointment", appointmentRoutes);


// Custom error handling middleware

//Set Up Server
const server = () => {
  connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// Start Server

server();
