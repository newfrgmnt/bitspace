import { abs, float, vec2 } from '@thi.ng/shader-ast';

import { Absolute } from './Absolute';

describe('Absolute', () => {
    it('should initialize with correct values', () => {
        const absolute = new Absolute();

        expect(typeof absolute.id).toEqual('string');
        expect(absolute.name).toEqual('Absolute');
        expect(absolute.inputs.input).toBeDefined();
        expect(absolute.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const absolute = new Absolute();

        const spy = jest.fn();
        absolute.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(abs(float(0)));

        absolute.inputs.input.next(float(-100));
        expect(spy).toHaveBeenCalledWith(abs(float(-100)));
    });

    it('should support vectors', () => {
        const absolute = new Absolute();

        const spy = jest.fn();
        absolute.outputs.output.subscribe(spy);

        absolute.inputs.input.next(vec2(-100));
        expect(spy).toHaveBeenCalledWith(abs(vec2(-100)));
    });
});
