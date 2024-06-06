import {AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import { ShaderService } from '@triangular/shader';
import { pointCloudSpheresFragmentShader } from './shaders/vertexshaderart-point-cloud-spheres.fragment.shader';
import { pointCloudSpheresVertexShader } from './shaders/vertexshaderart-point-cloud-spheres.vertex.shader';

@Component({
  selector: 'app-example-9',
  templateUrl: './example.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ShaderService,
  ]
})
export class Example9Component implements AfterViewInit {

  constructor(private shader: ShaderService) {}

  // https://webgl2fundamentals.org/webgl/lessons/webgl-drawing-without-data.html
  // todo: instead of array / triangle, draw vertexes / point clouds
  ngAfterViewInit() {
    this.shader.createProgram(
      'point-cloud-spheres',
      pointCloudSpheresVertexShader,
      pointCloudSpheresFragmentShader,
      (gl) => {
        const numVerts = 4096;
        const offset = 0;

        return (buffer) => {
          gl.bindFramebuffer(gl.FRAMEBUFFER, buffer);
          gl.drawArrays(gl.POINTS, offset, numVerts);
        };
      }
    ).subscribe();
  }
}
