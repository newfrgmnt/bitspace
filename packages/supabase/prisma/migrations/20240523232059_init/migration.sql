-- CreateEnum
CREATE TYPE "NodeType" AS ENUM ('ADDITION', 'SUBTRACTION', 'MULTIPLICATION', 'DIVISION', 'MODULO', 'POWER', 'SQUARE_ROOT', 'ABSOLUTE', 'SINE', 'COSINE', 'TANGENT', 'ARCSINE', 'ARCCOSINE', 'ARCTANGENT', 'LOGARITHM', 'LOGARITHM2', 'EXPONENTIAL', 'PI', 'EULER', 'MIN', 'MAX', 'CEIL', 'FLOOR', 'ROUND', 'RANDOM', 'SIGN', 'TRIAD_COLOR', 'TETRADIC_COLOR', 'ANALOGOUS_COLOR', 'COMPLEMENTARY_COLOR', 'SQUARE_COLOR', 'TO_HSV', 'FROM_HSV', 'TO_HSL', 'FROM_HSL', 'TO_RGB', 'FROM_RGB', 'IMAGE', 'IMAGE_VARIATION_AI', 'PROMPT_AI', 'CIRCUIT', 'CIRCUIT_INPUTS', 'CIRCUIT_OUTPUT', 'TIMER', 'CONSOLE', 'LERP', 'CUBIC_BEZIER', 'MESH_3D', 'GEOMETRY_3D', 'RENDERER_3D', 'OSCILLATOR', 'IMAGE_EDIT_AI', 'SYNTHESIZED_IMAGE');

-- CreateTable
CREATE TABLE "connections" (
    "id" TEXT NOT NULL,
    "fromId" TEXT NOT NULL,
    "toId" TEXT NOT NULL,

    CONSTRAINT "connections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "node_positions" (
    "nodeId" TEXT NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "nodes" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "parentId" TEXT,
    "type" "NodeType" NOT NULL,
    "data" JSONB,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inputs" (
    "id" TEXT NOT NULL,
    "nodeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "value" JSONB,
    "key" TEXT NOT NULL,

    CONSTRAINT "inputs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outputs" (
    "id" TEXT NOT NULL,
    "nodeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "outputs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "connections_toId_key" ON "connections"("toId");

-- CreateIndex
CREATE UNIQUE INDEX "node_positions_nodeId_key" ON "node_positions"("nodeId");

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "connections_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "outputs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "connections_toId_fkey" FOREIGN KEY ("toId") REFERENCES "inputs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "node_positions" ADD CONSTRAINT "node_positions_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nodes" ADD CONSTRAINT "nodes_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inputs" ADD CONSTRAINT "inputs_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outputs" ADD CONSTRAINT "outputs_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
