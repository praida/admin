import { all, takeLatest } from 'redux-saga/effects'
import { testCredentials } from './api'

export function* sagas() {
  yield all([
    takeLatest('testCredentials', testCredentials)
  ]);
}
