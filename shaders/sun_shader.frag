varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vLayer0;
varying vec3 vLayer1;
varying vec3 vLayer2;
varying vec3 eyeVector;
varying vec3 vNormal;

uniform float time;
uniform sampler2D texture1;
uniform vec4 resolution;
uniform samplerCube uPerlin;


// calculates brightness values according to angle between normal of the vertex and the vector of the "eye" -> camera
// values are brighter the bigger the angle
float Fresnel(vec3 eyeVector, vec3 worldNormal) {
    return pow(1.0 + dot(eyeVector, worldNormal), 3.0);
}


vec3 brightnessToColor(float b) {
    b *= 0.25;
    //assign brightness value to the different color channels
    //brightness to the power of 2 leads to a smaller value, bc the value is always between 0 and 1
    //for the color of the sun, red should get the highest value, green a smaller one and blue should be almost zero
    return (vec3(b, b*b, b*b*b*b) / 0.25) * 0.8;
}

float layeredNoiseTexture() {
    highp float sum = 0.;
    //textureCube returns a texel, i.e. the color value of the texture at the given coordinates
    sum += textureCube(uPerlin, vLayer0).r; //each layer contains the perlin texture from the perlin_shader
    sum += textureCube(uPerlin, vLayer1).r;
    sum += textureCube(uPerlin, vLayer2).r;
    //overlapping textures would be too bright without lowering brightness
    sum *= 0.23;
    return sum;
} 


void main() {
    float brightness = layeredNoiseTexture();
    brightness = brightness*1.5 + 1.;

    float fres = Fresnel(eyeVector, vNormal);
    brightness += pow(fres, 0.3);

    vec3 color = brightnessToColor(brightness);
    gl_FragColor = vec4(color, 1.0);
}