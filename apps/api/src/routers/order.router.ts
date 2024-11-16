import { Router } from 'express';
import { OrderController } from '@/controllers/order.controller';

const router = Router();
const orderController = new OrderController();

router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getOrders);
router.get('/orders/:id', orderController.getOrderById);
router.put('/orders/:id', orderController.updateOrder);
router.delete('/orders/:id', orderController.deleteOrder);

export default router;
