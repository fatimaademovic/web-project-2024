import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent implements OnInit {
  flightId: string;
  flight: any;
  initialPrice: number = 0;
  totalCost: number = 0;
  selectedMeal: string = '';
  selectedLuggageOption: string = '';
  locations: any[];

  constructor(private route: ActivatedRoute, private apiService: ApiService, private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.flightId = params['id'];
      this.getLocations();
      this.getFlightDetails();
    });
  }

  getFlightDetails(): void {
    this.apiService.getFlight(this.flightId).subscribe(flight => {
      this.flight = flight[0];
      this.flight.departureLocation = this.locations[this.flight.departureLocation - 1].city;
      this.flight.arrivalLocation = this.locations[this.flight.arrivalLocation - 1].city;
      this.initialPrice = this.flight.price;
      this.calculateTotalCost();
    });
  }

  calculateTotalCost(): void {
    let additionalCost = 0;
    if (this.selectedMeal === 'yes') {
      additionalCost += 10;
    }
    if (this.selectedLuggageOption === 'plus') {
      additionalCost += 20;
    } else if (this.selectedLuggageOption === 'premium') {
      additionalCost += 50;
    }
    this.totalCost = this.initialPrice + additionalCost;
  }

  getLocations() {
    this.apiService.getLocations().subscribe(locations => {
      this.locations=locations;
    });
  }

  buyTicket(): void {
    window.localStorage.removeItem('flight');
    this.flight.totalCost = this.totalCost;
    window.localStorage.setItem('flight', JSON.stringify(this.flight));
    this.paymentService.openPaymentStepOneDialog();
  }
}
