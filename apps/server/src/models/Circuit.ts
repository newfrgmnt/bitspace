import mongoose from 'mongoose';
import { Node, NodeModel, NodeSchema } from './Node';
import { Connection, ConnectionSchema } from './Connection';

const Schema = mongoose.Schema;

export interface Circuit extends Node {
    nodes: Node[];
    connections: Connection[];
}

export const CircuitModel = NodeModel.discriminator<Circuit>(
    'Circuit',
    new Schema<Circuit>({
        nodes: [NodeSchema],
        connections: [ConnectionSchema]
    })
);
