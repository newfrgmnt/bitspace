import { Node, Output } from '@bitspace/circuit';
import { of } from 'rxjs';
import { NodeType } from '../../types';
import { z } from 'zod';
import { DoubleSide, ShaderMaterial } from 'three';

const VERTEX_SHADER = `varying vec2 vUv;

void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}`;

const FRAGMENT_SHADER = `varying vec2 vUv;

void main() {
    gl_FragColor = vec4(vUv, 1.0, 1.0);
}`;

export const ShaderSchema = () =>
    z.instanceof(ShaderMaterial).describe('Shader');

export class Shader extends Node {
    static displayName = 'Shader';
    static type = NodeType.SHADER;

    public material: ShaderMaterial = new ShaderMaterial({
        vertexShader: VERTEX_SHADER,
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
