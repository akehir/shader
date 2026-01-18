import { TestBed } from '@angular/core/testing';
import { ExampleComponent } from './example.component';
import { ShaderModule, ShaderService } from '@triangular/shader';
import {provideZonelessChangeDetection} from "@angular/core";

describe('ExampleComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [
        ExampleComponent,
      ],
      providers: [
        ShaderService,
        provideZonelessChangeDetection()
      ],
      imports: [
        ShaderModule.forRoot({}),
      ],
    }).compileComponents()
  );

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ExampleComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
