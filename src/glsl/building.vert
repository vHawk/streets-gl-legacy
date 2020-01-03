#version 300 es
precision highp float;
in vec3 position;
in vec3 color;
in vec3 normal;
out vec3 vColor;
out vec3 vNormal;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;

void main() {
    vColor = color;
    vec3 transformedNormal = normal;
    transformedNormal = vec3(normalMatrix * transformedNormal);
    vNormal = transformedNormal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}