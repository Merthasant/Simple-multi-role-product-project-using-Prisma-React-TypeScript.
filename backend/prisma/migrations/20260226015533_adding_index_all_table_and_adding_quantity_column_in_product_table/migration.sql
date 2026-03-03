-- DropIndex
DROP INDEX "user_password_key";

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "order_userId_idx" ON "order"("userId");

-- CreateIndex
CREATE INDEX "order_productId_idx" ON "order"("productId");

-- CreateIndex
CREATE INDEX "order_userId_createdAt_idx" ON "order"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "product_name_idx" ON "product"("name");

-- CreateIndex
CREATE INDEX "product_userId_name_idx" ON "product"("userId", "name");

-- CreateIndex
CREATE INDEX "product_userId_createdAt_idx" ON "product"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "refreshToken_userId_idx" ON "refreshToken"("userId");

-- CreateIndex
CREATE INDEX "refreshToken_is_revoked_expiredAt_idx" ON "refreshToken"("is_revoked", "expiredAt");

-- CreateIndex
CREATE INDEX "user_name_idx" ON "user"("name");

-- CreateIndex
CREATE INDEX "user_createdAt_idx" ON "user"("createdAt");

-- CreateIndex
CREATE INDEX "user_name_createdAt_idx" ON "user"("name", "createdAt");
