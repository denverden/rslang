import AppStore from '../AppStore';

export function clockToString(date) {
  const year = date.getFullYear();
  const monthNum = (date.getMonth() < 10) ? `0${(date.getMonth() + 1)}` : (date.getMonth() + 1);
  const day = date.getDate();
  const hours = (date.getHours() < 10) ? `0${date.getHours()}` : date.getHours();
  const minutes = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes();
  const seconds = (date.getSeconds() < 10) ? `0${date.getSeconds()}` : date.getSeconds();

  return `${year}-${monthNum}-${day} ${hours}:${minutes}:${seconds}`;
}

export function removeSomeCSSClass(elementClass, removeClass) {
  document.querySelectorAll(elementClass).forEach((item) => {
    item.classList.remove(removeClass);
  });
}

export function addSomeCSSClass(elementClass, addClass) {
  document.querySelectorAll(elementClass).forEach((item) => {
    item.classList.add(addClass);
  });
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function playAudio(audioCSSClass, audioURL) {
  const audio = document.querySelector(`.${audioCSSClass}`);
  audio.autoplay = true;
  audio.setAttribute('src', audioURL);

  audio.onerror = () => {
    AppStore.viewMessage('alert-danger', 'Failed to load audio');
  };
}

export async function getUserWordIdsArr() {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('userToken');
  const url = `${AppStore.apiUrl}/users/${userId}/words`;
  const userWordIdsArr = [];

  try {
    const rawResponse = await fetch(url, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    const content = await rawResponse.json();

    if (content.error) AppStore.viewMessage('alert-danger', 'Failed to load all user words');

    content.forEach((val) => userWordIdsArr.push(val.wordId));
  } catch (error) {
    AppStore.viewMessage('alert-danger', 'Failed to load all user words');
  }

  return userWordIdsArr;
}

async function getUserWordInfo(wordId) {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('userToken');
  let wordInfoObj;

  try {
    const rawResponse = await fetch(`${AppStore.apiUrl}/users/${userId}/words/${wordId}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    wordInfoObj = await rawResponse.json();

    if (wordInfoObj.error) AppStore.viewMessage('alert-danger', 'Word info search failed');
  } catch (error) {
    AppStore.viewMessage('alert-danger', 'Word info search failed');
  }

  return wordInfoObj;
}

async function postNewUserWord(wordId, wordObj) {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('userToken');

  try {
    const res = await fetch(`${AppStore.apiUrl}/users/${userId}/words/${wordId}`, {
      method: 'POST',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wordObj),
    });
    const response = await res.json();

    if (response.error) AppStore.viewMessage('alert-danger', 'Failed to create new user word');
  } catch (err) {
    AppStore.viewMessage('alert-danger', 'Failed to create new user word');
  }
}

export async function updateUserWord(wordId, guess) {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('userToken');
  const wordObj = await getUserWordInfo(wordId);

  delete wordObj.id;
  delete wordObj.wordId;
  wordObj.optional.time = clockToString(new Date());

  if (guess) {
    wordObj.optional.ratio += 1;
    wordObj.optional.success += 1;
  } else {
    wordObj.optional.ratio -= 1;
    wordObj.optional.error += 1;
  }

  try {
    const res = await fetch(`${AppStore.apiUrl}/users/${userId}/words/${wordId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wordObj),
    });

    const result = await res.json();

    if (result.error) AppStore.viewMessage('alert-danger', 'Failed to update word statistics');
  } catch (err) {
    AppStore.viewMessage('alert-danger', 'Failed to update word statistics');
  }
}

export async function createUserWord(wordId, guess) {
  const wordObj = {
    difficulty: 'string',
    optional: {
      deleted: false,
      time: clockToString(new Date()),
    },
  };

  if (guess) {
    wordObj.optional.ratio = 1;
    wordObj.optional.success = 1;
    wordObj.optional.error = 0;
  } else {
    wordObj.optional.ratio = -1;
    wordObj.optional.success = 0;
    wordObj.optional.error = 1;
  }

  await postNewUserWord(wordId, wordObj);
}
