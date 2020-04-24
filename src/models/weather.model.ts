import { calculateWindDirection } from '../app/utils';
interface ILocation {
  lon: number;
  lat: number;
}
interface IWeather {
  main: string;
  description: string;
  temp: {
    current: number;
    feelsLike: number;
    min: number;
    max: number;
  };
  pressure: number;
  humidity: number;
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    direction: string;
  };
}
interface IWeatherData {
  coord: ILocation;
  weather: IWeather;
  //"clouds":{"all":1},
  // Maybe do some time manipulation on the server side to get a better time of day?
  dt: number;
  country: string;
  sunrise: number;
  sunset: number;
  timezone: number;
  city: string;
}
interface IWeatherResponse {
  coord: ILocation;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

class Weather implements IWeatherData {
  coord: ILocation;
  weather: IWeather;
  //"clouds":{"all":1},
  // Maybe do some time manipulation on the server side to get a better time of day?
  dt: number;
  country: string;
  sunrise: number;
  sunset: number;
  timezone: number;
  city: string;
  //{"coord":{"lon":-81.71,"lat":26.19},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"base":"stations","main":{"temp":298.55,"feels_like":295.04,"temp_min":297.59,"temp_max":300.15,"pressure":1016,"humidity":42},"visibility":16093,"wind":{"speed":5.7,"deg":70},"clouds":{"all":1},"dt":1587610473,"sys":{"type":1,"id":3303,"country":"US","sunrise":1587552981,"sunset":1587599625},"timezone":-14400,"id":0,"name":"Naples","cod":200}
  constructor(weatherData: IWeatherResponse) {
    const windDirection = calculateWindDirection(weatherData.wind.deg);
    this.coord = weatherData.coord;
    this.weather = {
      main: weatherData.weather[0].main,
      description: weatherData.weather[0].description,
      temp: {
        current: weatherData.main.temp,
        feelsLike: weatherData.main.feels_like,
        min: weatherData.main.temp_min,
        max: weatherData.main.temp_max,
      },
      pressure: weatherData.main.pressure,
      humidity: weatherData.main.humidity,
      visibility: weatherData.visibility,
      // TODO: add wind direction text
      wind: {
        speed: weatherData.wind.speed,
        deg: weatherData.wind.deg,
        direction: windDirection,
      },
    };
    this.dt = weatherData.dt;
    this.country = weatherData.sys.country;
    this.sunrise = weatherData.sys.sunrise;
    this.sunset = weatherData.sys.sunset;
    this.timezone = weatherData.timezone;
    this.city = weatherData.name;
  }
}
export type { ILocation, IWeather, IWeatherData };
export { Weather };
