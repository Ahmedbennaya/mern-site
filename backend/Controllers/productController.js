import Product from "../Model/ProductModel.js";

// @desc Get all products
// @route GET /api/products
// @access Public
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// @desc Get a single product by ID
// @route GET /api/products/:id
// @access Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product' });
  }
};

// @desc Create a new product
// @route POST /api/products
// @access Private/Admin
export const createProduct = async (req, res) => {
  const { name, description, price, imageUrl, category } = req.body;  
  try {
    const newProduct = new Product({ name, description, price, imageUrl, category });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
};

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
export const updateProduct = async (req, res) => {
  const { name, description, price, imageUrl, category } = req.body;  
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, imageUrl, category },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
};

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};

// @desc Get products by category "Blinds & Shades"
// @route GET /api/products/category/blinds-shades
// @access Public
export const getBlindsShades = async (req, res) => {
  try {
    const products = await Product.find({ category: 'Blinds & Shades' });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Blinds & Shades products' });
  }
};

// @desc Get products by category "Curtains & Drapes"
// @route GET /api/products/category/curtains-drapes
// @access Public
export const getCurtainsDrapes = async (req, res) => {
  try {
    const products = await Product.find({ category: 'Curtains & Drapes' });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Curtains & Drapes products' });
  }
};

// @desc Get products by category "Furnishings"
// @route GET /api/products/category/furnishings
// @access Public
export const getFurnishings = async (req, res) => {
  try {
    const products = await Product.find({ category: 'Furnishings' });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Furnishings products' });
  }
};
