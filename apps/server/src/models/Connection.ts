import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface Connection {
    id: mongoose.Types.ObjectId;
    from: mongoose.Types.ObjectId;
    to: mongoose.Types.ObjectId;
}

export const ConnectionSchema = new Schema<Connection>({
    id: Schema.Types.ObjectId,
    from: {
        type: Schema.Types.ObjectId,
        ref: 'Output',
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'Input',
        required: true
    }
});

export const CircuitModel = mongoose.model('Connection', ConnectionSchema);
