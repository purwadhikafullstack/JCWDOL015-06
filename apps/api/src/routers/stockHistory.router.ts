import { Router } from 'express';
import { StockHistoryController } from '@/controllers/stockHistory.controller';

const router = Router();
const stockHistoryController = new StockHistoryController();

router.post('/stockHistories', stockHistoryController.createStockHistory);
router.get('/stockHistories', stockHistoryController.getStockHistories);
router.get('/stockHistories/:id', stockHistoryController.getStockHistoryById);
router.put('/stockHistories/:id', stockHistoryController.updateStockHistory);
router.delete('/stockHistories/:id', stockHistoryController.deleteStockHistory);

export default router;
