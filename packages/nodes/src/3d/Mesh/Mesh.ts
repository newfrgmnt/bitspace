import { Node, Input, Output } from '@bitspace/circuit';
import { map, of } from 'rxjs';
import * as THREE from 'three';
import { BoxGeometry, MeshPhongMaterial } from 'three';
import { HSVSchema, MeshSchema } from '@bitspace/schemas';
import { NodeType } from '../../types';
import { hsv2rgb } from '../../../../../apps/web/src/components/ColorPicker/ColorPicker.utils';

export class Mesh extends Node {
    static displayName = 'Mesh';
    static type = NodeType.MESH_3D;

    public color = new THREE.Color(0xff0000);
    public material = new MeshPhongMaterial({ color: this.color });
    public geometry = new BoxGeometry();
    public mesh = new THREE.Mesh(this.geometry, this.material);

    inputs = {
        color: new Input({
            name: 'Color',
            type: HSVSchema(),
            defaultValue: { hue: 0, saturation: 1, value: 1 }
        })
    };

    outputs = {
        mesh: new Output({
            name: 'Mesh',
            type: MeshSchema(),
            observable: this.inputs.color.pipe(
                map(color => {
                    this.color.setRGB(
                        ...hsv2rgb(color.hue, color.saturation, color.value)
                    );
                    this.material.color = this.color;
                    return this.mesh;
                })
            )
        })
    };
}
