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
  const { name, address, hours, phone, mapLink, mapImage } = req.body;

  const store = new Store({
    name,
    address,
    hours,
    phone,
    mapLink,
    mapImage,
  });

  const createdStore = await store.save();
  res.status(201).json(createdStore);
});

export { getStores, createStore };
