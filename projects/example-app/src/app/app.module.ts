import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ShaderModule } from '@triangular/shader';
import { ExampleComponent } from './example.component';
import { Example2Component } from './example-2.component';
import { Example3Component } from './example-3.component';
import { Example4Component } from './example-4.component';
import { Example5Component } from './example-5.component';
import { Example6Component } from './example-6.component';
import { Example7Component } from './example-7.component';
import { Example8Component } from './example-8.component';
import { Example9Component } from './example-9.component';
import { Example10Component } from './example-10.component';

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
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
    imports: [
      BrowserModule,
      ShaderModule.forRoot({
        RESIZE: false,
      }),
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
