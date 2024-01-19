import { fract, float, vec2 } from '@thi.ng/shader-ast';

import { Fractional } from './Fractional';

describe('Fractional', () => {
    it('should initialize with correct values', () => {
        const fractional = new Fractional();

        expect(typeof fractional.id).toEqual('string');
        expect(fractional.name).toEqual('Fractional');
        expect(fractional.inputs.input).toBeDefined();
        expect(fractional.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const fractional = new Fractional();

        const spy = jest.fn();
        fractional.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(fract(float(0)));

        fractional.inputs.input.next(float(-100));
        expect(spy).toHaveBeenCalledWith(fract(float(-100)));
    });

    it('should support vectors', () => {
        const fractional = new Fractional();

        const spy = jest.fn();
        fractional.outputs.output.subscribe(spy);

        fractional.inputs.input.next(vec2(-100));
        expect(spy).toHaveBeenCalledWith(fract(vec2(-100)));
    });
});
