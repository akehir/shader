import { TestBed, async } from '@angular/core/testing';
import { ExampleComponent } from './example.component';
import { ShaderModule, ShaderService } from '@triangular/shader';
import { Example1Component } from './example-1.component';
import { Example9Component } from './example-9.component';
import { Example10Component } from './example-10.component';
import { Example8Component } from './example-8.component';
import { Example7Component } from './example-7.component';
import { Example6Component } from './example-6.component';
import { Example5Component } from './example-5.component';
import { Example4Component } from './example-4.component';
import { Example3Component } from './example-3.component';
import { Example2Component } from './example-2.component';

describe('ExampleComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExampleComponent,
      ],
      providers: [
        ShaderService,
      ],
      imports: [
        ShaderModule.forRoot({}),
      ],
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ExampleComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
