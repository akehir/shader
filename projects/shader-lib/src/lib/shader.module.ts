import { ModuleWithProviders, NgModule } from '@angular/core';
import { ShaderComponent } from './components/shader.component';
import { ShaderService } from './services/shader-service';
import { ShaderConfigValue, ShaderConfig } from './config/shader-config';
import { Partial } from './common';

@NgModule({
  declarations: [],
  imports: [ShaderComponent],
  exports: [ShaderComponent]
})
export class ShaderModule {
  static forRoot(config: Partial<ShaderConfig> = {}): ModuleWithProviders<ShaderModule> {
    return {
      ngModule: ShaderModule,
      providers: [
        {
          provide: ShaderConfigValue,
          useValue: config,
        },
        ShaderService,
      ]
    };
  }
}
