import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { ShaderService } from '@triangular/shader';
import { baseVertexShader } from './shaders/base.vertex.shader';
import { singleColorFragmentShader } from './shaders/single-color.fragment.shader';

@Component({
  selector: 'app-example-2',
  templateUrl: './example.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
  providers: [
    ShaderService,
  ]
})
export class Example2Component implements AfterViewInit {

  constructor(private shader: ShaderService) {}

  ngAfterViewInit() {
    this.shader.createProgram(
      'example-2',
      baseVertexShader,
      singleColorFragmentShader,
    ).subscribe()
  }
}
