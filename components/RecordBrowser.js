import React from 'react'
import PropTypes from 'prop-types'

import SearchBar from './SearchBar'
import Headers from './Headers'
import SearchResults from './SearchResults'
import NewRecord from './NewRecord'

import '../styles/record-browser.scss'

class RecordBrowser extends React.Component {
  render () {
    const head = (
      <thead>
        <SearchBar
          fields={this.props.fields}
        />
        <Headers
          fields={this.props.fields}
        />
      </thead>
    )
    return (
      <table className="record-browser">
        {head}
        <SearchResults
          fields={this.props.fields}
          results={this.props.results}
        />
        <NewRecord
          fields={this.props.fields}
        />
      </table>
    )
  }
}

RecordBrowser.propTypes = {
  fields: PropTypes.array,
  results: PropTypes.array
}

module.exports = exports = RecordBrowser