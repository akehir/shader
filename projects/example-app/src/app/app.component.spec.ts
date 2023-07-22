import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ExampleComponent } from './example.component';
import { ShaderModule, ShaderService } from '@triangular/shader';
import { Example2Component } from './example-2.component';
import { Example3Component } from './example-3.component';
import { Example4Component } from './example-4.component';
import { Example5Component } from './example-5.component';
import { Example6Component } from './example-6.component';
import { Example7Component } from './example-7.component';
import { Example8Component } from './example-8.component';
import { Example9Component } from './example-9.component';
import { Example10Component } from './example-10.component';
import { Example1Component } from './example-1.component';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ExampleComponent,
        Example1Component,
        Example2Component,
        Example3Component,
        Example4Component,
        Example5Component,
        Example6Component,
        Example7Component,
        Example8Component,
        Example9Component,
        Example10Component,
      ],
      providers: [
        ShaderService,
      ],
      imports: [
        ShaderModule.forRoot({}),
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Angular WebGL Shaders'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Angular WebGL Shaders');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Angular WebGL Shaders');
  });
});
