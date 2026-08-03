-- AlterTable
ALTER TABLE "order_item" ADD COLUMN     "size" TEXT;

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "sizes" TEXT[] DEFAULT ARRAY[]::TEXT[];
