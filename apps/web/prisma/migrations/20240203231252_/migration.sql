-- DropForeignKey
ALTER TABLE "public"."Connection" DROP CONSTRAINT "Connection_fromId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Connection" DROP CONSTRAINT "Connection_toId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Input" DROP CONSTRAINT "Input_nodeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Node" DROP CONSTRAINT "Node_parentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."NodePosition" DROP CONSTRAINT "NodePosition_nodeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Output" DROP CONSTRAINT "Output_nodeId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Connection" ADD CONSTRAINT "Connection_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "public"."Output"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Connection" ADD CONSTRAINT "Connection_toId_fkey" FOREIGN KEY ("toId") REFERENCES "public"."Input"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."NodePosition" ADD CONSTRAINT "NodePosition_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "public"."Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Node" ADD CONSTRAINT "Node_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Input" ADD CONSTRAINT "Input_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "public"."Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Output" ADD CONSTRAINT "Output_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "public"."Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;
