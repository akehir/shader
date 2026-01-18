import { AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import {ShaderComponent, ShaderService} from '@triangular/shader';
import { baseVertexShader } from './shaders/base.vertex.shader';
import { singleColorFragmentShader } from './shaders/single-color.fragment.shader';

@Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    styleUrls: [],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        ShaderService,
    ],
    imports: [
        ShaderComponent
    ]
})
export class ExampleComponent implements AfterViewInit {
  private shader = inject(ShaderService);


  ngAfterViewInit() {
    this.shader.createProgram(
      'example',
      baseVertexShader,
      singleColorFragmentShader,
    ).subscribe();
  }
}
