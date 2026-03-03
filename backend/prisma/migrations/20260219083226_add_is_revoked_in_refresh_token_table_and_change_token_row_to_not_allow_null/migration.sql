/*
  Warnings:

  - Made the column `token` on table `refreshToken` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "refreshToken" ADD COLUMN     "is_revoked" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "token" SET NOT NULL;
