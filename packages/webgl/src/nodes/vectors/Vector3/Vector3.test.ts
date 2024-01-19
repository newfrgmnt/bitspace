import { float, vec3 } from '@thi.ng/shader-ast';

import {Vector3} from './Vector3';

describe('Vector 3', () => {
    it('should initialize with correct values', () => {
        const vector = new Vector3();

        expect(typeof vector.id).toEqual('string');
        expect(vector.name).toEqual('Vector 3');
        expect(vector.inputs.x).toBeDefined();
        expect(vector.inputs.y).toBeDefined();
        expect(vector.inputs.z).toBeDefined();
        expect(vector.outputs.output).toBeDefined();
    });

    it('should compute properly', () => {
        const vector = new Vector3();

        const spy = jest.fn();
        vector.outputs.output.subscribe(spy);

        expect(spy).toHaveBeenCalledWith(vec3(float(0), float(0), float(0)));

        vector.inputs.x.next(float(100));
        expect(spy).toHaveBeenCalledWith(vec3(float(100), float(0),  float(0)));

        vector.inputs.y.next(float(100));
        expect(spy).toHaveBeenCalledWith(vec3(float(100), float(100), float(0)));

        vector.inputs.z.next(float(100));
        expect(spy).toHaveBeenCalledWith(vec3(float(100), float(100), float(100)));
    });
});
