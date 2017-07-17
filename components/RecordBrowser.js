import React from 'react'
import PropTypes from 'prop-types'

import SearchBar from './SearchBar'
import Headers from './Headers'
import SearchResults from './SearchResults'
import NewRecord from './NewRecord'

import '../styles/record-browser.css'

class RecordBrowser extends React.Component {
  render () {
    const head = (
      <thead>
        <SearchBar
          fields={this.props.fields}
          nbNewFields={this.props.nbNewFields}
          newFields={this.props.newFields}
          advancedSearch={this.props.advancedSearch}
        />
        <Headers
          fields={this.props.fields}
          nbNewFields={this.props.nbNewFields}
        />
      </thead>
    )
    return (
      <table className="record-browser">
        {head}
        <SearchResults
          fields={this.props.fields}
          nbNewFields={this.props.nbNewFields}
          newFields={this.props.newFields}
          results={this.props.results}
        />
        <NewRecord
          fields={this.props.fields}
          nbNewFields={this.props.nbNewFields}
          newFields={this.props.newFields}
        />
      </table>
    )
  }
}

RecordBrowser.propTypes = {
  advancedSearch: PropTypes.bool.isRequired,
  fields: PropTypes.array.isRequired,
  nbNewFields: PropTypes.number.isRequired,
  newFields: PropTypes.array.isRequired,
  results: PropTypes.array.isRequired,
  add: PropTypes.array.isRequired,
  edit: PropTypes.array.isRequired,
  remove: PropTypes.array.isRequired,
  reviewing: PropTypes.bool.isRequired
}

module.exports = exports = RecordBrowser