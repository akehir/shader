import { AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { ShaderService } from '@triangular/shader';
import { baseVertexShader } from './shaders/base.vertex.shader';
import { ShaderToyDefault } from './shaders/shadertoy-default.fragment.shader';

@Component({
  selector: 'app-example-10',
  templateUrl: './example.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
      ShaderService,
  ],
  standalone: false // eslint-disable-line @angular-eslint/prefer-standalone
})
export class Example10Component implements AfterViewInit {
  private shader = inject(ShaderService);


  ngAfterViewInit() {
    this.shader.createProgram(
      'shadertoy-default',
      baseVertexShader,
      ShaderToyDefault,
    ).subscribe();
  }
}
