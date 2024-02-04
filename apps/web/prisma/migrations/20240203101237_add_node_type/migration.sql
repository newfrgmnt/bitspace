/*
  Warnings:

  - Made the column `rootId` on table `Bit` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `type` to the `Node` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."NodeType" AS ENUM ('ADDITION', 'SUBTRACTION', 'MULTIPLICATION', 'DIVISION', 'MODULO', 'POWER', 'SQUARE_ROOT', 'ABSOLUTE', 'SINE', 'COSINE', 'TANGENT', 'ARCSINE', 'ARCCOSINE', 'ARCTANGENT', 'LOGARITHM', 'EXPONENTIAL', 'PI', 'EULER', 'MIN', 'MAX', 'CEIL', 'FLOOR', 'ROUND', 'RANDOM', 'TRIAD_COLOR', 'TETRADIC_COLOR', 'ANALOGOUS_COLOR', 'COMPLEMENTARY_COLOR', 'SQUARE_COLOR', 'IMAGE_AI', 'IMAGE_VARIATION_AI', 'PROMPT_AI', 'CIRCUIT', 'CIRCUIT_INPUTS', 'CIRCUIT_OUTPUT', 'TIMER', 'CONSOLE', 'LERP', 'CUBIC_BEZIER');

-- DropForeignKey
ALTER TABLE "public"."Bit" DROP CONSTRAINT "Bit_rootId_fkey";

-- AlterTable
ALTER TABLE "public"."Bit" ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "rootId" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Input" ADD COLUMN     "value" JSONB,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Node" ADD COLUMN     "type" "public"."NodeType" NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Output" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "public"."Bit" ADD CONSTRAINT "Bit_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
