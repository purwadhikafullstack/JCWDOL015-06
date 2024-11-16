import dotenv from 'dotenv';
dotenv.config();

import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
import { AccountRouter } from './routers/account.router';
import { CartRouter } from './routers/cart.router';
import { CategoryRouter } from './routers/category.router';
import { DiscountRouter } from './routers/discount.router';
import { OrderRouter } from './routers/order.router';
import { ProductRouter } from './routers/product.router';
import { StockRouter } from './routers/stock.router';
import { StockHistoryRouter } from './routers/stockHistory.router';
import { StoreRouter } from './routers/store.router';

export default class App {
  private readonly app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);
          res.status(500).send('Error !');
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    const accountRouter = new AccountRouter();
    const cartRouter = new CartRouter();
    const categoryRouter = new CategoryRouter();
    const discountRouter = new DiscountRouter();
    const orderRouter = new OrderRouter();
    const productRouter = new ProductRouter();
    const stockRouter = new StockRouter();
    const stockHistoryRouter = new StockHistoryRouter();
    const storeRouter = new StoreRouter();

    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student API!`);
    });

    this.app.use('/api/account', accountRouter.getRouter());
    this.app.use('/api/cart', cartRouter.getRouter());
    this.app.use('/api/category', categoryRouter.getRouter());
    this.app.use('/api/discount', discountRouter.getRouter());
    this.app.use('/api/order', orderRouter.getRouter());
    this.app.use('/api/product', productRouter.getRouter());
    this.app.use('/api/stock', stockRouter.getRouter());
    this.app.use('/api/stockHistory', stockHistoryRouter.getRouter());
    this.app.use('/api/store', storeRouter.getRouter());
    this.app.use('/uploads', express.static('uploads'));
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
