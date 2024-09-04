import { getProductsDb, getProductDb, insertProductDb, deleteProductDb, updateProductDB, addToOrderDB } from '../model/productDb.js';
import { getUserDb } from '../model/userDB.js';

const getProducts = async (req, res) => {
    try {
      if (req.user.userRole !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: You do not have permission to access products' });
      }
      const products = await getProductsDb();
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error.message);
      res.status(500).json({ message: 'Failed to retrieve products', error: error.message });
    }
  };

  const getProduct = async (req, res) => {
    try {
      if (req.user.userRole !== 'admin' && req.user.userID !== req.params.userID) {
        return res.status(403).json({ message: 'Forbidden: You do not have permission to access this product' });
      }
  
      const product = await getProductDb(req.params.prodID);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      console.error('Error fetching product:', error.message);
      res.status(500).json({ message: 'Failed to retrieve product', error: error.message });
    }
  };

  const insertProduct = async (req, res) => {
    try {
      if (req.user.userRole !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Only admins can insert products' });
      }
  
      let { prodName, prodDescription, prodFeatures, quantity, prodSound, prodPackage, amount, category, prodUrl } = req.body;

      if (!prodName || !prodDescription || !quantity || !amount || !category) {
        return res.status(400).json({ message: 'Bad Request: Missing required fields' });
      }
      await insertProductDb(prodName, prodDescription, prodFeatures, quantity, prodSound, prodPackage, amount, category, prodUrl);
      res.status(201).json({ message: 'Product was inserted successfully' });
    } catch (error) {
      console.error('Error inserting product:', error.message);
      res.status(500).json({ message: 'Failed to insert product', error: error.message });
    }
  };

  const deleteProduct = async (req, res) => {
    try {

      if (req.user.userRole !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Only admins can delete products' });
      }
  
      await deleteProductDb(req.params.prodID);
     
      res.status(200).json({ message: 'Product has been deleted' });
    } catch (error) {
      console.error('Error deleting product:', error.message);
      
      res.status(500).json({ message: 'Failed to delete product', error: error.message });
    }
  }

  const updateProduct = async (req, res) => {
    try {
      
      if (req.user.userRole !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Only admins can update products' });
      }
 
      const product = await getProductDb(req.params.prodID);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      const {
        prodName = product.prodName,
        prodDescription = product.prodDescription,
        prodFeatures = product.prodFeatures,
        quantity = product.quantity,
        prodSound = product.prodSound,
        prodPackage = product.prodPackage,
        amount = product.amount,
        category = product.category,
        prodUrl = product.prodUrl
      } = req.body;
  

      await updateProductDB(req.params.prodID, prodName, prodDescription, prodFeatures, quantity, prodSound, prodPackage, amount, category, prodUrl);
  
      res.status(200).json({ message: 'Update Product was successful' });
    } catch (error) {
      console.error('Error updating product:', error.message);
 
      res.status(500).json({ message: 'Failed to update product', error: error.message });
    }
  };

const addToOrder = async (req, res) => {
  try {
    const { emailAdd, prodID } = req.body;
    const userData = await getUserDb(emailAdd);
    if (!userData) {
      return res.status(404).json({ message: 'User not found' }); 
    }
    await addToCartDB(userData.prodID, prodID);
    res.status(200).json({ message: "You've added an item to order" }); 
  } catch (error) {
    console.error('Error adding to cart:', error.message);
    res.status(500).json({ message: 'Failed to add item to order', error: error.message });
  }
}

export { getProducts, getProduct, insertProduct, deleteProduct, updateProduct, addToOrder};
