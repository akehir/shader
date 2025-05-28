import {AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import { ShaderService } from '@triangular/shader';
import { baseVertexShader } from './shaders/base.vertex.shader';
import { glslSandboxE68540F2 } from './shaders/gslsandbox-e-68540.2.fragment.shader';

@Component({
  selector: 'app-example-6',
  templateUrl: './example.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
      ShaderService,
  ],
  standalone: false // eslint-disable-line @angular-eslint/prefer-standalone
})
export class Example6Component implements AfterViewInit {

  constructor(private shader: ShaderService) {}

  ngAfterViewInit() {
    this.shader.createProgram(
      'e68540f2',
      baseVertexShader,
      glslSandboxE68540F2,
    ).subscribe();
  }
}
