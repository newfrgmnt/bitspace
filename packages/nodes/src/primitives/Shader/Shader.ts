import { Node, Output } from '@bitspace/circuit';
import { of } from 'rxjs';
import { NodeType } from '../../types';
import { z } from 'zod';
import { DoubleSide, ShaderMaterial } from 'three';

const VERTEX_SHADER = `attribute vec3 position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const FRAGMENT_SHADER = `void main() {
    gl_FragColor = vec4(1.0);
}`;

export const ShaderSchema = () =>
    z.instanceof(ShaderMaterial).describe('Shader');

export class Shader extends Node {
    static displayName = 'Shader';
    static type = NodeType.SHADER;

    public material: ShaderMaterial = new ShaderMaterial({
        fragmentShader: FRAGMENT_SHADER,
        side: DoubleSide
    });

    inputs = {};

    outputs = {
        output: new Output({
            name: 'Output',
            type: ShaderSchema(),
            observable: of(this.material)
        })
    };
}
