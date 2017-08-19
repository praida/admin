import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import '../styles/search-bar.css'

class SearchBar extends React.Component {
  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }
  onChange (event) {
    this.props.dispatch({
      type: 'setAdvancedSearch',
      value: event.target.checked
    })
  }
  render () {
    const nbFields = this.props.fields.length
    const nbNewFields = this.props.newFields.length
    const nbFieldsTotal = nbFields + nbNewFields
    const colspan = nbFieldsTotal < 1
      ? 1
      : nbFieldsTotal
    const options = (
      <td className="options action-col">
        <input id="advancedSearch" type="checkbox" onChange={this.onChange} />
        <label htmlFor="advancedSearch"> advanced</label>
      </td>
    )
    const simple = (
      <tr className="search-bar">
        <td colSpan={colspan}>
          <input type="text" placeholder="Search all fields" />
        </td>
        {options}
      </tr>
    )
    const advancedSearch = (
      <tr className="search-bar">
        {this.props.fields.map((field) => {
          return (
            <td key={field._id}>
              <input type="text" />
            </td>
          )
        })}
        {this.props.newFields.map((field, idx) => {
          return (
            <td key={field || idx}>
              <input type="text" readOnly="readonly" />
            </td>
          )
        })}
        {options}
      </tr>
    )

    return this.props.advancedSearch ? advancedSearch : simple
  }
}

SearchBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired,
  newFields: PropTypes.array.isRequired,
  advancedSearch: PropTypes.bool.isRequired
}

module.exports = exports = connect()(SearchBar)