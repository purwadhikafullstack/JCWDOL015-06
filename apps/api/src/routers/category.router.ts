import { Router } from 'express';
import { CategoryController } from '@/controllers/category.controller';
import { verifyToken } from '@/middlewares/token';

export class CategoryRouter {
  private router: Router;
  private categoryController: CategoryController;

  constructor() {
    this.categoryController = new CategoryController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.categoryController.getCategoriesList)
  }

  getRouter(): Router {
    return this.router;
  }
}
