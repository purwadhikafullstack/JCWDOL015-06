import { Router } from 'express';
import { AccountController } from '@/controllers/account.controller';

export class AccountRouter {
  private router: Router;
  private accountController: AccountController;

  constructor() {
    this.accountController = new AccountController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.accountController.getSampleData);
    // this.router.get('/:id', this.accountController.getSampleDataById);
    this.router.post('/', this.accountController.createAccountData);
    this.router.get('/emailer-test', this.accountController.testingEmailer);
  }

  getRouter(): Router {
    return this.router;
  }
}
