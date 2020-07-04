import AppStore from '../AppStore';

export async function getWordInfo(wordId) {
  let wordInfoObj;

  try {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/words/${wordId}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Accept: 'application/json',
      },
    });

    wordInfoObj = await rawResponse.json();

    if (wordInfoObj.error) AppStore.viewMessage('alert-danger', 'Word loading failed');
  } catch (error) {
    AppStore.viewMessage('alert-danger', 'Word loading failed');
  }

  return wordInfoObj;
}

export async function getUserWordInfo(wordId) {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('userToken');
  let wordInfoObj;

  try {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    wordInfoObj = await rawResponse.json();

    if (wordInfoObj.error) AppStore.viewMessage('alert-danger', 'Word search failed');
  } catch (error) {
    AppStore.viewMessage('alert-danger', 'Word search failed');
  }

  return wordInfoObj;
}

export async function updateWordInfo(wordId, wordObj, mark) {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('userToken');

  try {
    const res = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wordObj),
    });

    const result = await res.json();

    // todo: make messages depend on action
    let messageTextSuccess;

    if (mark === 'moveToDeleted') messageTextSuccess = 'You have deleted word successfully';
    if (mark === 'restoreFromDeleted') messageTextSuccess = 'You have restored word from deleted successfully';
    if (mark === 'restoreFromDifficult') messageTextSuccess = 'You have restored word from difficult successfully';

    if (!result.error) {
      AppStore.viewMessage('alert-info', messageTextSuccess);
    } else {
      AppStore.viewMessage('alert-danger', 'Word deletion failed');
    }
  } catch (err) {
    AppStore.viewMessage('alert-danger', 'Word deletion failed');
  }
}
