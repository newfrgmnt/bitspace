import { float, vec2, div } from '@thi.ng/shader-ast';

import {Division} from './Division';

describe('Division', () => {
    it('should initialize with correct values', () => {
        const division = new Division();

        expect(typeof division.id).toEqual('string');
        expect(division.name).toEqual('Division');
        expect(division.inputs.a).toBeDefined();
        expect(division.inputs.b).toBeDefined();
        expect(division.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const division = new Division();

        const spy = jest.fn();
        division.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(div(float(0), float(0)));

        division.inputs.a.next(float(100));
        expect(spy).toHaveBeenCalledWith(div(float(100), float(0)));

        division.inputs.b.next(float(100));
        expect(spy).toHaveBeenCalledWith(div(float(100), float(100)));
    });

    it('should support vectors', () => {
        const division = new Division();

        const spy = jest.fn();
        division.outputs.output.subscribe(spy);

        division.inputs.a.next(vec2(100));
        expect(spy).toHaveBeenCalledWith(div(vec2(100), float(0)));

        division.inputs.b.next(vec2(200));
        expect(spy).toHaveBeenCalledWith(div(vec2(100), vec2(200)));
    });
});
