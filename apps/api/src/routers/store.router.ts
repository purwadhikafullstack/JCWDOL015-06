import { Router } from 'express';
import { StoreController } from '@/controllers/store.controller';

const router = Router();
const storeController = new StoreController();

router.post('/stores', storeController.createStore);
router.get('/stores', storeController.getStores);
router.get('/stores/:id', storeController.getStoreById);
router.put('/stores/:id', storeController.updateStore);
router.delete('/stores/:id', storeController.deleteStore);

export default router;
