import { Router } from 'express';
import { DiscountController } from '@/controllers/discount.controller';
export class DiscountRouter {
  private router: Router;
  private discountController: DiscountController;

  constructor() {
    this.discountController = new DiscountController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', this.discountController.createDiscount);
    this.router.get('/', this.discountController.getDiscounts);
    this.router.get('/:id', this.discountController.getDiscountById);
    this.router.put('/:id', this.discountController.updateDiscount);
    this.router.delete('/:id', this.discountController.deleteDiscount);
  }

  getRouter(): Router {
    return this.router;
  }
}
