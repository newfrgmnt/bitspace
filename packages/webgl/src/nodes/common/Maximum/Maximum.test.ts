import { max, float, vec2 } from '@thi.ng/shader-ast';

import { Maximum } from './Maximum';

describe('Maximum', () => {
    it('should initialize with correct values', () => {
        const maximum = new Maximum();

        expect(typeof maximum.id).toEqual('string');
        expect(maximum.name).toEqual('Maximum');
        expect(maximum.inputs.a).toBeDefined();
        expect(maximum.inputs.b).toBeDefined();
        expect(maximum.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const maximum = new Maximum();

        const spy = jest.fn();
        maximum.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(max(float(0), float(0)));

        maximum.inputs.a.next(float(100));
        expect(spy).toHaveBeenCalledWith(max(float(100), float(0)));

        maximum.inputs.b.next(float(200));
        expect(spy).toHaveBeenCalledWith(max(float(100), float(200)));
    });
});
