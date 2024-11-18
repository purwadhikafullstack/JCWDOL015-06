import { Router } from 'express';
import { StockController } from '@/controllers/stock.controller';
export class StockRouter {
  private router: Router;
  private stockController: StockController;

  constructor() {
    this.stockController = new StockController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', this.stockController.createStock);
    this.router.get('/', this.stockController.getStocks);
    this.router.get('/:id', this.stockController.getStockById);
    this.router.put('/:id', this.stockController.updateStock);
    this.router.delete('/:id', this.stockController.deleteStock);
  }

  getRouter(): Router {
    return this.router;
  }
}
