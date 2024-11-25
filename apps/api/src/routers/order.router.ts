import { Router } from 'express';
import { OrderController } from '@/controllers/order.controller';
export class OrderRouter {
  private router: Router;
  private orderController: OrderController;

  constructor() {
    this.orderController = new OrderController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', this.orderController.createOrder);
    this.router.get('/', this.orderController.getOrders);
    this.router.get('/:id', this.orderController.getOrderById);
    this.router.put('/:id', this.orderController.updateOrder);
    this.router.delete('/:id', this.orderController.deleteOrder);
  }

  getRouter(): Router {
    return this.router;
  }
}
