import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BuyTicketDialogComponent } from '../dialogs/buy-ticket-dialog/buy-ticket-dialog.component';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

export interface Filter {
  active: boolean;
  type: string;
  icon: string;
  color: string;
  iconBg: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  iconAssetsPath = 'assets/icons/transport-';

  fromDestinationId: any;
  toDestinationId: any;
  fromDate: Date;
  toDate: Date;
  locations: any[];

  flights: any[];
  
  routesListed: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    // Initialize fromDate and toDate to the current date
    this.fromDate = new Date();
    this.toDate = new Date();
    this.getLocations();
  }

  onSearch(): void {
    console.log(this.fromDestinationId);
    const searchPayload = {
      departureLocation: this.fromDestinationId,
      arrivalLocation: this.toDestinationId,
      departureDate: null,
      arrivalDate: null
    }; 
    this.apiService.searchFlights(searchPayload).subscribe(flights => {
      this.flights = flights;
      for(var a of flights) {
        a.departureLocation = this.locations[a.departureLocation - 1].city;
        a.arrivalLocation = this.locations[a.arrivalLocation - 1].city;
      }
      
      this.routesListed = flights?.length > 0
    });
  }

  openFlightDetails(flight: any): void {
    this.router.navigate(['/flight-details'], { queryParams: { id: flight.id } });
  } 


  getLocations() {
    this.apiService.getLocations().subscribe(locations => {
      this.locations=locations;
    });
  }

  onFromDestinationChange(fromDestination) {
    this.fromDestinationId = fromDestination.value; 
  }
  onToDestinationChange(toDestination) {
    this.toDestinationId = toDestination.value; 
  }
}
