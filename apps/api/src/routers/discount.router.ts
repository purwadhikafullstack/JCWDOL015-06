import { Router } from 'express';
import { DiscountController } from '@/controllers/discount.controller';

const router = Router();
const discountController = new DiscountController();

router.post('/discounts', discountController.createDiscount);
router.get('/discounts', discountController.getDiscounts);
router.get('/discounts/:id', discountController.getDiscountById);
router.put('/discounts/:id', discountController.updateDiscount);
router.delete('/discounts/:id', discountController.deleteDiscount);

export default router;
