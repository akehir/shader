export const ngModule = `import { ShaderModule } from '@triangular/shader';

@NgModule({
    declarations: [
      AppComponent,
      ...,
    ],
    imports: [
      ...,
      ShaderModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
`;

export const component = `<webgl-shader></webgl-shader>`;

export const moduleWithConfiguration = `@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
  ],
    imports: [
      BrowserModule,
      ShaderModule.forRoot({
        SCREENSHOT_KEY_CODE: 'KeyS',
        PAUSE_KEY_CODE: 'KeyP',
        SPLASH_KEY: 'w',
      }),
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }`;

export const styles = `
webgl-shader {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  z-index: -1;
}

webgl-shader canvas {
  width: 100%;
  height: 100%;
  /* the canvas position cannot be absolute, otherwise the js resize will bug out */
  position: fixed;
}
`;

export const service = `import { Component } from '@angular/core';
import { ShaderService } from '@triangular/shader';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css'],
})
export class ExampleComponent {

  constructor(private shader: ShaderService) { }

    onClick() {
      // Toggle the simulation
      this.shader.PAUSED = !this.shader.PAUSED;
    }
}`;
