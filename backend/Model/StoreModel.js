
import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  latitude: { type: Number, required: true },  // Add latitude
  longitude: { type: Number, required: true }, // Add longitude
  hours: { type: [String], required: true },
  phone: { type: String, required: true },
}, { timestamps: true });

const Store = mongoose.model('Store', storeSchema);

export default Store;