import { WeatherState } from './weather-state.model';

export interface WeatherForcast {
  time: string;
  pressure: number;
  temperature: number;
  precipitation: number;
  windspeed: number;
  weatherState: WeatherState;
}
