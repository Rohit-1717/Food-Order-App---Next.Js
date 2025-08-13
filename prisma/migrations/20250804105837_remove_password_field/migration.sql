/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `KitchenAdmin` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Otp` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `KitchenAdmin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hashedPassword` to the `KitchenAdmin` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `KitchenAdmin` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `hashedPassword` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "public"."KitchenAdmin_phoneNumber_key";

-- DropIndex
DROP INDEX "public"."User_phoneNumber_key";

-- AlterTable
ALTER TABLE "public"."KitchenAdmin" DROP COLUMN "phoneNumber",
ADD COLUMN     "hashedPassword" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "address" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "phoneNumber",
ADD COLUMN     "hashedPassword" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT,
ALTER COLUMN "email" SET NOT NULL;

-- DropTable
DROP TABLE "public"."Otp";

-- CreateTable
CREATE TABLE "public"."otps" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "otps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "otps_phone_key" ON "public"."otps"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "KitchenAdmin_email_key" ON "public"."KitchenAdmin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");
