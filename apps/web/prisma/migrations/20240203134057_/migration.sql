/*
  Warnings:

  - A unique constraint covering the columns `[fromId,toId]` on the table `Connection` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Connection_fromId_toId_key" ON "public"."Connection"("fromId", "toId");
