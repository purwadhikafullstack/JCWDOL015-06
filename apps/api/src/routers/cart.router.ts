import { Router } from 'express';
import { CartController } from '@/controllers/cart.controller';
export class CartRouter {
  private router: Router;
  private cartController: CartController;

  constructor() {
    this.cartController = new CartController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', this.cartController.createCart);
    this.router.get('/', this.cartController.getCarts);
    this.router.get('/:id', this.cartController.getCartById);
    this.router.put('/:id', this.cartController.updateCart);
    this.router.delete('/:id', this.cartController.deleteCart);
  }

  getRouter(): Router {
    return this.router;
  }
}
