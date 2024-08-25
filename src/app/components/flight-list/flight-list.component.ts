import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlightFormComponent } from '../flight-form/flight-form.component';
import { FlightService } from '../../services/flight.service';

interface Flight {
  id: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
}

interface PaginatedFlights {
  content: Flight[];
  totalElements: number;
}

@Component({
  selector: 'app-flight-list',
  standalone: true,
  imports: [CommonModule, FormsModule, FlightFormComponent],
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {
  flights: Flight[] = [];
  origin: string = '';
  destination: string = '';
  currentPage: number = 0;
  pageSize: number = 6;
  totalFlights: number = 0;
  totalPages: number = 0;

  constructor(private http: HttpClient, private flightService: FlightService) {}

  ngOnInit() {
    this.getFlights();
  }
  
  getFlights() {
    this.flightService.getFlights(this.currentPage, this.pageSize, this.origin, this.destination)
      .subscribe((data: PaginatedFlights) => {
        this.flights = data.content;
        this.totalFlights = data.totalElements;
        this.totalPages = Math.ceil(this.totalFlights / this.pageSize);
      });
  }

  searchFlights() {
    this.currentPage = 0;
    const params = {
      page: this.currentPage.toString(),
      size: this.pageSize.toString(),
      origin: this.origin,
      destination: this.destination
    };
    const url = 'http://localhost:8080/api/flights/filter';
    this.http.get<PaginatedFlights>(url, { params }).subscribe((data: PaginatedFlights) => {
      this.flights = data.content;
      this.totalFlights = data.totalElements;
      this.totalPages = Math.ceil(this.totalFlights / this.pageSize);
    }, error => {
      console.error('Error occurred:', error);
    });
  }

  deleteFlight(id: string) {
    if (confirm('Are you sure you want to delete this flight?')) {
      this.http.delete(`http://localhost:8080/api/flights/${id}`).subscribe(() => {
        this.getFlights();
      });
    }
  }

  clearSearch() {
    this.origin = '';
    this.destination = '';
    this.currentPage = 0;
    this.getFlights();
  }

  nextPage() {
    if ((this.currentPage + 1) * this.pageSize < this.totalFlights) {
      this.currentPage++;
      this.getFlights();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getFlights();
    }
  }
}