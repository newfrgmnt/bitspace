import { tan, float, vec2 } from '@thi.ng/shader-ast';

import { Tangent } from './Tangent';

describe('Tangent', () => {
    it('should initialize with correct values', () => {
        const tangent = new Tangent();

        expect(typeof tangent.id).toEqual('string');
        expect(tangent.name).toEqual('Tangent');
        expect(tangent.inputs.input).toBeDefined();
        expect(tangent.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const tangent = new Tangent();

        const spy = jest.fn();
        tangent.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(tan(float(0)));

        tangent.inputs.input.next(float(100));
        expect(spy).toHaveBeenCalledWith(tan(float(100)));
    });

    it('should support vectors', () => {
        const tangent = new Tangent();

        const spy = jest.fn();
        tangent.outputs.output.subscribe(spy);

        tangent.inputs.input.next(vec2(100));
        expect(spy).toHaveBeenCalledWith(tan(vec2(100)));
    });
});
