import { degrees, float, vec2 } from '@thi.ng/shader-ast';

import { Degrees } from './Degrees';

describe('Degrees', () => {
    it('should initialize with correct values', () => {
        const d = new Degrees();

        expect(typeof d.id).toEqual('string');
        expect(d.name).toEqual('Degrees');
        expect(d.inputs.input).toBeDefined();
        expect(d.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const d = new Degrees();

        const spy = jest.fn();
        d.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(degrees(float(0)));

        d.inputs.input.next(float(100));
        expect(spy).toHaveBeenCalledWith(degrees(float(100)));
    });

    it('should support vectors', () => {
        const d = new Degrees();

        const spy = jest.fn();
        d.outputs.output.subscribe(spy);

        d.inputs.input.next(vec2(100));
        expect(spy).toHaveBeenCalledWith(degrees(vec2(100)));
    });
});
