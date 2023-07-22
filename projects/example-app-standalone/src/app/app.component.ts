import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExampleComponent} from "./example.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ExampleComponent],
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  title = 'example-app-standalone';
  example = false;
}
