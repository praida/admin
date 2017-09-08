import React from 'react'
import PropTypes from 'prop-types'

import SearchBar from '../SearchBar'
import Headers from '../Headers'
import SearchResults from '../SearchResults'
import NewRecord from '../NewRecord'

import './styles.scss'

class RecordBrowser extends React.Component {
  render () {
    const error = this.props.getFieldsError || this.props.getRecordsError
      ? <p>Oops, something went wrong. Please try again later.</p>
      : null
    const head = (
      <thead>
        {/* <SearchBar
          fields={this.props.fields}
          newFields={this.props.newFields}
          advancedSearch={this.props.advancedSearch}
        /> */}
        <Headers
          ts={this.props.ts}
          fields={this.props.fields}
          editedFields={this.props.editedFields}
          newFields={this.props.newFields}
          deletedFields={this.props.deletedFields}
        />
      </thead>
    )
    return (
      <div className="record-browser">
        {error}
        <table>
          {head}
          <SearchResults
            fields={this.props.fields}
            records={this.props.records}
            newFields={this.props.newFields}
            deletedFields={this.props.deletedFields}
            ts={this.props.ts}
            edit={this.props.edit}
            remove={this.props.remove}
          />
          <NewRecord
            fields={this.props.fields}
            newFields={this.props.newFields}
            deletedFields={this.props.deletedFields}
            add={this.props.add}
          />
        </table>
      </div>
    )
  }
}

RecordBrowser.propTypes = {
  records: PropTypes.array.isRequired,
  recordsAt: PropTypes.number.isRequired,
  ts: PropTypes.number.isRequired,
  advancedSearch: PropTypes.bool.isRequired,
  fields: PropTypes.array.isRequired,
  editedFields: PropTypes.object.isRequired,
  newFields: PropTypes.array.isRequired,
  deletedFields: PropTypes.object.isRequired,
  add: PropTypes.array.isRequired,
  edit: PropTypes.object.isRequired,
  remove: PropTypes.array.isRequired,
  reviewing: PropTypes.bool.isRequired,
  getFieldsError: PropTypes.object,
  getRecordsError: PropTypes.object
}

module.exports = exports = RecordBrowser