/*
  Warnings:

  - You are about to drop the column `Height` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `Weight` on the `product` table. All the data in the column will be lost.
  - Added the required column `height` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `Height`,
    DROP COLUMN `Weight`,
    ADD COLUMN `height` INTEGER NOT NULL,
    ADD COLUMN `weight` INTEGER NOT NULL;
