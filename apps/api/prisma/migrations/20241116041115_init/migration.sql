/*
  Warnings:

  - You are about to drop the `_CartToCartItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OrderToOrderItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_CartToCartItem` DROP FOREIGN KEY `_CartToCartItem_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CartToCartItem` DROP FOREIGN KEY `_CartToCartItem_B_fkey`;

-- DropForeignKey
ALTER TABLE `_OrderToOrderItem` DROP FOREIGN KEY `_OrderToOrderItem_A_fkey`;

-- DropForeignKey
ALTER TABLE `_OrderToOrderItem` DROP FOREIGN KEY `_OrderToOrderItem_B_fkey`;

-- DropIndex
DROP INDEX `CartItem_cartId_fkey` ON `CartItem`;

-- DropTable
DROP TABLE `_CartToCartItem`;

-- DropTable
DROP TABLE `_OrderToOrderItem`;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
