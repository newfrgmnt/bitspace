/*
  Warnings:

  - Added the required column `userId` to the `Node` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Node" ADD COLUMN     "userId" TEXT NOT NULL;
