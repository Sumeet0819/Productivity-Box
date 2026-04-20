import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: 'Curating productive rituals for a thoughtful day in the botanical workspace.'
    },
    profilePicture: {
        type: String,
        default: 'https://i.pinimg.com/736x/ad/44/ef/ad44efff26f604077495754d6331bb5e.jpg'
    },
    upiIds: {
        type: [String],
        default: []
    },
    cards: {
        type: [{
            type: { type: String }, // e.g. Visa, Mastercard
            last4: { type: String },
            provider: { type: String } // e.g. HDFC, SBI
        }],
        default: []
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
