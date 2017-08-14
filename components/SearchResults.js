import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import getColClassName from '../helpers/getColClassName'

class SearchResults extends React.Component {
  constructor (props) {
    super(props)

    this.changeOldField = this.changeOldField.bind(this)
    this.changeNewField = this.changeNewField.bind(this)
    this.removeRow = this.removeRow.bind(this)
  }
  changeOldField (record, field) {
    return (event) => {
      this.props.dispatch({
        type: 'editRecordOldField',
        record,
        field,
        value: event.target.value
      })
    }
  }
  changeNewField (record, idx) {
    return (event) => {
      this.props.dispatch({
        type: 'editRecordNewField',
        record,
        idx,
        value: event.target.value
      })
    }
  }
  removeRow (record) {
    return () => {
      this.props.dispatch({
        type: 'removeRow',
        record
      })
    }
  }
  render () {
    const nbFields = this.props.fields.length
    const nbFieldsTotal = nbFields + this.props.nbNewFields
    return (
      <tbody>
        {this.props.records.map((record) => {
          if (record.isDeleted) {
            return null
          }
          const oldFields = this.props.fields.map((field, idx) => {
            const value = record[field._id]
            return (
              <td
                key={`${field._id}:${this.props.recordsAt}`}
                className={`oldField ${getColClassName(nbFieldsTotal, idx)}`}
              >
                <input
                  type="text"
                  defaultValue={value}
                  onChange={this.changeOldField(record, field)}
                />
              </td>
            )
          })
          const newFields = []
          for (let i = 0; i < this.props.nbNewFields; i += 1) {
            newFields.push(
              <td
                key={`newField_${i}`}
                className={`newField ${getColClassName(nbFieldsTotal, nbFields + i)}`}
              >
                <input
                  type="text"
                  onChange={this.changeNewField(record, i)}
                />
              </td>
            )
          }
          return (
            <tr key={record._id}>
              {oldFields}
              {newFields}
              <td className="action-col">
                <span className="action-icon" onClick={this.removeRow(record)}>x</span>
              </td>
            </tr>
          )
        })}
      </tbody>
    )
  }
}

SearchResults.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired,
  records: PropTypes.array.isRequired,
  recordsAt: PropTypes.number.isRequired
}

module.exports = exports = connect()(SearchResults)