import { inversesqrt, float, vec2 } from '@thi.ng/shader-ast';

import { InverseSquareRoot } from './InverseSquareRoot';

describe('InverseSquareRoot', () => {
    it('should initialize with correct values', () => {
        const inverseSquareRoot = new InverseSquareRoot();

        expect(typeof inverseSquareRoot.id).toEqual('string');
        expect(inverseSquareRoot.name).toEqual('InverseSquareRoot');
        expect(inverseSquareRoot.inputs.input).toBeDefined();
        expect(inverseSquareRoot.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const inverseSquareRoot = new InverseSquareRoot();

        const spy = jest.fn();
        inverseSquareRoot.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(inversesqrt(float(0)));

        inverseSquareRoot.inputs.input.next(float(100));
        expect(spy).toHaveBeenCalledWith(inversesqrt(float(100)));
    });

    it('should support vectors', () => {
        const inverseSquareRoot = new InverseSquareRoot();

        const spy = jest.fn();
        inverseSquareRoot.outputs.output.subscribe(spy);

        inverseSquareRoot.inputs.input.next(vec2(100));
        expect(spy).toHaveBeenCalledWith(inversesqrt(vec2(100)));
    });
});
