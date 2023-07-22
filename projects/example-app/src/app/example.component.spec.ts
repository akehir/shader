import { TestBed, waitForAsync } from '@angular/core/testing';
import { ExampleComponent } from './example.component';
import { ShaderModule, ShaderService } from '@triangular/shader';

describe('ExampleComponent', () => {
  beforeEach(waitForAsync(() => {
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
