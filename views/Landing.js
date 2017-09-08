import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import api from '../api'

import TopBar from '../components/TopBar/'

import Auth from '../components/Auth/'
import RecordBrowser from '../components/RecordBrowser/'
import Review from '../components/Review'
import ActionBar from '../components/ActionBar/'

import '../styles/wrapper.scss'
import './styles.scss'

const Landing = (props) => {
  return (
    <div className="wrapper">
      <TopBar />
      <Auth
        user={props.user}
        pass={props.pass}
        loggingIn={props.loggingIn}
        loginError={props.loginError}
        loggedIn={props.loggedIn}
      />
      <div className="main">
        {props.loggedIn
          ? (
            <RecordBrowser
              advancedSearch={props.advancedSearch}
              fields={props.fields}
              editedFields={props.editedFields}
              newFields={props.newFields}
              deletedFields={props.deletedFields}
              records={props.records}
              recordsAt={props.recordsAt}
              ts={props.ts}
              add={props.add}
              edit={props.edit}
              remove={props.remove}
              reviewing={props.reviewing}
              getFieldsError={props.getFieldsError}
              getRecordsError={props.getRecordsError}
            />
          )
          : null
        }
        {/*props.loggedIn
          ? (
            <Review
              fields={props.fields}
              newFields={props.newFields}
              add={props.add}
              edit={props.edit}
              remove={props.remove}
              reviewing={props.reviewing}
            />
          )
          : null
        */}
      </div>
      {props.loggedIn
        ? (
          <ActionBar
            newFields={props.newFields}
            editedFields={props.editedFields}
            deletedFields={props.deletedFields}
            add={props.add}
            edit={props.edit}
            remove={props.remove}
            reviewing={props.reviewing}
            saveError={props.saveError}
          />
        )
        : null
      }
    </div>
  )
}

const propsFromState = {
  // Control
  ts: PropTypes.number.isRequired,

  // View
  reviewing: PropTypes.bool.isRequired,

  // Authorization
  user: PropTypes.string.isRequired,
  pass: PropTypes.string.isRequired,
  loggingIn: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  loginFailed: PropTypes.bool.isRequired,
  loginError: PropTypes.number,

  // Fields
  gettingFields: PropTypes.bool.isRequired,
  getFieldsFailed: PropTypes.bool.isRequired,
  getFieldsError: PropTypes.object,
  fieldsAt: PropTypes.number.isRequired,
  fields: PropTypes.array.isRequired,

  // Records
  gettingRecords: PropTypes.bool.isRequired,
  getRecordsFailed: PropTypes.bool.isRequired,
  getRecordsError: PropTypes.object,
  recordsAt: PropTypes.number.isRequired,
  records: PropTypes.array.isRequired,

  // Search
  advancedSearch: PropTypes.bool.isRequired,

  // Edits

  // - fields
  newFields: PropTypes.array.isRequired,
  editedFields: PropTypes.object.isRequired,
  deletedFields: PropTypes.object.isRequired,

  // - records
  add: PropTypes.array.isRequired,
  edit: PropTypes.object.isRequired,
  remove: PropTypes.array.isRequired,

  // Save
  saveError: PropTypes.object,
}

Landing.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ...propsFromState
}

function mapStateToProps (state) {
  return Object.keys(propsFromState).reduce((prev, key) => {
    const next = {
      ...prev
    }
    next[key] = state.app[key]
    return next
  }, {})
}

export default connect(mapStateToProps)(Landing)
