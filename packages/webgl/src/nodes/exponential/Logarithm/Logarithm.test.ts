import { log, float, vec2 } from '@thi.ng/shader-ast';

import { Logarithm } from './Logarithm';

describe('Logarithm', () => {
    it('should initialize with correct values', () => {
        const logarithm = new Logarithm();

        expect(typeof logarithm.id).toEqual('string');
        expect(logarithm.name).toEqual('Logarithm');
        expect(logarithm.inputs.input).toBeDefined();
        expect(logarithm.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const logarithm = new Logarithm();

        const spy = jest.fn();
        logarithm.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(log(float(0)));

        logarithm.inputs.input.next(float(100));
        expect(spy).toHaveBeenCalledWith(log(float(100)));
    });

    it('should support vectors', () => {
        const logarithm = new Logarithm();

        const spy = jest.fn();
        logarithm.outputs.output.subscribe(spy);

        logarithm.inputs.input.next(vec2(100));
        expect(spy).toHaveBeenCalledWith(log(vec2(100)));
    });
});
