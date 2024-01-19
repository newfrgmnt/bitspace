import { radians, float, vec2 } from '@thi.ng/shader-ast';

import { Radians } from './Radians';

describe('Radians', () => {
    it('should initialize with correct values', () => {
        const r = new Radians();

        expect(typeof r.id).toEqual('string');
        expect(r.name).toEqual('Radians');
        expect(r.inputs.input).toBeDefined();
        expect(r.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const r = new Radians();

        const spy = jest.fn();
        r.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(radians(float(0)));

        r.inputs.input.next(float(100));
        expect(spy).toHaveBeenCalledWith(radians(float(100)));
    });

    it('should support vectors', () => {
        const r = new Radians();

        const spy = jest.fn();
        r.outputs.output.subscribe(spy);

        r.inputs.input.next(vec2(100));
        expect(spy).toHaveBeenCalledWith(radians(vec2(100)));
    });
});
