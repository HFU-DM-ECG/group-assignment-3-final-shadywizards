varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vLayer0;
varying vec3 vLayer1;
varying vec3 vLayer2;
varying vec3 eyeVector;
varying vec3 vNormal;

uniform float time;

mat2 rotate(float a) {
   float s = sin(a);
   float c = cos(a);
   return mat2(c, -s, s, c); 
}


void main() {
    // create 3 layers, which all move differently --------------------------------
    // in the fragment shader they are used to create 3 different layers of noise
    float t = time * 0.0002;
    mat2 rot = rotate(t);
    mat2 rot1 = rotate(t + 10.);
    mat2 rot2 = rotate(t + 30.);

    vec3 p0 = position.xyz;
    p0.yz = rot*p0.yz; //rotate around the x axis
    vLayer0 = p0;

    vec3 p1 = position.xyz;
    p1.xz = rot1*p1.xz; //rotate around the y axis
    vLayer1 = p1;

    vec3 p2 = position.xyz;
    p2.xy = rot2*p2.xy; //rotate around the z axis
    vLayer2 = p2;
    //-----------------------------------------------------------------------------

    vUv = uv;

    vPosition = position.xyz;
    vec4 worldPosition = modelMatrix *  vec4(position, 1.0);

    vNormal = normal;
    eyeVector = normalize(worldPosition.xyz - cameraPosition);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}