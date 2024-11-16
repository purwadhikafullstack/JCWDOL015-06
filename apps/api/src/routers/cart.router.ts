import { Router } from 'express';
import { CartController } from '@/controllers/cart.controller';

const router = Router();
const cartController = new CartController();

router.post('/carts', cartController.createCart);
router.get('/carts', cartController.getCarts);
router.get('/carts/:id', cartController.getCartById);
router.put('/carts/:id', cartController.updateCart);
router.delete('/carts/:id', cartController.deleteCart);

export default router;
