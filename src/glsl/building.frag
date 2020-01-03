#version 300 es
precision highp float;
layout(location = 0) out vec4 outColor;
layout(location = 1) out vec3 outNormal;
in vec3 vColor;
in vec3 vNormal;

void main() {
    outColor = vec4(vColor, 1.);
    outNormal = vNormal * 0.5 + 0.5;
}