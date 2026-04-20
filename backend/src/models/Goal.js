import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    },
    type: {
        type: String,
        enum: ['short', 'long'],
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    color: {
        type: String,
        default: '#fef3c7' // Default "post-it" yellow-ish
    }
}, { timestamps: true });

const Goal = mongoose.model('Goal', goalSchema);
export default Goal;
