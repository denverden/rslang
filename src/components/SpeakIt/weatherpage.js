import templatesURL from "./templatesURL";
import { vocabulary } from "./vocabulary";

class WeatherPage {
  constructor() {
    this.lang = localStorage.getItem('lang') || 'en';
    this.temp = localStorage.getItem('temp') || 'c';
    this.loadData = {};
    this.pageRenderData = {};
    this.voiceActive = false;
    this.play = false;
    this.volume = 1;
  }

  async getGeoJSON(text, language) {
    try {
      const res = await fetch(templatesURL.getGeoURL(text, language));
      const data = await res.json();

      return data.results[0];
    } catch (err) {
      console.log('Error getGeoJSON', err);
    }
  }

  async getUserLocationJSON(text) {
    try {
      const res = await fetch(templatesURL.getUserLocationURL());
      const data = await res.json();

      return data;
    } catch (err) {
      console.log('Error getGeoJSON', err);

      return err;
    }
  }

  async getWeatherJSON(city, language) {
    try {

      const res = await fetch(templatesURL.getWeatherURL(city, language));
      const data = await res.json();

      return data;
    } catch (err) {
      console.log('Error get weather JSON', err);
      return err;
    }
  }

  async translateText(text) {
    const res = await fetch(templatesURL.getYandexURL(text, this.lang));
    const data = await res.json();

    return data.text[0];
  }

  async setImage(elm, query) {
    try {
      const res = await fetch(templatesURL.getImageUnsplashURL(query));
      const data = await res.json();

      elm.style.backgroundImage = `url(${data.urls.regular})`;

      return data.urls.regular;
    } catch (err) {
      elm.style.backgroundImage = 'url(./media/bg-test.jpg)';
      return err;
    }
  }

  getDayName(dayArray) {
    this.pageRenderData.day1Name = dayArray[new Date(this.loadData.day1Date).getDay()];
    this.pageRenderData.day2Name = dayArray[new Date(this.loadData.day2Date).getDay()];
    this.pageRenderData.day3Name = dayArray[new Date(this.loadData.day3Date).getDay()];
  }

  async createPageRenderDataAndTranslate() {
    localStorage.setItem('lang', this.lang);

    this.changeTemp();

    this.pageRenderData.name = await this.translateText(this.loadData.nameRu);
    this.pageRenderData.weatherDescription = await this.translateText(this.loadData.weatherDescriptionRu);

    this.getDayName(vocabulary.dayNameArray[this.lang]);

    this.pageRenderData.weatherFeelsLikeTemp = vocabulary.feelLikes[this.lang] + this.loadData.weatherFeelsLikeTemp + '°';
    this.pageRenderData.weatherWindSpeed = vocabulary.wind[this.lang] + this.loadData.weatherWindSpeed + ' м/с';
    this.pageRenderData.humidity = vocabulary.humidity[this.lang] + this.loadData.humidity + ' %';
    this.pageRenderData.latitudeStr = vocabulary.latitude[this.lang] + this.loadData.latitudeStrVar;
    this.pageRenderData.longitudeStr = vocabulary.longitude[this.lang] + this.loadData.longitudeStrVar;

    this.pageRenderData.weatherIcon = this.loadData.weatherIcon;
    this.pageRenderData.weatherCurrentDayTemp = this.loadData.weatherCurrentDayTemp + '°';

    this.pageRenderData.day1Icon = this.loadData.day1Icon;
    this.pageRenderData.day1Temp = this.loadData.day1Temp + '°';

    this.pageRenderData.day2Icon = this.loadData.day2Icon;
    this.pageRenderData.day2Temp = this.loadData.day2Temp + '°';

    this.pageRenderData.day3Icon = this.loadData.day3Icon;
    this.pageRenderData.day3Temp = this.loadData.day3Temp + '°';

  }

  toFahrenheit(c) {
    return c * 9/5 + 32;
  }

  async changeTemp() {
    localStorage.setItem('temp', this.temp);

    if (this.temp === 'c') {
      this.pageRenderData.weatherCurrentDayTemp = Math.round(this.loadData.weatherCurrentDayTemp);
      this.pageRenderData.weatherFeelsLikeTemp = Math.round(this.loadData.weatherFeelsLikeTemp);
      this.pageRenderData.day1Temp = Math.round(this.loadData.day1Temp);
      this.pageRenderData.day2Temp = Math.round(this.loadData.day2Temp);
      this.pageRenderData.day3Temp = Math.round(this.loadData.day3Temp);

    } else if (this.temp === 'f') {
      this.pageRenderData.weatherCurrentDayTemp = Math.round(this.toFahrenheit(this.loadData.weatherCurrentDayTemp));
      this.pageRenderData.weatherFeelsLikeTemp = Math.round(this.toFahrenheit(this.loadData.weatherFeelsLikeTemp));
      this.pageRenderData.day1Temp = Math.round(this.toFahrenheit(this.loadData.day1Temp));
      this.pageRenderData.day2Temp = Math.round(this.toFahrenheit(this.loadData.day2Temp));
      this.pageRenderData.day3Temp = Math.round(this.toFahrenheit(this.loadData.day3Temp));
    }
  }

  async getWeatherData(city) {
    const geoObj = await this.getGeoJSON(city, 'ru');
    const weather = await this.getWeatherJSON(city, 'ru');

    if (weather.cod === '200') {
      this.loadData.nameRu = geoObj.formatted;
      this.loadData.lat = geoObj.geometry.lat;
      this.loadData.lng = geoObj.geometry.lng;
      this.loadData.latitudeStrVar = geoObj.annotations.DMS.lat;
      this.loadData.longitudeStrVar = geoObj.annotations.DMS.lng;

      this.loadData.offset_sec = geoObj.annotations.timezone.offset_sec;

      this.loadData.weatherDescriptionRu = weather.list[0].weather[0].description;
      this.loadData.weatherIcon = weather.list[0].weather[0].icon;
      this.loadData.weatherCurrentDayTemp = Math.round(weather.list[0].main.temp);
      this.loadData.weatherFeelsLikeTemp = Math.round(weather.list[0].main.feels_like);
      this.loadData.weatherWindSpeed = weather.list[0].wind.speed;
      this.loadData.humidity = weather.list[0].main.humidity;

      this.loadData.day1Icon = weather.list[8].weather[0].icon;
      this.loadData.day1Temp = Math.round(weather.list[8].main.temp);
      this.loadData.day1Date = weather.list[8].dt_txt.split(' ')[0];

      this.loadData.day2Icon = weather.list[16].weather[0].icon;
      this.loadData.day2Temp = Math.round(weather.list[16].main.temp);
      this.loadData.day2Date = weather.list[16].dt_txt.split(' ')[0];

      this.loadData.day3Icon = weather.list[24].weather[0].icon;
      this.loadData.day3Temp = Math.round(weather.list[24].main.temp);
      this.loadData.day3Date = weather.list[24].dt_txt.split(' ')[0];

      await this.createPageRenderDataAndTranslate();

      return this.pageRenderData;
    } else {
      const searchInput = document.getElementById('search-input');
      searchInput.value = vocabulary.errorText[this.lang];
    }
  }
}

export default WeatherPage;
