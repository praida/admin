import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import api from '../api'

import Credentials from '../components/Credentials'
import RecordBrowser from '../components/RecordBrowser'
import Review from '../components/Review'
import ActionBar from '../components/ActionBar'

import '../styles/wrapper.css'

class Landing extends React.Component {
  componentDidUpdate () {
    if (this.props.loggedIn
      && !this.props.fieldsAt
      && !this.props.gettingFields
      && !this.props.getFieldsFailed
      && !this.props.recordsAt
      && !this.props.gettingRecords
      && !this.props.getRecordsFailed
    ) {
      api.getFields(this.props.dispatch)
      api.getRecords(this.props.dispatch)
    }
  }

  render () {
    return (
      <div className="wrapper">
        <Credentials
          user={this.props.user}
          pass={this.props.pass}
        />
        <div className="main">
          {this.props.loggedIn && this.props.fieldsAt
            ? (
              <RecordBrowser
                advancedSearch={this.props.advancedSearch}
                fields={this.props.fields}
                records={this.props.records}
                recordsAt={this.props.recordsAt}
                nbNewFields={this.props.nbNewFields}
                newFields={this.props.newFields}
                add={this.props.add}
                edit={this.props.edit}
                remove={this.props.remove}
                reviewing={this.props.reviewing}
              />
            )
            : null
          }
          {/*this.props.loggedIn
            ? (
              <Review
                fields={this.props.fields}
                nbNewFields={this.props.nbNewFields}
                newFields={this.props.newFields}
                add={this.props.add}
                edit={this.props.edit}
                remove={this.props.remove}
                reviewing={this.props.reviewing}
              />
            )
            : null
          */}
        </div>
        {this.props.loggedIn
          ? (
            <ActionBar
              nbNewFields={this.props.nbNewFields}
              newFields={this.props.newFields}
              editedFields={this.props.editedFields}
              deletedFields={this.props.deletedFields}
              add={this.props.add}
              edit={this.props.edit}
              remove={this.props.remove}
              reviewing={this.props.reviewing}
            />
          )
          : null
        }
      </div>
    )
  }
}

const propsFromState = {
  // View
  reviewing: PropTypes.bool.isRequired,

  // Authorization
  user: PropTypes.string.isRequired,
  pass: PropTypes.string.isRequired,
  loggingIn: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  logginFailed: PropTypes.bool.isRequired,

  // Fields
  gettingFields: PropTypes.bool.isRequired,
  getFieldsFailed: PropTypes.bool.isRequired,
  fieldsAt: PropTypes.number.isRequired,
  fields: PropTypes.array.isRequired,

  // Records
  gettingRecords: PropTypes.bool.isRequired,
  getRecordsFailed: PropTypes.bool.isRequired,
  recordsAt: PropTypes.number.isRequired,
  records: PropTypes.array.isRequired,

  // Search
  advancedSearch: PropTypes.bool.isRequired,

  // Edits

  // - fields
  nbNewFields: PropTypes.number.isRequired,
  newFields: PropTypes.array.isRequired,
  editedFields: PropTypes.object.isRequired,
  deletedFields: PropTypes.object.isRequired,

  // - records
  add: PropTypes.array.isRequired,
  edit: PropTypes.object.isRequired,
  remove: PropTypes.array.isRequired
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
