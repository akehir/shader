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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  step: (dt?: number) => void = () => {};

  constructor(
    gl: Context,
    vertexShader: Shader,
    fragmentShader: Shader,
    render?: (buffer?: WebGLFramebuffer) => void,
    step?: (dt?: number) => void,
  ) {
    this.uniforms = {};
    this.toyUniforms = {};
    this.program = createProgram(gl, vertexShader, fragmentShader);
    this.uniforms = getUniforms(gl, this.program);
    this.gl = gl;
    this.position = gl.getAttribLocation(this.program, 'a_position');

    if (typeof render === 'function') {
      this.render = render;
    } else {
      this.render = blit(this.gl);
    }

    if (typeof step === 'function') {
      this.step = step;
    }
  }

  bind() {
    this.gl.useProgram(this.program);
  }
}
