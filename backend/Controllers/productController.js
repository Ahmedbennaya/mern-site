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

// @desc Get a product by ID
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
  try {
    const { name, description, price, imageUrl, category, dimensions, inStock, subcategory, colors } = req.body;

    // Validate required fields
    if (!name || !description || !price || !imageUrl || !category || !dimensions || !dimensions.width || !dimensions.height || inStock === undefined) {
      return res.status(400).json({ message: 'All required fields must be provided.' });
    }

    // Create a new product
    const newProduct = new Product({
      name,
      description,
      price,
      imageUrl,
      category,
      dimensions,
      inStock,
      subcategory,
      colors,
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    // Respond with the saved product
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error' });
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

// @desc Get all Blinds & Shades products
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

// @desc Get all Curtains & Drapes products with filters
// @route GET /api/products/category/curtains-drapes
// @access Public
export const getCurtainsDrapes = async (req, res) => {
  try {
    const { minWidth, maxWidth, minHeight, maxHeight, inStock, subcategory, colors, minPrice, maxPrice } = req.query;
    let filter = { category: 'Curtains & Drapes' };

    if (minWidth || maxWidth) {
      filter['dimensions.width'] = {};
      if (minWidth) filter['dimensions.width'].$gte = parseInt(minWidth);
      if (maxWidth) filter['dimensions.width'].$lte = parseInt(maxWidth);
    }

    if (minHeight || maxHeight) {
      filter['dimensions.height'] = {};
      if (minHeight) filter['dimensions.height'].$gte = parseInt(minHeight);
      if (maxHeight) filter['dimensions.height'].$lte = parseInt(maxHeight);
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }

    if (inStock) {
      filter.inStock = inStock === 'true';
    }

    if (subcategory) {
      filter.subcategory = { $in: subcategory.split(',') };
    }

    if (colors) {
      filter.colors = { $in: colors.split(',') };
    }

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Curtains & Drapes products' });
  }
};

// @desc Get all Furnishings products
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

// @desc Get all Smart Home products
// @route GET /api/products/category/smart-home
// @access Public
export const getSmartHome = async (req, res) => {
  try {
    const products = await Product.find({ category: 'Smart Home' });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Smart Home products' });
  }
};

// @desc Add a product to "Blinds & Shades"
// @route POST /api/products/category/blinds-shades
// @access Private/Admin
export const addBlindsShadesProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body,
      category: 'Blinds & Shades'
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding Blinds & Shades product' });
  }
};

// @desc Add a product to "Curtains & Drapes"
// @route POST /api/products/category/curtains-drapes
// @access Private/Admin
export const addCurtainsDrapesProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body,
      category: 'Curtains & Drapes'
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding Curtains & Drapes product' });
  }
};

// @desc Add a product to "Furnishings"
// @route POST /api/products/category/furnishings
// @access Private/Admin
export const addFurnishingsProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body,
      category: 'Furnishings'
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding Furnishings product' });
  }
};

// @desc Add a product to "Smart Home"
// @route POST /api/products/category/smart-home
// @access Private/Admin
export const addSmartHomeProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body,
      category: 'Smart Home'
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding Smart Home product' });
  }
};