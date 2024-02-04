-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."NodeType" ADD VALUE 'TO_HSV';
ALTER TYPE "public"."NodeType" ADD VALUE 'FROM_HSV';
ALTER TYPE "public"."NodeType" ADD VALUE 'TO_HSL';
ALTER TYPE "public"."NodeType" ADD VALUE 'FROM_HSL';
ALTER TYPE "public"."NodeType" ADD VALUE 'TO_RGB';
ALTER TYPE "public"."NodeType" ADD VALUE 'FROM_RGB';
