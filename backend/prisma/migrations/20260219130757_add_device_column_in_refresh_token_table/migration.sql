/*
  Warnings:

  - Added the required column `device` to the `refreshToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "refreshToken" ADD COLUMN     "device" TEXT NOT NULL;
