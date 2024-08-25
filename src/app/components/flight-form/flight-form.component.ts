import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FlightService } from '../../services/flight.service';

@Component({
  selector: 'app-flight-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.css']
})
export class FlightFormComponent {
  flightForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private flightService: FlightService) {
    this.flightForm = this.fb.group({
      flightNumber: ['', Validators.required],
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      departureTime: ['', Validators.required],
      arrivalTime: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.flightForm.valid) {
      const formData = this.flightForm.value;
      this.http.post('http://localhost:8080/api/flights', formData)
        .subscribe(
          response => {
            console.log('Form Submitted', response);
            alert('Flight added successfully!');
            this.flightForm.reset();
            this.flightService.refreshFlights();
          },
          error => {
            if (error.status === 409) { 
              alert('Flight number already exists. Please use a different flight number.');
            } else {
              console.error('Error submitting form', error);
              alert('Failed to add flight. Please try again.');
            }
          }
        );
    } else {
      console.log('Form is invalid');
      alert('Please fill out all required fields.');
    }
  }

  onClear() {
    this.flightForm.reset();
  }
}