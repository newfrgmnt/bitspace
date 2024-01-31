import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface User {
    id: mongoose.Types.ObjectId;
    name: string;
    username: string;
    email: string;
}

export const UserModel = mongoose.model<User>(
    'User',
    new Schema<User>({
        id: Schema.Types.ObjectId,
        name: String,
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (value: string) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                },
                message: 'Invalid email address format'
            }
        }
    })
);
