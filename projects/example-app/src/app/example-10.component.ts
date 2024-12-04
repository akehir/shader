import {AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import { ShaderService } from '@triangular/shader';
import { baseVertexShader } from './shaders/base.vertex.shader';
import { ShaderToyDefault } from './shaders/shadertoy-default.fragment.shader';

// eslint-disable-next-line @angular-eslint/prefer-standalone
@Component({
  selector: 'app-example-10',
  templateUrl: './example.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
      ShaderService,
  ],
  standalone: false
})
export class Example10Component implements AfterViewInit {

  constructor(private shader: ShaderService) {}

  ngAfterViewInit() {
    this.shader.createProgram(
      'shadertoy-default',
      baseVertexShader,
      ShaderToyDefault,
    ).subscribe();
  }
}
