import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private baseUrl = 'http://localhost:8080/api/flights';

  constructor(private http: HttpClient) {}

  getFlights(page: number, size: number, origin: string, destination: string): Observable<any> {
    const params = {
      page: page.toString(),
      size: size.toString(),
      origin: origin,
      destination: destination
    };
    return this.http.get<any>(this.baseUrl, { params });
  }

  getLastPage(size: number, origin: string, destination: string): Observable<any> {
    const params = {
      page: '0',
      size: size.toString(),
      origin: origin,
      destination: destination
    };
    return this.http.get<any>(`${this.baseUrl}/last`, { params });
  }

  refreshFlights(page: number = 0, size: number = 6, origin: string = '', destination: string = '') {
    this.getFlights(page, size, origin, destination);
  }
}