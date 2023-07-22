export const singleColorFragmentShader = `#version 300 es
  precision highp float;

  // we need to declare an output for the fragment shader
  out vec4 outColor;

  void main() {
    outColor = vec4(1, 0, 0.5, 1); // return reddish-purple
  }
`;
