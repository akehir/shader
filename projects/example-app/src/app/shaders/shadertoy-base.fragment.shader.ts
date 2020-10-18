export const ShaderToyBase = `#version 300 es
    precision highp float;

    uniform vec2 iResolution;
    uniform vec2 iMouse;
    uniform float iTime;

    // we need to declare an output for the fragment shader
    out vec4 outColor;

/*--------------------------------------------------------------------------------------*/



/*--------------------------------------------------------------------------------------*/

    void main() {
      mainImage(outColor, gl_FragCoord.xy);
    }
`;
