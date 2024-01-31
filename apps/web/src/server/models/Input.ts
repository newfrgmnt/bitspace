import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

export interface Input<T = unknown> {
    id: mongoose.Types.ObjectId;
    name: string;
    value: T;
}

export const InputSchema = new Schema<Input>({
    id: ObjectId,
    name: String,
    value: Schema.Types.Mixed
});

export const InputModel = mongoose.model<Input>('Input', InputSchema);
