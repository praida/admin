import React from 'react'
import PropTypes from 'prop-types'

class SearchResults extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <tbody>
        {this.props.results.map((result) => {
          return (
            <tr key={result._id}>
              {this.props.fields.map((field) => {
                return <td key={field}>{result[field]}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    )
  }
}

SearchResults.propTypes = {
  fields: PropTypes.array.isRequired,
  results: PropTypes.array.isRequired
}

module.exports = exports = SearchResults