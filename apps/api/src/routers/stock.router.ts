import { Router } from 'express';
import { StockController } from '@/controllers/stock.controller';

const router = Router();
const stockController = new StockController();

router.post('/stocks', stockController.createStock);
router.get('/stocks', stockController.getStocks);
router.get('/stocks/:id', stockController.getStockById);
router.put('/stocks/:id', stockController.updateStock);
router.delete('/stocks/:id', stockController.deleteStock);

export default router;
