import { min, float, vec2 } from '@thi.ng/shader-ast';

import { Minimum } from './Minimum';

describe('Minimum', () => {
    it('should initialize with correct values', () => {
        const minimum = new Minimum();

        expect(typeof minimum.id).toEqual('string');
        expect(minimum.name).toEqual('Minimum');
        expect(minimum.inputs.a).toBeDefined();
        expect(minimum.inputs.b).toBeDefined();
        expect(minimum.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const minimum = new Minimum();

        const spy = jest.fn();
        minimum.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(min(float(0), float(0)));

        minimum.inputs.a.next(float(100));
        expect(spy).toHaveBeenCalledWith(min(float(100), float(0)));

        minimum.inputs.b.next(float(200));
        expect(spy).toHaveBeenCalledWith(min(float(100), float(200)));
    });
});
