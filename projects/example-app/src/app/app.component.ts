import { Component, ViewEncapsulation } from '@angular/core';
import {ngModule, component, styles, service, moduleWithConfiguration} from './code';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'Angular WebGL Fluid Simulation';
  step2 = ngModule;
  step3a = component;
  step3b = styles;
  step3c = moduleWithConfiguration;
  step3d = service;

  constructor() {}
}
