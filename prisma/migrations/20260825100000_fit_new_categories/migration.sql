-- Fit product categories to the new store taxonomy:
-- Home & Kitchen, Office Products, Pet Supplies.

-- Defensive remap for any environment that still has legacy
-- clothing-era categories (Stitch / Unstitched / Daily Usage).
UPDATE "product"
SET "category" = NULL
WHERE "category" IS NOT NULL
  AND "category" NOT IN ('Home & Kitchen', 'Office Products', 'Pet Supplies');

-- Enforce the taxonomy at the database level. NULL is allowed so
-- draft products can exist without a category.
ALTER TABLE "product"
  ADD CONSTRAINT "product_category_check"
  CHECK ("category" IS NULL OR "category" IN ('Home & Kitchen', 'Office Products', 'Pet Supplies'));
