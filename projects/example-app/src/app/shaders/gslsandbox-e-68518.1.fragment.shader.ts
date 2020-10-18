export const glslSandboxE68518F1 = `#version 300 es
// http://glslsandbox.com/e#68518.1

precision highp float;

uniform float iTime;
uniform vec2 iResolution;

// we need to declare an output for the fragment shader
out vec4 outColor;

#define PI 3.141592

float sdf(vec3 p)
{
    // 平面までの距離
    return p.y;
}

float sdf_water(vec3 p)
{
    // 平面までの距離
    // return p.y - sin(p.x + p.z);
    return p.y - 1.5 * sin(length(p.xz) - iTime * PI * 2.0) * sin(iTime * PI );
}

// 水面の法線を求める
vec3 getNormalWater(vec3 p)
{
    // Pを微小変化させた時のSDFの変化を法線とみなす
    float diff = 0.0;
    return normalize(vec3(
        sdf_water(p + vec3(diff,0,0)) - sdf_water(p - vec3(diff,0,0)),
        sdf_water(p + vec3(0,diff,0)) - sdf_water(p - vec3(0,diff,0)),
        sdf_water(p + vec3(0,0,diff)) - sdf_water(p - vec3(0,0,diff))
    ));
}

float sdf_plane(vec3 p)
{
    // 平面までの距離
    return p.y;
}

// 範囲[a, b]を[c, d]へ変換
float remap(float a, float b, float c, float d, float x)
{
    return (x - a) / (b - a) * (d - c) + c;
}

void main()
{
    vec2 reso=iResolution;
    vec2 p=(gl_FragCoord.xy*2.-reso)/min(reso.x, reso.y);
    vec3 cPos = vec3(0,10,0); // camera pos
    float cRadian = radians(-75.0);
    vec3 cForward = normalize(vec3(0, sin(cRadian), cos(cRadian)));
    vec3 cUp = cross(vec3(-1,0,0), cForward); // camera up
    vec3 cSide = cross(cForward, cUp);

    float isHit = 0.0;

    vec3 rd = normalize(p.x * cSide + p.y * cUp + cForward);  // Rayの進行方向
    float t = 0.0; // Rayが進んだ距離
    float st = 0.05;
    vec3 rayPos;
    for (int i = 0; i< 1000; i++)
    {
        vec3 rp = cPos + t * rd;
        // if (sdf(rp) < 0.01)
        if (sdf_water(rp) < 0.01)
        {
            isHit = 1.0;
            rayPos = rp;
            break;
        }
        t += st;
    }

    float distance_fade = smoothstep(20.0, 10.0, t);
    float grid = max(
        step(fract(rayPos.x), 0.07),
        step(fract(rayPos.z), 0.07)
    );

    outColor = vec4(distance_fade * grid * isHit);
}
`;
