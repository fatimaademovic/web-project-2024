import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private baseUrl = 'http://localhost:3000/rest';

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    return this.http.post<any[]>(`${this.baseUrl}/user`, userData);
  }

  loginUser(loginUser: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, loginUser);
  }

  createTicket(ticket: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/ticket`, ticket);
  }

  getLocations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/location`);
  }

  searchFlights(searchPayload: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/search`, searchPayload);
  }

  getFlight(flightId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/flights/${flightId}`);
  }
}
