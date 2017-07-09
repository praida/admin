import React from 'react'
import PropTypes from 'prop-types'

import '../styles/search-bar.scss'

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
    const colspan = nbFields < 2
      ? 1
      : nbFields - 1
    const options = (
      <td className="options">
        <input id="advancedSearch" type="checkbox" onChange={this.onChange} />
        <label htmlFor="advancedSearch">advanced</label>
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
            <td key={field}></td>
          )
        })}
        {options}
      </tr>
    )

    return this.state.advanced ? advancedSearch : simple
  }
}

SearchBar.propTypes = {
  fields: PropTypes.array,
  advanced: PropTypes.bool
}

module.exports = exports = SearchBar