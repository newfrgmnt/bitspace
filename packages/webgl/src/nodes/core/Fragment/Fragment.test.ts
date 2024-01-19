import {Fragment} from './Fragment';

describe('WebGL Context', () => {
    it('should initialize with correct values', () => {
        const fragment = new Fragment();

        expect(typeof fragment.id).toEqual('string');
        expect(fragment.name).toEqual('Fragment');
        expect(fragment.inputs.color).toBeDefined();
        expect(fragment.outputs).toEqual({});
    });
});
