import mongoose from 'mongoose';

const preferenceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  preference: {
    thirdParty: { type: Boolean, default: true },  // Default to allowing third-party cookies
  },
});

export default mongoose.model('Preference', preferenceSchema);
