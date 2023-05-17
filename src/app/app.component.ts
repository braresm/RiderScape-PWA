import { Component, OnInit, inject } from '@angular/core';
import { LocationService } from './core/services/location.service';
import { Location } from './core/models/location.model';
import { take } from 'rxjs';
import { PwaService } from './core/services/pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private locationService = inject(LocationService);
  private pwaService = inject(PwaService);

  ngOnInit(): void {
    this.askUserForLocation();
    this.pwaService.initPwaInstallPrompt();
  }

  askUserForLocation(): void {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        if (position) {
          console.log(position);

          const location: Location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          this.locationService.setCurrentLocation(location);

          this.locationService
            .getLocationDetails(
              position.coords.latitude,
              position.coords.longitude
            )
            .pipe(take(1))
            .subscribe({
              next: (data) => {
                // get the location city or village
                location.name = data.address.city || data.address.village;
                this.locationService.setCurrentLocation(location);
              },
              error: (error) => console.error(error),
            });

          console.log(
            `Current user location => latitude ${location.latitude}, longitude ${location.longitude}`
          );
        }
      },
      (error: GeolocationPositionError) => console.log(error)
    );
  }
}
