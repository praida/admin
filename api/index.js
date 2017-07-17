import { call, put } from 'redux-saga/effects'
import actions from './actions'

module.exports = exports = {
  getVersions: function* getVersions (action) {
    try {
      const versions = yield call(actions.getVersions(action))
      console.log('versions', versions)
      yield put({
        type: 'saveVersions',
        versions
      })
    } catch (err) {
      if (err.json) {
        const error = yield err.json;
        yield put({
          type: 'failGetVersions',
          err: error,
          status: err.status
        })
      } else {
        yield put({
          type: 'failGetVersions',
          err
        })
      }
    }
  }
}