varying vec3 vPosition;
uniform float time;


void main() {
    vPosition = position.xyz;
    
    vec4 worldPosition = modelMatrix *  vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}