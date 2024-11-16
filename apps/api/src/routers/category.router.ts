import { Router } from 'express';
import { CategoryController } from '@/controllers/category.controller';

const router = Router();
const categoryController = new CategoryController();

router.post('/categories', categoryController.createCategory);
router.get('/categories', categoryController.getCategories);
router.get('/categories/:id', categoryController.getCategoryById);
router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

export default router;
