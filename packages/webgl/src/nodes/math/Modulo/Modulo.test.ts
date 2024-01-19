import { mod, float, vec2 } from '@thi.ng/shader-ast';

import { Modulo } from './Modulo';

describe('Modulo', () => {
    it('should initialize with correct values', () => {
        const modulo = new Modulo();

        expect(typeof modulo.id).toEqual('string');
        expect(modulo.name).toEqual('Modulo');
        expect(modulo.inputs.a).toBeDefined();
        expect(modulo.inputs.b).toBeDefined();
        expect(modulo.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const modulo = new Modulo();

        const spy = jest.fn();
        modulo.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(mod(float(0), float(0)));

        modulo.inputs.a.next(float(100));
        expect(spy).toHaveBeenCalledWith(mod(float(100), float(0)));

        modulo.inputs.b.next(float(100));
        expect(spy).toHaveBeenCalledWith(mod(float(100), float(100)));
    });

    it('should support vectors', () => {
        const modulo = new Modulo();

        const spy = jest.fn();
        modulo.outputs.output.subscribe(spy);

        modulo.inputs.a.next(vec2(100));
        expect(spy).toHaveBeenCalledWith(mod(vec2(100), float(0)));

        modulo.inputs.b.next(vec2(200));
        expect(spy).toHaveBeenCalledWith(mod(vec2(100), vec2(200)));
    });
});
