/*
  Warnings:

  - You are about to drop the column `circuitId` on the `Connection` table. All the data in the column will be lost.
  - You are about to drop the column `circuitId` on the `Input` table. All the data in the column will be lost.
  - You are about to drop the column `circuitId` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `circuitId` on the `Output` table. All the data in the column will be lost.
  - You are about to drop the `Circuit` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[rootId]` on the table `Bit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[parentId]` on the table `Node` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Connection" DROP CONSTRAINT "Connection_circuitId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Input" DROP CONSTRAINT "Input_circuitId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Node" DROP CONSTRAINT "Node_circuitId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Output" DROP CONSTRAINT "Output_circuitId_fkey";

-- AlterTable
ALTER TABLE "public"."Bit" ADD COLUMN     "rootId" TEXT;

-- AlterTable
ALTER TABLE "public"."Connection" DROP COLUMN "circuitId";

-- AlterTable
ALTER TABLE "public"."Input" DROP COLUMN "circuitId";

-- AlterTable
ALTER TABLE "public"."Node" DROP COLUMN "circuitId",
ADD COLUMN     "parentId" TEXT;

-- AlterTable
ALTER TABLE "public"."Output" DROP COLUMN "circuitId";

-- DropTable
DROP TABLE "public"."Circuit";

-- CreateIndex
CREATE UNIQUE INDEX "Bit_rootId_key" ON "public"."Bit"("rootId");

-- CreateIndex
CREATE UNIQUE INDEX "Node_parentId_key" ON "public"."Node"("parentId");

-- AddForeignKey
ALTER TABLE "public"."Bit" ADD CONSTRAINT "Bit_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "public"."Node"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Node" ADD CONSTRAINT "Node_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."Node"("id") ON DELETE SET NULL ON UPDATE CASCADE;
