import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
    airline: { 
        type: String, 
        required: true 
    },
    departure: { 
        type: String, 
        required: true 
    },
    destination: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    availableSeats: { 
        type: Number, 
        required: true 
    },
});

const Flight = mongoose.model('Flight', flightSchema);
export default Flight;
