import { clamp, float } from '@thi.ng/shader-ast';

import { Clamp } from './Clamp';

describe('Clamp', () => {
    it('should initialize with correct values', () => {
        const c = new Clamp();

        expect(typeof c.id).toEqual('string');
        expect(c.name).toEqual('Clamp');
        expect(c.inputs.input).toBeDefined();
        expect(c.inputs.min).toBeDefined();
        expect(c.inputs.max).toBeDefined();
        expect(c.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const c = new Clamp();

        const spy = jest.fn();
        c.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(clamp(float(0), float(0), float(1)));

        c.inputs.input.next(float(1.2));
        expect(spy).toHaveBeenCalledWith(clamp(float(1.2), float(0), float(1)));
    });
});
