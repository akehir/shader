import { Component, ViewEncapsulation } from '@angular/core';
import {ngModule, component, styles, service, moduleWithConfiguration} from './code';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'Angular WebGL Shaders';
  step2 = ngModule;
  step3a = component;
  step3b = styles;
  step3c = moduleWithConfiguration;
  step3d = service;

  example1: boolean = false;
  example2: boolean = false;
  example3: boolean = false;
  example4: boolean = false;
  example5: boolean = false;
  example6: boolean = false;
  example7: boolean = false;
  example8: boolean = false;
  example9: boolean = false;
  example10: boolean = false;

  constructor() {}
}
