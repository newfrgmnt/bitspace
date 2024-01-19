import { asin, float, vec2 } from '@thi.ng/shader-ast';

import { Arcsine } from './Arcsine';

describe('Arcsine', () => {
    it('should initialize with correct values', () => {
        const arcsine = new Arcsine();

        expect(typeof arcsine.id).toEqual('string');
        expect(arcsine.name).toEqual('Arcsine');
        expect(arcsine.inputs.input).toBeDefined();
        expect(arcsine.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const arcsine = new Arcsine();

        const spy = jest.fn();
        arcsine.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(asin(float(0)));

        arcsine.inputs.input.next(float(100));
        expect(spy).toHaveBeenCalledWith(asin(float(100)));
    });

    it('should support vectors', () => {
        const arcsine = new Arcsine();

        const spy = jest.fn();
        arcsine.outputs.output.subscribe(spy);

        arcsine.inputs.input.next(vec2(100));
        expect(spy).toHaveBeenCalledWith(asin(vec2(100)));
    });
});
