require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require( "./routes/authRoutes");
const aiConfigRoutes = require( "./routes/aiConfigRoutes");
const documentRoutes = require("./routes/documentRoutes");
const app = express();
const chatRoutes = require("./routes/chatRoutes");
const ticketRoutes =require("./routes/ticketRoutes");
const conversationRoutes =require("./routes/conversationRoutes");
const analyticsRoutes =require("./routes/analyticsRoutes");


connectDB();

app.use(cors());
app.use(express.json());
app.use( "/api/auth",authRoutes);
app.use("/api/config",aiConfigRoutes);
app.use("/api/documents",documentRoutes);
app.use("/api/chat",chatRoutes);
app.use("/api/tickets",ticketRoutes);
app.use("/api/conversations",conversationRoutes);
app.use("/api/analytics",analyticsRoutes);
app.get("/", (req, res) => {res.send("API Running");});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});