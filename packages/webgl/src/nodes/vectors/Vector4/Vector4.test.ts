import { float, vec4 } from '@thi.ng/shader-ast';

import {Vector4} from './Vector4';

describe('Vector 4', () => {
    it('should initialize with correct values', () => {
        const vector = new Vector4();

        expect(typeof vector.id).toEqual('string');
        expect(vector.name).toEqual('Vector 4');
        expect(vector.inputs.x).toBeDefined();
        expect(vector.inputs.y).toBeDefined();
        expect(vector.inputs.z).toBeDefined();
        expect(vector.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const vector = new Vector4();

        const spy = jest.fn();
        vector.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(vec4(float(0), float(0), float(0), float(1)));

        vector.inputs.x.next(float(100));
        expect(spy).toHaveBeenCalledWith(vec4(float(100), float(0), float(0), float(1)));

        vector.inputs.y.next(float(100));
        expect(spy).toHaveBeenCalledWith(vec4(float(100), float(100), float(0), float(1)));

        vector.inputs.z.next(float(100));
        expect(spy).toHaveBeenCalledWith(vec4(float(100), float(100), float(100), float(1)));

        vector.inputs.w.next(float(0));
        expect(spy).toHaveBeenCalledWith(vec4(float(100), float(100), float(100), float(0)));
    });
});
