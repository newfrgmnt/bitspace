import { float, vec2, mul } from '@thi.ng/shader-ast';

import {Multiplication} from './Multiplication';

describe('Multiplication', () => {
    it('should initialize with correct values', () => {
        const multiplication = new Multiplication();

        expect(typeof multiplication.id).toEqual('string');
        expect(multiplication.name).toEqual('Multiplication');
        expect(multiplication.inputs.a).toBeDefined();
        expect(multiplication.inputs.b).toBeDefined();
        expect(multiplication.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const multiplication = new Multiplication();

        const spy = jest.fn();
        multiplication.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(mul(float(0), float(0)));

        multiplication.inputs.a.next(float(100));
        expect(spy).toHaveBeenCalledWith(mul(float(100), float(0)));

        multiplication.inputs.b.next(float(100));
        expect(spy).toHaveBeenCalledWith(mul(float(100), float(100)));
    });

    it('should support vectors', () => {
        const multiplication = new Multiplication();

        const spy = jest.fn();
        multiplication.outputs.output.subscribe(spy);

        multiplication.inputs.a.next(vec2(100));
        expect(spy).toHaveBeenCalledWith(mul(vec2(100), float(0)));

        multiplication.inputs.b.next(vec2(200));
        expect(spy).toHaveBeenCalledWith(mul(vec2(100), vec2(200)));
    });
});
