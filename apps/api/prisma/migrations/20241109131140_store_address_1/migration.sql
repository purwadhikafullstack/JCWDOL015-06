-- CreateTable
CREATE TABLE `Store` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ownerId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('USER', 'STORE') NOT NULL,
    `typeId` INTEGER NOT NULL,
    `desc` VARCHAR(191) NOT NULL,
    `provinceId` INTEGER NOT NULL,
    `cityId` INTEGER NOT NULL,
    `coor_lat` VARCHAR(191) NOT NULL,
    `coor_lng` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
