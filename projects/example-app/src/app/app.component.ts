import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {ngModule, component, styles, service, moduleWithConfiguration} from './code';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Angular WebGL Shaders';
  step2 = ngModule;
  step3a = component;
  step3b = styles;
  step3c = moduleWithConfiguration;
  step3d = service;

  example1 = false;
  example2 = false;
  example3 = false;
  example4 = false;
  example5 = false;
  example6 = false;
  example7 = false;
  example8 = false;
  example9 = false;
  example10 = false;
}
