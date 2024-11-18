import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User', 
        required: true 
    },
    flight: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Flight', 
        required: true 
    },
    totalPrice: { 
        type: Number, 
        required: true 
    },
    bookedAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
