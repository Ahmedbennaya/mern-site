
import asyncHandler from 'express-async-handler';
import Store from '../Model/StoreModel.js';

// @desc Get all stores
// @route GET /api/stores
// @access Public
const getStores = asyncHandler(async (req, res) => {
  const stores = await Store.find({});
  res.json(stores);
});

// @desc Create a new store
// @route POST /api/admin/stores/create
// @access Private/Admin
const createStore = asyncHandler(async (req, res) => {
  const { name, address, hours, phone, mapLink, mapImage, latitude, longitude } = req.body;

  const store = new Store({
    name,
    address,
    latitude, // include latitude
    longitude, // include longitude
    hours,
    phone,
    mapLink,
    mapImage,
  });

  const createdStore = await store.save();
  res.status(201).json(createdStore);
});

// @desc Get a single store by ID
// @route GET /api/stores/:id
// @access Public
const getStoreById = asyncHandler(async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);

    if (store) {
      res.json(store);
    } else {
      res.status(404).json({ message: 'Store not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export { getStores, createStore, getStoreById };