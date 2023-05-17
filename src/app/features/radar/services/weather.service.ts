import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Weather } from '../models/weather.model';
import { Observable, map } from 'rxjs';
import { WeatherState } from '../models/weather-state.model';
import { WeatherForcast } from '../models/weather-forecast.model copy';

// Available weather states
const WEATHER_STATES: WeatherState[] = [
  {
    code: 0,
    description: 'Clear sky',
    icon: 'ic_sunny.svg',
  },
  {
    code: 1,
    description: 'Mainly clear',
    icon: 'ic_cloudy.svg',
  },
  {
    code: 2,
    description: 'Partly cloudy',
    icon: 'ic_cloudy.svg',
  },
  {
    code: 3,
    description: 'Overcast',
    icon: 'ic_cloudy.svg',
  },
  {
    code: 45,
    description: 'Foggy',
    icon: 'ic_very_cloudy.svg',
  },
  {
    code: 48,
    description: 'Depositing rime fog',
    icon: 'ic_very_cloudy.svg',
  },
  {
    code: 51,
    description: 'Light drizzle',
    icon: 'ic_rainshower.svg',
  },
  {
    code: 53,
    description: 'Moderate drizzle',
    icon: 'ic_rainshower.svg',
  },
  {
    code: 55,
    description: 'Dense drizzle',
    icon: 'ic_rainshower.svg',
  },
  {
    code: 56,
    description: 'Slight freezing drizzle',
    icon: 'ic_snowyrainy.svg',
  },
  {
    code: 57,
    description: 'Dense freezing drizzle',
    icon: 'ic_snowyrainy.svg',
  },
  {
    code: 61,
    description: 'Slight rain',
    icon: 'ic_rainy.svg',
  },
  {
    code: 63,
    description: 'Rainy',
    icon: 'ic_rainy.svg',
  },
  {
    code: 65,
    description: 'Heavy rain',
    icon: 'ic_rainy.svg',
  },
  {
    code: 66,
    description: 'Slight freezing drizzle',
    icon: 'ic_snowyrainy.svg',
  },
  {
    code: 67,
    description: 'Heavy freezing rain',
    icon: 'ic_snowyrainy.svg',
  },
  {
    code: 71,
    description: 'Slight snow fall',
    icon: 'ic_snowy.svg',
  },
  {
    code: 73,
    description: 'Moderate snow fall',
    icon: 'ic_heavysnow.svg',
  },
  {
    code: 75,
    description: 'Heavy snow fall',
    icon: 'ic_heavysnow.svg',
  },
  {
    code: 77,
    description: 'Snow grains',
    icon: 'ic_heavysnow.svg',
  },
  {
    code: 80,
    description: 'Slight rain showers',
    icon: 'ic_rainshower.svg',
  },
  {
    code: 81,
    description: 'Moderate rain showers',
    icon: 'ic_rainshower.svg',
  },
  {
    code: 82,
    description: 'Violent rain showers',
    icon: 'ic_rainshower.svg',
  },
  {
    code: 85,
    description: 'Light snow showers',
    icon: 'ic_snowy.svg',
  },
  {
    code: 86,
    description: 'Heavy snow showers',
    icon: 'ic_snowy.svg',
  },
  {
    code: 95,
    description: 'Moderate thunderstorm',
    icon: 'ic_thunder.svg',
  },
  {
    code: 96,
    description: 'Thunderstorm with slight hail',
    icon: 'ic_rainythunder.svg',
  },
  {
    code: 99,
    description: 'Thunderstorm with heavy hail',
    icon: 'ic_rainythunder.svg',
  },
];

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {}

  getWeatherForecast(
    latitude: number,
    longitude: number
  ): Observable<WeatherForcast[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('latitude', latitude);
    queryParams = queryParams.append('longitude', longitude);
    queryParams = queryParams.append(
      'hourly',
      'temperature_2m,weathercode,precipitation,windspeed_10m,pressure_msl'
    );

    // get forecast weather for the current day
    queryParams = queryParams.append('forecast_days', 1);

    const weatherForecastResponse = this.http.get(this.WEATHER_API, {
      params: queryParams,
    });

    return weatherForecastResponse.pipe(
      map((forecast: any) => {
        const hourlyForecast = forecast['hourly'];
        const count = hourlyForecast['time'].length;
        const results: WeatherForcast[] = [];

        for (let idx = 0; idx < count; idx++) {
          const code = hourlyForecast['weathercode'][idx];
          results.push({
            time: hourlyForecast['time'][idx],
            pressure: hourlyForecast['pressure_msl'][idx],
            precipitation: hourlyForecast['precipitation'][idx],
            temperature: hourlyForecast['temperature_2m'][idx],
            windspeed: hourlyForecast['windspeed_10m'][idx],
            weatherState: this.getWeatherState(code),
          });
        }
        return results;
      })
    );
  }

  getWeatherState(code: number): WeatherState {
    const weatherState = WEATHER_STATES.find((state) => state.code === code);

    if (!weatherState) {
      // default value is Clear Sky
      return WEATHER_STATES[0];
    }

    return weatherState;
  }
}
