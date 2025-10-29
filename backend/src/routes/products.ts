import { Router, Request, Response } from 'express';
import { products } from '../data/products';

const router = Router();

// Get all products
router.get('/', (req: Request, res: Response) => {
  res.json(products);
});

// Get product by id
router.get('/:id', (req: Request, res: Response) => {
  const product = products.find(p => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Get products by category
router.get('/category/:category', (req: Request, res: Response) => {
  const categoryProducts = products.filter(
    p => p.category.toLowerCase() === req.params.category.toLowerCase()
  );
  res.json(categoryProducts);
});

export default router;
