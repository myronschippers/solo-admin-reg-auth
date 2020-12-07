import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and password from the payload to the server
    yield axios.put(`/api/user/register/${action.payload.tempId}`, {
      username: action.payload.username,
      password: action.payload.password,
    });

    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: action.payload });

    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({ type: 'SET_TO_LOGIN_MODE' });
  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* preregisterTempUser(action) {
  try {
    // POST our new user
    yield axios.post('/api/user/pre-register', action.payload.user);

    // dispatch to get users...
  } catch (err) {
    console.log('Error', err);
    yield put({ type: 'REGISTRATION_FAILED_TEMP_USER' });
  }
}

function* getTempUser(action) {
  try {
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    const response = yield axios.get(
      `/api/user/register/${action.payload.tempId}`
    );

    // dispatch to set temp user
    yield put({
      type: 'SET_TEMP_USER',
      payload: response.data,
    });
  } catch (err) {
    console.log('Error', err);
    yield put({ type: 'REGISTRATION_FAILED_TEMP_USER_NOT_AVAILABLE' });
  }
}

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
  yield takeLatest('POST_TEMP_USER', preregisterTempUser);
  yield takeLatest('GET_TEMP_USER', getTempUser);
}

export default registrationSaga;
