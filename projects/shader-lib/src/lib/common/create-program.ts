import { Context } from './context';
import { Shader } from './shader';

export function createProgram(gl: Context, vertexShader: Shader, fragmentShader: Shader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader(gl));
  gl.attachShader(program, fragmentShader(gl));
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw gl.getProgramInfoLog(program);
  }

  return program;
}
