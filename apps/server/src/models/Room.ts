import { Namespace, Socket } from 'socket.io';
import { v4 as uuid } from 'uuid';

export class Room {
    /** Room Identifier */
    id: string = uuid();
    /** Room Name */
    name: string = 'Untitled';
    /** Room Namespace */
    namespace: Namespace;
    /** Room Clients */
    clients: Socket[] = [];

    constructor(namespace: Namespace) {
        this.namespace = namespace;
    }
}
