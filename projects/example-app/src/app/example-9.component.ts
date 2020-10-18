import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { ShaderService } from '@triangular/shader';
import { pointCloudSpheresFragmentShader } from './shaders/vertexshaderart-point-cloud-spheres.fragment.shader';
import { pointCloudSpheresVertexShader } from './shaders/vertexshaderart-point-cloud-spheres.vertex.shader';

@Component({
  selector: 'app-example-9',
  templateUrl: './example.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
  providers: [
    ShaderService,
  ]
})
export class Example9Component implements AfterViewInit {

  constructor(private shader: ShaderService) {}

  ngAfterViewInit() {
    this.shader.createProgram(
      'point-cloud-spheres',
      pointCloudSpheresVertexShader,
      pointCloudSpheresFragmentShader,
    ).subscribe();
  }
}
