import { RealtimeChannel } from '@supabase/supabase-js';
import { v4 as uuid } from 'uuid';

export class Room {
    /** Room Identifier */
    id: string = uuid();
    /** Room Name */
    name: string = 'Untitled';
}
