import { Router } from 'express';
import { StoreAdminController } from '@/controllers/storeAdmin.controller';
export class StoreAdminRouter {
  private readonly router: Router;
  private readonly storeAdminController: StoreAdminController;

  constructor() {
    this.storeAdminController = new StoreAdminController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', this.storeAdminController.createStoreAdmin);
    this.router.get('/', this.storeAdminController.getStoreAdmins);
    this.router.get('/:id', this.storeAdminController.getStoreAdminById);
    this.router.put('/:id', this.storeAdminController.updateStoreAdmin);
    this.router.delete('/:id', this.storeAdminController.deleteStoreAdmin);
  }

  getRouter(): Router {
    return this.router;
  }
}
