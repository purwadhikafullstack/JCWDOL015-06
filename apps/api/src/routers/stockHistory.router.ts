import { Router } from 'express';
import { StockHistoryController } from '@/controllers/stockHistory.controller';
export class StockHistoryRouter {
  private router: Router;
  private stockHistoryController: StockHistoryController;

  constructor() {
    this.stockHistoryController = new StockHistoryController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', this.stockHistoryController.createStockHistory);
    this.router.get('/', this.stockHistoryController.getStockHistories);
    this.router.get('/:id', this.stockHistoryController.getStockHistoryById);
    this.router.put('/:id', this.stockHistoryController.updateStockHistory);
    this.router.delete('/:id', this.stockHistoryController.deleteStockHistory);
  }

  getRouter(): Router {
    return this.router;
  }
}
