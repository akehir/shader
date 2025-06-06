# Angular WebGL Shader Component

If you want to use a fancy WebGL shader in your Angular App, this small demo can get you started. 

You can see the component running in the background of the example app. Press `p` to toggle the pause, and press `s` to download a screenshot of the simulation. Press `w` to create more splashes.

## Demo
You can find the live demo at: https://shader.akehir.com.

## Getting Started

If you just want to use the library, follow the following 3 simple steps. For contributing, or building the library locally, see the section on [building](#building) the library.

Supported Angular Versions
| Angular Version | WebGL Shader Library     |
| --------------- | ------------------------ |
| 10.x            | 0.1.0   - 0.6.1          |
| 11.x            | 0.7.0   - 0.7.12         |
| 12.x            | 0.8.0   - 0.8.1          |
| 13.x            | 0.9.0   - 0.9.1          |
| 14.x            | 0.10.0  - 0.10.0         |
| 15.x            | 0.11.0  - 0.11.3         |
| 16.x            | 0.12.0  - 0.12.0         |
| 17.x            | 0.13.0  - 0.13.0         |
| 18.x            | 0.14.0  - 0.14.1         |
| 19.x            | 0.15.0                   |
| 20.x            | 0.20.0                   |

### Step 1: Install

Install the npm package.

```
npm i @triangular/shader
```

### Step 2: Add to NgModule Imports

Then, add the __FluidSimulationModule__ to the imports of your app.

_If you're using standalone components, you can skip this step._

```typescript
import { ShaderModule } from '@triangular/shader';

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
```

### Step 3: Add Component to App
Now you can use the provided component __<webgl-shader></webgl-shader>__ to create a canvas element with the simulation.
```html
<webgl-shader></webgl-shader>
```

Depending on whether you want to use certain features, or positions for the module, you can add styles as follows. It is important to note, that the canvas itself should not be absolutely positioned.

```css
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

```

You can configure your module by using the `ShaderModule.forRoot()` method.

```typescript
@NgModule({
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
        DITHERING_TEXTURE: true,
        DITHERING_TEXTURE_URI: 'assets/LDR_LLL1_0.png',
      }),
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

In order to change the config interactively (for instance pausing and playing the simulation, or changing the settings) , you can use the provided service.

The service will be extended to include more functionality (for example triggering screenshots or adding splashes).

```typescript
import { Component } from '@angular/core';
import { ShaderService } from '@triangular/shader';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css'],
})
export class ExampleComponent implements AfterViewInit  {

  constructor(private shader: ShaderService) { }

   ngAfterViewInit() {
       this.shader.RESIZE = true;
   
       this.shader.createProgram(
         'shader-bane',
`#version 300 es
in vec4 a_position;

void main() {
  gl_Position = a_position;
}
        `,
        `#version 300 es
precision highp float;

out vec4 outColor;

void main() {
 outColor = vec4(1, 0, 0.5, 1); // return reddish-purple
}
        `,
       ).subscribe();
     }
}
```

## Building
As a pre-requisite to build the library, you need to install all the dependencies via `npm install` or `yarn`.

### Building the Library
Before the sample app can be run, you need to build the library itself.

```
npm run ng -- build shader-lib --progress=false
```

### Building the Sample App
After building the library, it is either possible to build the sample app, via

```
npm run ng -- build example-app --prod --progress=false
```

,or to run the sample app with a local dev server:

```
npm run ng -- serve
```

## Running the tests

### Unit Tests
There are not many tests, but those that are can be run with:

```
npm run test -- --no-watch --progress=false --code-coverage --browsers ChromeHeadless
```

### And coding style tests

The project follows the [angular style guide](https://angular.io/guide/styleguide) and lints with the following command:

```
npm run lint
```

## Built With

* [WebGL](https://www.khronos.org/webgl/) - 3D Graphics for the Web
* [Angular](https://github.com/angular/angular) - The web framework used
* [NPM](https://www.npmjs.com/) - Dependency Management
* [Gitlab](https://git.akehir.com) - Source Control & CI Runner

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. 

### Version History

- 0.1.0: Initial Release
- 0.2.0: Update API for more Complex Use Cases
- 0.3.0: Update API for more Complex Use Cases
- 0.4.0: Update API to add `render` function to `programs` allowing for custom `vertices` to be used by a program. See examples 2 and 9.
- 0.5.0: Update API to add `step` function to `programs` allowing for custom updating of `uniforms`. See example 5.
- 0.6.0: Update documentation, cleanup.
- 0.6.1: Update documentation.
- 0.7.0: Add support for Angular 11
- 0.7.1: Add support for fractionally scaling the rendered Pixels
- 0.7.2: Changes to what runs outside of zone
- 0.8.0: Add support for Angular 12
- 0.8.1: Simplify API
- 0.9.0: Add support for Angular 13
- 0.9.1: Upgrade rxjs to 7.4
- 0.10.0: Add support for Angular 14
- 0.11.0: Add support for Angular 15
- 0.11.1: Cleanup
- 0.11.2: Cleanup


## Authors

* **Raphael Ochsenbein** - *Angular Part* - [Akehir](https://github.com/akehir)
* **Pavel Dobryakovn** - *JavaScript WebGL Fluid Simulation* - [PavelDoGreat](https://github.com/PavelDoGreat)

See also the list of [contributors](https://github.com/akehir/shader/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [Shadertoy](https://www.shadertoy.com/) for creating a place to share cool shaders
* [WebGL 2 Fundamentals](https://webgl2fundamentals.org/webgl/lessons/webgl-shadertoy.html) for creating a great WebGL Tutorial
* [Pavel Dobryakov](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation) for creating the original JavaScript WebGL Fluid Simulation
* [angularindepth](https://blog.angularindepth.com/creating-a-library-in-angular-6-87799552e7e5) for a tutorial for creating an angular library
* [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2/) for the readme template

