export const pointCloudSpheresFragmentShader = `#version 300 es
precision highp float;

flat in vec4 vColor;
out vec4 outColor;

void main() {
  outColor = vColor;
}

`;
