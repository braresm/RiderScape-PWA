import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Location } from '../models/location.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private readonly LOCATIONIQ_API = 'https://us1.locationiq.com/v1/reverse';

  private currentLocationSubject = new BehaviorSubject<Location | null>(null);
  currentLocation$ = this.currentLocationSubject.asObservable();

  constructor(private http: HttpClient) {}

  setCurrentLocation(location: Location) {
    this.currentLocationSubject.next(location);
  }

  getLocationDetails(latitude: number, longitude: number): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append(
      'key',
      'pk.9b40ea0c74aa43a9d9755b4c06712a70'
    );
    queryParams = queryParams.append('lat', latitude);
    queryParams = queryParams.append('lon', longitude);
    queryParams = queryParams.append('format', 'json');

    const locationDetailsResponse = this.http.get(this.LOCATIONIQ_API, {
      params: queryParams,
    });
    return locationDetailsResponse;
  }
}
