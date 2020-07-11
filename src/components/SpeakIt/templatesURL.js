import AppStore from '../AppStore';

const templatesURL = {
  getImageURL(query) {
    return `https://raw.githubusercontent.com/irinainina/rslang-data/master/${query}`;
  },

  getDefaultImageURL() {
    return 'components/SpeakIt/images/blank.jpg';
  },

  getAudioURL(query) {
    return `https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${query}`;
  },

  getWordListURL(page, group) {
    return `${AppStore.apiUrl}/words?page=${page}&group=${group}`;
  },
};

export default templatesURL;
