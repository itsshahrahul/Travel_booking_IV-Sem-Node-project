import express from 'express';
import Booking from '../models/bookingModel.js';
import Flight from '../models/flightModel.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth('customer'), async (req, res) => {
    const { flightId } = req.body;

    try {
        const flight = await Flight.findById(flightId);
        if (!flight) {
            return res.status(404).send('Flight not found');
        }

        if (flight.availableSeats <= 0) {
            return res.status(400).send('No available seats');
        }

        const booking = new Booking({
            user: req.user._id,  
            flight: flight._id,
            totalPrice: flight.price
        });

        await booking.save();
        
        flight.availableSeats -= 1;
        await flight.save();

        res.status(201).send(booking);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

export default router;
