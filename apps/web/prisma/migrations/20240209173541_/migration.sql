/*
  Warnings:

  - You are about to drop the column `name` on the `Input` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Output` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Input" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "public"."Node" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "public"."Output" DROP COLUMN "name";
