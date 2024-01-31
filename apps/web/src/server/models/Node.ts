import mongoose from 'mongoose';
import { Input, InputSchema } from './Input';
import { Output, OutputSchema } from './Output';
import { Circuit } from './Circuit';

export const nodeSchemaOptions: mongoose.SchemaOptions = {
    discriminatorKey: 'type'
};

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const NodeType = [
    'CIRCUIT',
    'CIRCUIT_INPUTS',
    'CIRCUIT_OUTPUT',
    'CONSOLE',
    'TIMER',

    'TRIAD_COLOR',
    'TETRADIC_COLOR',
    'SQUARE_COLOR',
    'ANALOGOUS_COLOR',
    'COMPLEMENTARY_COLOR',
    'HSV',
    'RGB',
    'HSL',

    'LERP',
    'CUBIC_BEZIER',

    'ADDITION',
    'SUBTRACTION',
    'MULTIPLICATION',
    'DIVISION',
    'MODULO',
    'SINE',
    'COSINE',
    'TANGENT',
    'ABSOLUTE',
    'ARCSINE',
    'ARCCOSINE',
    'ARCTANGENT',
    'PI',
    'EULER',
    'MIN',
    'MAX',
    'CEIL',
    'FLOOR',
    'ROUND',
    'POWER',
    'SQUARE_ROOT',
    'LOGARITHM',
    'EXPONENT',
    'RANDOM'
] as const;

export interface NodePosition {
    x: number;
    y: number;
}

export interface Node {
    id: mongoose.Types.ObjectId;
    circuit: Circuit;
    name: string;
    type: (typeof NodeType)[number];
    inputs: Input[];
    outputs: Output[];
    position: NodePosition;
}

export const NodeSchema = new Schema<Node>({
    id: ObjectId,
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: NodeType,
        required: true
    },
    inputs: [InputSchema],
    outputs: [OutputSchema],
    position: {
        x: {
            type: Number,
            default: 0,
            required: true
        },
        y: {
            type: Number,
            default: 0,
            required: true
        }
    }
});

export const NodeModel = mongoose.model<Node>('Node', NodeSchema);
