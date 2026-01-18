import { AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { ShaderService } from '@triangular/shader';
import { baseVertexShader } from './shaders/base.vertex.shader';
import { seascapeFragmentShader } from './shaders/shadertoy-seascape.fragment.shader';

@Component({
  selector: 'app-example-4',
  templateUrl: './example.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
      ShaderService,
  ],
  standalone: false // eslint-disable-line @angular-eslint/prefer-standalone
})
export class Example4Component implements AfterViewInit {
  private shader = inject(ShaderService);


  ngAfterViewInit() {
    this.shader.createProgram(
      'seascape',
      baseVertexShader,
      seascapeFragmentShader,
    ).subscribe();
  }
}
