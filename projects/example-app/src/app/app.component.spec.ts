import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ExampleComponent } from './example.component';
import { ShaderModule, ShaderService } from '@triangular/shader';
import { Example2Component } from './example-2.component';
import { Example3Component } from './example-3.component';
import { Example4Component } from './example-4.component';
import { Example5Component } from './example-5.component';
import { Example6Component } from './example-6.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ExampleComponent,
        Example2Component,
        Example3Component,
        Example4Component,
        Example5Component,
        Example6Component,
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
