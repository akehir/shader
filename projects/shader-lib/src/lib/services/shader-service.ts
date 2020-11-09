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

  createProgram(
    name: string,
    vertexShader: string,
    fragmentShader: string,
    getRenderer?: (gl: Context) => (buffer?: WebGLFramebuffer) => void,
  ): Observable<Program> {
    return this.ready$.asObservable().pipe(
      take(1),
      map(() => {
        const vs = (gl: Context) => compileShader(gl, gl.VERTEX_SHADER, vertexShader);
        const fs = (gl: Context) => compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
        const r = getRenderer ? getRenderer(this.gl) : null;

        const program = new Program(this.gl, vs, fs, r);

        // look up uniform locations
        const resolutionLocation = this.gl.getUniformLocation(program.program, 'iResolution');
        const mouseLocation = this.gl.getUniformLocation(program.program, 'iMouse');
        const timeLocation = this.gl.getUniformLocation(program.program, 'iTime');

        program.toyUniforms = {
          ...program.toyUniforms,
          resolutionLocation,
          mouseLocation,
          timeLocation,
        };

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
