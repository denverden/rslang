import accessSettings from './accesssetings';

const templatesURL = {
  getGeoURL(searchText, language) {
    return `https://api.opencagedata.com/geocode/v1/json?q=${searchText}&key=${accessSettings.geoKey}&language=${language}&pretty=1`;
  },

  getUserLocationURL() {
    return `https://ipinfo.io/json?token=${accessSettings.ipInfoKey}`;
  },

  getWeatherURL(searchText, language) {
    return `https://api.openweathermap.org/data/2.5/forecast?q=${searchText}&APPID=${accessSettings.openWeatherKey}&lang=${language}&units=metric`;
  },

  getYandexURL(text, language) {
    return `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${accessSettings.yandexKey}&text=${text}&lang=ru-${language}`;
  },

  getImageURL(query) {
    return `https://raw.githubusercontent.com/irinainina/rslang-data/master/${query}`;
  },

  getAudioURL(query) {
    return `https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${query}`;
  },

  getWordListURL(page, group) {
    return `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
  },
};

export default templatesURL;
