import { Context } from './context';
import { createProgram } from './create-program';
import { getUniforms } from './get-uniforms';
import { Shader } from './shader';
import { blit } from './blit';

export class Program implements WebGLProgram {
  gl: Context;
  uniforms;
  program: WebGLProgram;
  toyUniforms;
  vao: WebGLVertexArrayObject;
  position: GLint;
  render: (buffer?: WebGLFramebuffer) => void;

  constructor(
    gl: Context,
    vertexShader: Shader,
    fragmentShader: Shader,
    render?: (buffer?: WebGLFramebuffer) => void,
    ext?
  ) {
    this.uniforms = {};
    this.toyUniforms = {};
    this.program = createProgram(gl, vertexShader, fragmentShader, ext);
    this.uniforms = getUniforms(gl, this.program);
    this.gl = gl;
    this.position = gl.getAttribLocation(this.program, 'a_position');

    if (typeof render === 'function') {
      this.render = render;
    } else {
      this.render = blit(this.gl);
    }
  }

  bind() {
    this.gl.useProgram(this.program);
  }
}
