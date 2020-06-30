const templatesURL = {
  getImageURL(query) {
    return `https://raw.githubusercontent.com/irinainina/rslang-data/master/${query}`;
  },

  getDefaultImageURL() {
    return 'components/SpeakIt/blank.jpg';
  },

  getAudioURL(query) {
    return `https://raw.githubusercontent.com/irinainina/rslang/rslang-data/da1ta/${query}`;
  },

  getWordListURL(page, group) {
    return `http://pacific-castle-12388.herokuapp.com/words?page=${page}&group=${group}`;
    //    return `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
  },
};

export default templatesURL;
