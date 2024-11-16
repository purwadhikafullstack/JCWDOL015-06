import { Router } from 'express';
import { ProductController } from '@/controllers/product.controller';
import upload from '@/middlewares/upload';
export class ProductRouter {
  private router: Router;
  private productController: ProductController;

  constructor() {
    this.productController = new ProductController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', this.productController.createProduct);
    this.router.get('/', this.productController.getProducts);
    this.router.get('/:id', this.productController.getProductById);
    this.router.put('/:id', this.productController.updateProduct);
    this.router.delete('/:id', this.productController.deleteProduct);
    this.router.post(
      '/upload-images',
      upload.array('images', 5),
      async (req, res) => {
        try {
          const filePaths = Array.isArray(req.files)
            ? req.files.map((file: Express.Multer.File) => file.path)
            : [];
          res.json({
            message: 'Files uploaded successfully',
            files: filePaths,
          });
        } catch (error) {
          res.status(400).send({
            status: 'error',
            msg: error,
          });
        }
      },
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
