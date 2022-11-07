import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Grammark';

  showOutlet: boolean;

onActivate(event : any) {
  this.showOutlet = true;
}

onDeactivate(event : any) {
  this.showOutlet = false;
}
}

