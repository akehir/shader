import { Inject, Injectable, Optional } from '@angular/core';
import { ShaderConfig, ShaderConfigValue } from '../config/shader-config';
import { defaultConfig } from '../config/default-config';
import { compileShader, Context, Partial, Program } from '../common';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable()
export class ShaderService implements ShaderConfig {
  BACK_COLOR: {
    r: number;
    g: number;
    b: number;
  };
  RESIZE: boolean;
  TRANSPARENT: boolean;
  CAPTURE_RESOLUTION: number;
  PAUSED: boolean;
  MOUSE_INTERACTION_LISTENERS: boolean;
  PAUSE_KEY_CODE: string;
  SPLASH_KEY: string;
  SCREENSHOT_KEY_CODE: string;
  SCREENSHOT_FILE_NAME: string;

  private gl: Context | null;
  private ext: any;
  private ready$: Subject<void> = new ReplaySubject(1);
  programs: { [key: string]: Program } = {};

  initialize(gl: Context, ext: any) {
    this.gl = gl;
    this.ready$.next();
  }

  createProgram(name: string, vertexShader: string, fragmentShader: string, ): Observable<Program> {
    return this.ready$.asObservable().pipe(
      take(1),
      map(() => {
        const vs = (gl: Context, ext?) => compileShader(this.gl, this.gl.VERTEX_SHADER, vertexShader);
        const fs = (gl: Context, ext?) => compileShader(this.gl, this.gl.FRAGMENT_SHADER, fragmentShader);

        const program = new Program(this.gl, vs, fs);


        // look up where the vertex data needs to go.
        const positionAttributeLocation = program.position;

        // look up uniform locations
        const resolutionLocation = this.gl.getUniformLocation(program.program, 'iResolution');
        const mouseLocation = this.gl.getUniformLocation(program.program, 'iMouse');
        const timeLocation = this.gl.getUniformLocation(program.program, 'iTime');

        program.toyUniforms = {
          ...program.toyUniforms,
          resolutionLocation,
          mouseLocation,
          timeLocation,
        }

        // Create a vertex array object (attribute state)
        const vao = this.gl.createVertexArray();

        program.vao = vao;

        // and make it the one we're currently working with
        this.gl.bindVertexArray(vao);

        // Create a buffer to put three 2d clip space points in
        const positionBuffer = this.gl.createBuffer();

        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

        // fill it with a 2 triangles that cover clip space
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
          -1, -1,  // first triangle
          1, -1,
          -1,  1,
          -1,  1,  // second triangle
          1, -1,
          1,  1,
        ]), this.gl.STATIC_DRAW);

        // Turn on the attribute
        this.gl.enableVertexAttribArray(positionAttributeLocation);

        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        this.gl.vertexAttribPointer(
          positionAttributeLocation,
          2,          // 2 components per iteration
          this.gl.FLOAT,   // the data is 32bit floats
          false,      // don't normalize the data
          0,          // 0 = move forward size * sizeof(type) each iteration to get the next position
          0,          // start at the beginning of the buffer
        );

        this.programs[name] = program;
        return program;
      })
    );
  }

  constructor(@Optional() @Inject(ShaderConfigValue) config: Partial<ShaderConfig>) {
    Object.assign(this, defaultConfig);

    if (config) {
      Object.assign(this, config);
    }
  }
}
