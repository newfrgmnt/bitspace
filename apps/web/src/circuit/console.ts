import { ReplaySubject } from 'rxjs';

export class Console extends ReplaySubject<any> {}

export const console = new Console();
