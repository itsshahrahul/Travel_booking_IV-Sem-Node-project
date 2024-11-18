import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import flightRouter from './routes/flightRouter.js';
import bookingRouter from './routes/bookingRouter.js';

const app = express();

mongoose.connect("mongodb://localhost:27017/travel_booking")
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("Error  connecting DB:", err.message));

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/flights", flightRouter);
app.use("/api/bookings", bookingRouter);


app.listen(3000, () => console.log("Server is up and running on port 3000"));
