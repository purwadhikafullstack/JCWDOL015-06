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
    this.router.get('/', verifyToken, this.accountController.getUsers);
    this.router.get(
      '/account-detail',
      verifyToken,
      this.accountController.getAccountDetail,
    );
    this.router.post('/register', this.accountController.createAccount);
    this.router.post('/login', this.accountController.loginAccount);
    this.router.get('/oauth-creds', this.accountController.oauthCreds);
    this.router.get('/google', this.accountController.loginGoogle);
    this.router.post('/emailer-test', this.accountController.testingEmailer);
    this.router.patch(
      '/account-verify',
      verifyToken,
      this.accountController.verifyAccount,
    );
    this.router.post(
      '/forgot-password',
      this.accountController.confirmPasswordChange,
    );
    this.router.patch(
      '/change-password',
      this.accountController.changePassword,
    );
    this.router.patch(
      '/update-email',
      verifyToken,
      this.accountController.updateAccountEmail,
    );
    this.router.patch(
      '/update-basic',
      verifyToken,
      this.accountController.updateAccountBasic,
    );
    
  }

  getRouter(): Router {
    return this.router;
  }
}
