import { Context } from './context';
import { createProgram } from './create-program';
import { getUniforms } from './get-uniforms';
import { Shader } from './shader';

export class Program implements WebGLProgram {
  gl: Context;
  uniforms;
  program: WebGLProgram;
  toyUniforms;
  vao: WebGLVertexArrayObject;
  position: GLint;

  constructor(gl: Context, vertexShader: Shader, fragmentShader: Shader, ext?) {
    this.uniforms = {};
    this.toyUniforms = {};
    this.program = createProgram(gl, vertexShader, fragmentShader, ext);
    this.uniforms = getUniforms(gl, this.program);
    this.gl = gl;
    this.position = gl.getAttribLocation(this.program, 'a_position');
  }

  bind() {
    this.gl.useProgram(this.program);
  }
}
