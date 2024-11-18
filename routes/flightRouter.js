import express from 'express';
import Flight from '../models/flightModel.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth('admin'), async (req, res) => {
    const flight = new Flight(req.body);

    try {
        await flight.save();
        res.status(201).send(flight);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.put('/:id', auth('admin'), async (req, res) => {
    try {
        const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!flight) {
            return res.status(404).send('Flight not found');
        }
        res.send(flight);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.delete('/:id', auth('admin'), async (req, res) => {
    try {
        const flight = await Flight.findByIdAndDelete(req.params.id);
        if (!flight) {
            return res.status(404).send('Flight not found');
        }
        res.send(flight);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.get('/', async (req, res) => {
    try {
        const flights = await Flight.find({});
        res.send(flights);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;
