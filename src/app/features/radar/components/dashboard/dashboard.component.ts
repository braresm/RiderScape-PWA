import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { BehaviorSubject, Subject, of, switchMap, take, takeUntil } from 'rxjs';
import { LocationService } from 'src/app/core/services/location.service';
import { WeatherService } from '../../services/weather.service';
import { WeatherForcast } from '../../models/weather-forecast.model copy';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddShiftComponent } from '../add-shift/add-shift.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private router = inject(Router);

  private authService = inject(AuthService);
  private storageService = inject(StorageService);
  private locationService = inject(LocationService);
  private weatherService = inject(WeatherService);

  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  private weatherForecastSubject = new BehaviorSubject<WeatherForcast[]>([]);
  private destroySubject = new Subject<void>();

  currentUser$ = this.authService.user$;
  currentLocation$ = this.locationService.currentLocation$;
  weatherForecast$ = this.weatherForecastSubject.asObservable();

  ngOnInit(): void {
    this.locationService.currentLocation$
      .pipe(takeUntil(this.destroySubject))
      .pipe(
        switchMap((location) =>
          location
            ? this.weatherService.getWeatherForecast(
                location?.latitude,
                location?.longitude
              )
            : of([])
        )
      )
      .subscribe({
        next: (weatherForecastResponse: WeatherForcast[]) => {
          if (weatherForecastResponse) {
            console.log(weatherForecastResponse);

            // extract the forecast for the next 4 hours, including current hour
            const forecastItems = this.extractForecast(
              weatherForecastResponse,
              4
            );
            this.weatherForecastSubject.next(forecastItems);
          }
        },
        error: (error) => console.error(error),
      });
  }

  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  private extractForecast(
    forecast: WeatherForcast[],
    size: number
  ): WeatherForcast[] {
    const currentUtcDatetime = new Date().toISOString();

    // extract the fulldate and the hour from the ISO string
    // e.g. from '2023-05-14T08:01:30.915Z' it will extract '2023-05-14T08'
    const startingHour = currentUtcDatetime.substring(0, 13);

    // find the index of the forecast for the current hour
    const currentForecastIndex = forecast.findIndex((f) =>
      f.time.startsWith(startingHour)
    );

    return forecast.slice(currentForecastIndex, currentForecastIndex + size);
  }

  getLocalTime(utcDatetimeString: string) {
    // get the the time difference between UTC time and local time in minutes
    const timezoneOffset = new Date().getTimezoneOffset();

    // convert the string datetime to datetime object
    const utcDatetime = new Date(utcDatetimeString);

    // add the timezone offset to the UTC datetime
    utcDatetime.setMinutes(utcDatetime.getMinutes() + timezoneOffset * -1);

    // extract the time
    const hours = String(utcDatetime.getHours()).padStart(2, '0');
    const minutes = String(utcDatetime.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  onAddShift(): void {
    const dialogRef = this.dialog.open(AddShiftComponent, {
      width: '320px',
      data: { userId: 'austin' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('result');
    });
  }

  getCurrentDate(): Date {
    return new Date();
  }

  onUserImageSelected(event: any) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    this.snackBar.open('Your profile image is updating');

    this.currentUser$.pipe(take(1)).subscribe({
      next: async (user) => {
        const fileExtension = file.name.split('.').pop();
        const fileName = `profile-image.${fileExtension}`;
        const imagePath = `${user?.uid}/profile/${fileName}`;
        const downloadUrl = await this.storageService.uploadUserProfilImage(
          file,
          imagePath
        );
        await this.authService.updatePhotoUrl(downloadUrl);
        this.snackBar.open('Your profile image has been updated successfully');
      },
    });
  }

  async onLogout(): Promise<void> {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error(error);
    }
  }
}
