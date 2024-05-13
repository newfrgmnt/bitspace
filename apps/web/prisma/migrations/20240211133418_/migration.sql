/*
  Warnings:

  - You are about to drop the `Bit` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Node` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Bit" DROP CONSTRAINT "Bit_rootId_fkey";

-- AlterTable
ALTER TABLE "public"."Node" ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Bit";
