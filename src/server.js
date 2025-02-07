import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/db.js";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

// Database connection
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://event-management-frontend-two.vercel.app",
    credentials: true,
  },
});

app.use(
  cors({
    origin: "https://event-management-frontend-two.vercel.app",
    credentials: true,
  })
);
app.use(express.json());

// Routes
import userRouter from "./routes/userRoutes.js";
import eventRouter from "./routes/eventRoutes.js";

app.use("/user", userRouter);
app.use("/event", eventRouter);

let attendees = {};

io.on("connection", (socket) => {
  console.log("New client connected");

  // Handle joining an event
  socket.on("joinEvent", (eventId) => {
    if (!attendees[eventId]) attendees[eventId] = 0;
    attendees[eventId]++;

    io.emit("updateAttendees", { eventId, count: attendees[eventId] });
  });

  // Handle leaving an event
  socket.on("leaveEvent", (eventId) => {
    if (attendees[eventId] && attendees[eventId] > 0) {
      attendees[eventId]--;
      io.emit("updateAttendees", { eventId, count: attendees[eventId] });
    }
  });

  // Handle disconnect and auto-leave
  socket.on("disconnect", () => {
    console.log("Client disconnected");

    for (let eventId in attendees) {
      if (attendees[eventId] > 0) {
        attendees[eventId]--;
        io.emit("updateAttendees", { eventId, count: attendees[eventId] });
      }
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
