import { GLSLVersion } from '@thi.ng/shader-ast-glsl';
import {Fragment} from '../nodes/core/Fragment/Fragment';
import {Vector4} from '../nodes/vectors/Vector4/Vector4';
import {Addition} from '../nodes/math/Addition/Addition';
import {compile} from './Compiler';
import { float } from '@thi.ng/shader-ast';

describe('Compiler', () => {
    it('should produce valid GLSL code', () => {
        const fragmentNode = new Fragment();
        const compiledOutput = compile(fragmentNode, {}, GLSLVersion.GLES_300);

        expect(compiledOutput).toMatchSnapshot();
    });

    it('should produce valid GLSL code from a complex graph', () => {
        const a = new Vector4();
        const b = new Vector4();
        const add = new Addition();
        const fragmentNode = new Fragment();

        a.inputs.x.next(float(.3));
        a.inputs.y.next(float(.5));
        a.inputs.z.next(float(.1));

        b.inputs.x.next(float(1));
        b.inputs.y.next(float(.02));
        b.inputs.z.next(float(.6));
        b.inputs.w.next(float(1));

        a.outputs.output.connect(add.inputs.a);
        b.outputs.output.connect(add.inputs.b);
        add.outputs.output.connect(fragmentNode.inputs.color);

        const compiledOutput = compile(fragmentNode, {}, GLSLVersion.GLES_300);

        expect(compiledOutput).toMatchSnapshot();
    });
})