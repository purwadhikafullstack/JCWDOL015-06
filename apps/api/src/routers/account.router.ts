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
    this.router.get(
      '/profile-detail',
      verifyToken,
      this.accountController.profileDetail,
    );
    this.router.post('/register', this.accountController.createAccountData);
    this.router.post('/login', this.accountController.loginAccount);
    this.router.get('/oauth-creds', this.accountController.oauthCreds);
    this.router.get('/google', this.accountController.loginGoogle);
    this.router.post('/emailer-test', this.accountController.testingEmailer);
    this.router.patch('/account-verify', verifyToken, this.accountController.verifyAccount,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
