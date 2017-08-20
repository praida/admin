import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import '../styles/records.css'

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
    const nbFieldsTotal = nbFields + this.props.newFields.length
    const records = this.props.records.map((record) => {
      const oldFields = this.props.fields.map((field, idx) => {
        const classes = ['oldField']
        let value = record[field._id]
        const edited = this.props.edit[record._id]
          && this.props.edit[record._id][field._id]
        const deleted = this.props.deletedFields[field._id]
        if (edited) {
          value = edited
          if (!deleted) {
            classes.push('edited')
          }
        }
        if (deleted) {
          classes.push('deleted')
        }
        return (
          <td
            key={`${field._id}:${this.props.ts}`}
            className={classes.join(' ')}
          >
            <input
              type="text"
              defaultValue={value}
              onChange={this.changeOldField(record, field)}
              disabled={deleted}
            />
          </td>
        )
      })
      const newFields = this.props.newFields.map((newField, idx) => {
        const classes = ['newField']
        let value = this.props.edit[record._id]
          && this.props.edit[record._id].newFields
          && this.props.edit[record._id].newFields[idx]
        const disabled = newField === ''
        if (disabled) {
          classes.push('disabled')
        }
        return (
          <td
            key={`newField_${idx}`}
            className={classes.join(' ')}
          >
            <input
              type="text"
              defaultValue={value}
              onChange={this.changeNewField(record, idx)}
              disabled={disabled}
            />
          </td>
        )
      })
      const classes = ['record']
      const deleted = this.props.remove.includes(record._id)
      if (deleted) {
        classes.push('deleted')
      }
      return (
        <tr key={record._id} className={classes.join(' ')}>
          {oldFields}
          {newFields}
          <td className="action-col">
            <span className="action-icon" onClick={this.removeRow(record)}>⊗</span>
          </td>
        </tr>
      )
    })
    return (
      <tbody>
        {records}
      </tbody>
    )
  }
}

SearchResults.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired,
  newFields: PropTypes.array.isRequired,
  deletedFields: PropTypes.object.isRequired,
  records: PropTypes.array.isRequired,
  ts: PropTypes.number.isRequired,
  edit: PropTypes.object.isRequired,
  remove: PropTypes.array.isRequired
}

module.exports = exports = connect()(SearchResults)