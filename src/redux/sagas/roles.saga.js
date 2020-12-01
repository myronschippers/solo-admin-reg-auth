import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* getRoles() {
  try {
    const response = yield axios.get('/api/roles');

    yield put({ type: 'SET_ROLES', payload: response.data });
  } catch (error) {
    console.log('Roles get request failed', error);
  }
}

function* rolesSaga() {
  yield takeLatest('GET_ROLES', getRoles);
}

export default rolesSaga;
