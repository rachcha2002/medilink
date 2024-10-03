require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const billRoutes = require("./routes/paymentRoutes")
const alertRoutes = require("./routes/alertRoutes")
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
  


// Routes
app.use('/api/bills', billRoutes);
app.use('/api/disease',alertRoutes)


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
