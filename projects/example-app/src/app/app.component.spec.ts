import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ExampleComponent } from './example.component';
import { ShaderModule } from '@triangular/shader';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ExampleComponent,
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

  it(`should have as title 'Angular WebGL Fluid Simulation'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Angular WebGL Fluid Simulation');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Angular WebGL Fluid Simulation');
  });
});
