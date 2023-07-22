import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShaderComponent } from './shader.component';

import { RouterTestingModule } from '@angular/router/testing';
import { ShaderConfigValue } from '../config/shader-config';
import { defaultConfig } from '../config/default-config';
import { ShaderService } from '../services/shader-service';

describe('FluidSimulationComponent', () => {
  let component: ShaderComponent;
  let fixture: ComponentFixture<ShaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [  ],
      imports: [
        RouterTestingModule,ShaderComponent
      ],
      providers: [
        {
          provide: ShaderConfigValue,
          useValue: defaultConfig,
        },
        ShaderService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
