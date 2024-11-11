import { Router } from 'express';
import { ProductController } from '@/controllers/product.controller';
import { verifyToken } from '@/middlewares/token';

export class ProductRouter {
  private router: Router;
  private productController: ProductController;

  constructor() {
    this.productController = new ProductController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/list', this.productController.getProductList);
  }

  getRouter(): Router {
    return this.router;
  }
}
