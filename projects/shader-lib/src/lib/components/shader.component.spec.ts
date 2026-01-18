import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShaderComponent } from './shader.component';

import { ShaderConfigValue } from '../config/shader-config';
import { defaultConfig } from '../config/default-config';
import { ShaderService } from '../services/shader-service';
import { provideZonelessChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

describe('FluidSimulationComponent', () => {
  let component: ShaderComponent;
  let fixture: ComponentFixture<ShaderComponent>;

  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [  ],
      imports: [
        ShaderComponent
      ],
      providers: [
        provideRouter([]),
        provideZonelessChangeDetection(),
        {
          provide: ShaderConfigValue,
          useValue: defaultConfig,
        },
        ShaderService,
      ],
    })
    .compileComponents()
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ShaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
