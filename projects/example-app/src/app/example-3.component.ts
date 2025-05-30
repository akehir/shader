import {AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import { ShaderService } from '@triangular/shader';
import { baseVertexShader } from './shaders/base.vertex.shader';
import { proteanCloudsFragmentShader } from './shaders/shadertoy-protean-clouds.fragment.shader';

@Component({
  selector: 'app-example-3',
  templateUrl: './example.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
      ShaderService,
  ],
  standalone: false // eslint-disable-line @angular-eslint/prefer-standalone
})
export class Example3Component implements AfterViewInit {

  constructor(private shader: ShaderService) {}

  ngAfterViewInit() {
    this.shader.createProgram(
      'protean-clouds',
      baseVertexShader,
      proteanCloudsFragmentShader,
    ).subscribe();
  }
}
