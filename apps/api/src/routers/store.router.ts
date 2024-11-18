import { Router } from 'express';
import { StoreController } from '@/controllers/store.controller';
export class StoreRouter {
  private router: Router;
  private storeController: StoreController;

  constructor() {
    this.storeController = new StoreController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', this.storeController.createStore);
    this.router.get('/', this.storeController.getStores);
    this.router.get('/:id', this.storeController.getStoreById);
    this.router.put('/:id', this.storeController.updateStore);
    this.router.delete('/:id', this.storeController.deleteStore);
  }

  getRouter(): Router {
    return this.router;
  }
}
