-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."NodeType" ADD VALUE 'Mesh_3D';
ALTER TYPE "public"."NodeType" ADD VALUE 'Geometry_3D';
ALTER TYPE "public"."NodeType" ADD VALUE 'Renderer_3D';
