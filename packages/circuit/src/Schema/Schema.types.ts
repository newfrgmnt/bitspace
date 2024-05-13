import { z } from 'zod';

export type Schema<T extends z.Schema = z.Schema> = {
    name: string;
    validator: T;
};
