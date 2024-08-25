import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlightListComponent } from './components/flight-list/flight-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FlightFormComponent } from './components/flight-form/flight-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FlightListComponent, NavbarComponent, SidebarComponent, FlightFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CompanhiaAerea';
}
