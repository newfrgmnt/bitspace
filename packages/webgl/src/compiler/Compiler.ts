import { assign, defMain, FLOAT0, FLOAT1, vec4 } from '@thi.ng/shader-ast';
import { ShaderFn, shaderSourceFromAST, ShaderSpec, ShaderUniformSpecs } from '@thi.ng/webgl';
import { Fragment } from '../nodes/core/Fragment/Fragment';
import { GLSLVersion } from '@thi.ng/shader-ast-glsl';

const createShaderSpec = (root: ShaderFn, uniforms?: ShaderUniformSpecs): ShaderSpec => {
    return {
        vs: (gl, _, ins, outs) => [
            // @ts-ignore
            defMain(() => [assign(outs.vUv, ins.uv), assign(gl.gl_Position, vec4(ins.position, FLOAT0, FLOAT1))])
        ],
        fs: root,
        uniforms,
        attribs: { position: 'vec2', uv: 'vec2' },
        varying: { vUv: 'vec2' }
    };
};

export const compile = <TUniforms extends ShaderUniformSpecs>(
    fragment: Fragment,
    uniforms: TUniforms,
    target: GLSLVersion
) => {
    const shaderSpec = createShaderSpec(fragment.resolve.bind(fragment), uniforms);

    return shaderSourceFromAST(shaderSpec, 'fs', target);
};
