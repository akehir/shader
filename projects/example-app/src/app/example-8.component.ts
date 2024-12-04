import {AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import { ShaderService } from '@triangular/shader';
import { baseVertexShader } from './shaders/base.vertex.shader';
import { glslSandboxE68518F1 } from './shaders/gslsandbox-e-68518.1.fragment.shader';

// eslint-disable-next-line @angular-eslint/prefer-standalone
@Component({
  selector: 'app-example-8',
  templateUrl: './example.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
      ShaderService,
  ],
  standalone: false
})
export class Example8Component implements AfterViewInit {

  constructor(private shader: ShaderService) {}

  ngAfterViewInit() {
    this.shader.createProgram(
      'E68518F1',
      baseVertexShader,
      glslSandboxE68518F1,
    ).subscribe();
  }
}
