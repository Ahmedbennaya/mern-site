import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  hours: { type: [String], required: true },
  phone: { type: String, required: true },
  mapLink: { type: String, required: true },
  mapImage: { type: String, required: true },  
}, { timestamps: true });

const Store = mongoose.model('Store', storeSchema);

export default Store;
