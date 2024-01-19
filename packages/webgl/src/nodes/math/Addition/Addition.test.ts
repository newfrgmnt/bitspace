import { add, float, vec2 } from '@thi.ng/shader-ast';

import { Addition } from './Addition';

describe('Addition', () => {
    it('should initialize with correct values', () => {
        const addition = new Addition();

        expect(typeof addition.id).toEqual('string');
        expect(addition.name).toEqual('Addition');
        expect(addition.inputs.a).toBeDefined();
        expect(addition.inputs.b).toBeDefined();
        expect(addition.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const addition = new Addition();

        const spy = jest.fn();
        addition.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(add(float(0), float(0)));

        addition.inputs.a.next(float(100));
        expect(spy).toHaveBeenCalledWith(add(float(100), float(0)));

        addition.inputs.b.next(float(100));
        expect(spy).toHaveBeenCalledWith(add(float(100), float(100)));
    });

    it('should support vectors', () => {
        const addition = new Addition();

        const spy = jest.fn();
        addition.outputs.output.subscribe(spy);

        addition.inputs.a.next(vec2(100));
        expect(spy).toHaveBeenCalledWith(add(vec2(100), float(0)));

        addition.inputs.b.next(vec2(200));
        expect(spy).toHaveBeenCalledWith(add(vec2(100), vec2(200)));
    });
});
