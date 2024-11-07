import { Router } from 'express';
import { AccountController } from '@/controllers/account.controller';
import { verifyToken } from '@/middlewares/token';

export class AccountRouter {
  private router: Router;
  private accountController: AccountController;

  constructor() {
    this.accountController = new AccountController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', verifyToken, this.accountController.getUsersData);
    this.router.post('/register', this.accountController.createAccountData);
    this.router.post('/login', this.accountController.loginAccount);
    this.router.post('/emailer-test', this.accountController.testingEmailer);
  }

  getRouter(): Router {
    return this.router;
  }
}
