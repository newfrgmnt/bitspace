import { sqrt, float, vec2 } from '@thi.ng/shader-ast';

import { SquareRoot } from './SquareRoot';

describe('SquareRoot', () => {
    it('should initialize with correct values', () => {
        const squareRoot = new SquareRoot();

        expect(typeof squareRoot.id).toEqual('string');
        expect(squareRoot.name).toEqual('SquareRoot');
        expect(squareRoot.inputs.input).toBeDefined();
        expect(squareRoot.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const squareRoot = new SquareRoot();

        const spy = jest.fn();
        squareRoot.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(sqrt(float(0)));

        squareRoot.inputs.input.next(float(100));
        expect(spy).toHaveBeenCalledWith(sqrt(float(100)));
    });

    it('should support vectors', () => {
        const squareRoot = new SquareRoot();

        const spy = jest.fn();
        squareRoot.outputs.output.subscribe(spy);

        squareRoot.inputs.input.next(vec2(100));
        expect(spy).toHaveBeenCalledWith(sqrt(vec2(100)));
    });
});
