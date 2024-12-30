varying vec2 vUv;
uniform float time;
uniform vec2 offset;

void main() {
    float r = sin(time) * 0.5 + 0.5;
    gl_FragColor = vec4(vUv * (offset.xy + vec2(1.0)), r, 1.0);
}