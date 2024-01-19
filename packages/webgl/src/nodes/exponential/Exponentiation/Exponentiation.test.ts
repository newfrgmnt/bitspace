import { exp, float, vec2 } from '@thi.ng/shader-ast';

import { Exponentiation } from './Exponentiation';

describe('Exponentiation', () => {
    it('should initialize with correct values', () => {
        const exponentiation = new Exponentiation();

        expect(typeof exponentiation.id).toEqual('string');
        expect(exponentiation.name).toEqual('Exponentiation');
        expect(exponentiation.inputs.input).toBeDefined();
        expect(exponentiation.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const exponentiation = new Exponentiation();

        const spy = jest.fn();
        exponentiation.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(exp(float(0)));

        exponentiation.inputs.input.next(float(100));
        expect(spy).toHaveBeenCalledWith(exp(float(100)));
    });

    it('should support vectors', () => {
        const exponentiation = new Exponentiation();

        const spy = jest.fn();
        exponentiation.outputs.output.subscribe(spy);

        exponentiation.inputs.input.next(vec2(-100));
        expect(spy).toHaveBeenCalledWith(exp(vec2(-100)));
    });
});
