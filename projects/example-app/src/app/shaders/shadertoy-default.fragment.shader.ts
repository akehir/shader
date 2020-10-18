export const ShaderToyDefault = `#version 300 es
    precision highp float;

    uniform vec2 iResolution;
    uniform vec2 iMouse;
    uniform float iTime;

    // we need to declare an output for the fragment shader
    out vec4 outColor;

/*--------------------------------------------------------------------------------------*/

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;

    // Time varying pixel color
    vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));

    // Output to screen
    fragColor = vec4(col,1.0);
}


/*--------------------------------------------------------------------------------------*/

    void main() {
      mainImage(outColor, gl_FragCoord.xy);
    }
`;
