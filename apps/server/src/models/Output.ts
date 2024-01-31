import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

export interface Output {
    id: mongoose.Types.ObjectId;
    name: string;
}

export const OutputSchema = new Schema<Output>({
    id: ObjectId,
    name: String
});

export const OutputModel = mongoose.model<Output>('Output', OutputSchema);
