/*
  Warnings:

  - You are about to drop the `_DiscountToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `CartItem` DROP FOREIGN KEY `CartItem_cartId_fkey`;

-- DropForeignKey
ALTER TABLE `_DiscountToProduct` DROP FOREIGN KEY `_DiscountToProduct_A_fkey`;

-- DropForeignKey
ALTER TABLE `_DiscountToProduct` DROP FOREIGN KEY `_DiscountToProduct_B_fkey`;

-- DropTable
DROP TABLE `_DiscountToProduct`;

-- CreateTable
CREATE TABLE `ProductDiscount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `discountId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CartToCartItem` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CartToCartItem_AB_unique`(`A`, `B`),
    INDEX `_CartToCartItem_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductDiscount` ADD CONSTRAINT `ProductDiscount_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductDiscount` ADD CONSTRAINT `ProductDiscount_discountId_fkey` FOREIGN KEY (`discountId`) REFERENCES `Discount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CartToCartItem` ADD CONSTRAINT `_CartToCartItem_A_fkey` FOREIGN KEY (`A`) REFERENCES `Cart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CartToCartItem` ADD CONSTRAINT `_CartToCartItem_B_fkey` FOREIGN KEY (`B`) REFERENCES `CartItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
