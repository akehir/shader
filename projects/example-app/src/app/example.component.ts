import {AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import { ShaderService } from '@triangular/shader';
import { baseVertexShader } from './shaders/base.vertex.shader';
import { proteanCloudsFragmentShader } from './shaders/shadertoy-protean-clouds.fragment.shader';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ShaderService,
  ]
})
export class ExampleComponent implements AfterViewInit {

  constructor(private shader: ShaderService) {}

  ngAfterViewInit() {
    this.shader.RESIZE = true;

    this.shader.createProgram(
      'protean-clouds',
      baseVertexShader,
      proteanCloudsFragmentShader,
    ).subscribe();
  }
}
