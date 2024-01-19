import { atan, float, vec2 } from '@thi.ng/shader-ast';

import { Arctangent } from './Arctangent';

describe('Arctangent', () => {
    it('should initialize with correct values', () => {
        const arctangent = new Arctangent();

        expect(typeof arctangent.id).toEqual('string');
        expect(arctangent.name).toEqual('Arctangent');
        expect(arctangent.inputs.input).toBeDefined();
        expect(arctangent.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const arctangent = new Arctangent();

        const spy = jest.fn();
        arctangent.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(atan(float(0)));

        arctangent.inputs.input.next(float(100));
        expect(spy).toHaveBeenCalledWith(atan(float(100)));
    });

    it('should support vectors', () => {
        const arctangent = new Arctangent();

        const spy = jest.fn();
        arctangent.outputs.output.subscribe(spy);

        arctangent.inputs.input.next(vec2(100));
        expect(spy).toHaveBeenCalledWith(atan(vec2(100)));
    });
});
