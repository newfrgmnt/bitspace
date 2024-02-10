/*
  Warnings:

  - Added the required column `key` to the `Input` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `Output` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Input" ADD COLUMN     "key" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Output" ADD COLUMN     "key" TEXT NOT NULL;
