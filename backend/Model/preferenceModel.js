import mongoose from 'mongoose';

// Define the preference schema
const preferenceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  preference: {
    thirdParty: { type: Boolean, default: true }, // Default to allowing third-party cookies
  },
}, { timestamps: true }); // Add timestamps to track creation and updates

export default mongoose.model('Preference', preferenceSchema);
