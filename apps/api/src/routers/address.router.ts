import { Router } from 'express';
import { AddressController } from '@/controllers/address.controller';
import { verifyToken } from '@/middlewares/token';

export class AddressRouter {
  private router: Router;
  private addressController: AddressController;

  constructor() {
    this.addressController = new AddressController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.addressController.getAddressHelpers);
    this.router.get('/provinces', this.addressController.getProvinces);
    this.router.get('/cities', this.addressController.getCities);
    this.router.get(
      '/cities/:province',
      this.addressController.getCitiesByProvince,
    );
    this.router.get(
      '/user',
      verifyToken,
      this.addressController.getUserAddress,
    );
    this.router.patch(
      '/user',
      verifyToken,
      this.addressController.setMainAddress,
    );
    this.router.post(
      '/user',
      verifyToken,
      this.addressController.createAddress,
    );
    this.router.delete(
      '/user',
      this.addressController.deleteAddress,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
