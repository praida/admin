import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import api from '../../api/'

import './styles.scss'

const searchDelay = 500

const makePlaceholder = (name) => {
  return `Filter on ${name}`
}

let timeout

class SearchBar extends React.Component {
  constructor (props) {
    super(props)

    this.advancedChanged = this.advancedChanged.bind(this)
    this.filterChanged = this.filterChanged.bind(this)
    this.searchChanged = this.searchChanged.bind(this)
  }

  advancedChanged (event) {
    this.props.dispatch({
      type: 'setAdvancedSearch',
      value: event.target.checked
    })
  }

  filterChanged (fieldId) {
    return (event) => {
      this.props.dispatch({
        type: 'searchFilterChanged',
        field: fieldId,
        value: event.target.value
      })
      this.search()
    }
  }

  searchChanged (event) {
    this.props.dispatch({
      type: 'searchChanged',
      value: event.target.value
    })
    this.search()
  }

  search () {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      api.getRecords(this.props.dispatch, this.props.searchQuery, this.props.searchFilters)
    }, searchDelay)
  }

  render () {
    const nbFields = this.props.fields.length
    const nbNewFields = this.props.newFields.length
    const nbFieldsTotal = nbFields + nbNewFields
    const colspan = nbFieldsTotal < 1
      ? 1
      : nbFieldsTotal
    const simple = (
      <td colSpan={colspan}>
        <input type="text" placeholder="Search all fields" onChange={this.searchChanged} defaultValue={this.props.searchQuery} />
      </td>
    )
    const advancedSearch = this.props.fields.map((field) => {
        return (
          <td key={field._id}>
            <input
              type="text"
              onChange={this.filterChanged(field._id)}
              placeholder={makePlaceholder(field.name)}
              defaultValue={this.props.searchFilters[field._id]}
            />
          </td>
        )
      })
      .concat(this.props.newFields.map((field, idx) => {
        return (
          <td key={field || idx}>
            <input type="text" readOnly="readonly" />
          </td>
        )
      }))

    const nbActiveFilters = Object.keys(this.props.searchFilters).filter((item) => {
      return this.props.searchFilters[item] !== ''
    }).length
    return (
      <tr className="search-bar">
        {/*this.props.advancedSearch ? */advancedSearch/* : simple*/}
        <td className="options action-col">
          {/* <label htmlFor="advancedSearch" className="advancedSearchLabel">
            <input id="advancedSearch" name="advancedSearch" type="checkbox" onChange={this.advancedChanged} />
            advanced {nbActiveFilters === 0 ? null : `(${nbActiveFilters})`}
          </label> */}
        </td>
      </tr>
    )
  }
}

SearchBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired,
  newFields: PropTypes.array.isRequired,
  advancedSearch: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string.isRequired,
  searchFilters: PropTypes.object.isRequired
}

module.exports = exports = connect()(SearchBar)