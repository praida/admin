import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import '../styles/new-record.css'

class NewRecord extends React.Component {
  constructor (props) {
    super(props)

    this.addNewRecord = this.addNewRecord.bind(this)
    this.changeOldField = this.changeOldField.bind(this)
    this.changeNewField = this.changeNewField.bind(this)
    this.removeNewRow = this.removeNewRow.bind(this)
  }
  addNewRecord (event) {
    this.props.dispatch({
      type: 'addNewRecord'
    })
  }
  changeOldField (rowNb, field) {
    return (event) => {
      this.props.dispatch({
        type: 'editNewRecordOldField',
        rowNb,
        field,
        value: event.target.value
      })
    }
  }
  changeNewField (rowNb, idx) {
    return (event) => {
      this.props.dispatch({
        type: 'editNewRecordNewField',
        rowNb,
        idx,
        value: event.target.value
      })
    }
  }
  removeNewRow (idx) {
    return () => {
      this.props.dispatch({
        type: 'removeNewRow',
        idx
      })
    }
  }
  render () {
    const nbFields = this.props.fields.length
    const nbFieldsTotal = nbFields + this.props.newFields.length
    const makeOldFields = (rowNb) => {
      return this.props.fields.map((field, idx) => {
        const classes = ['oldField']
        const deleted = this.props.deletedFields[field._id]
        if (deleted) {
          classes.push('fieldDeleted')
        }
        return (
          <td
            key={field._id}
            className={classes.join(' ')}
          >
            <input
              type="text"
              defaultValue={this.props.add[rowNb][field._id]}
              onChange={this.changeOldField(rowNb, field)}
              disabled={deleted}
            />
          </td>
        )
      })
    }
    const makeNewFields = (rowNb) => {
      const newFields = this.props.newFields.map((newField, idx) => {
        const classes = ['newField']
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
              defaultValue={this.props.add[rowNb] && this.props.add[rowNb].newFields && this.props.add[rowNb].newFields[idx]}
              onChange={this.changeNewField(rowNb, idx)}
              disabled={disabled}
            />
          </td>
        )
      });
      return newFields
    }

    const newRecords = this.props.add.map((item, idx) => {
      const classes = ['newRecord']
      if (item.isDeleted) {
        classes.push('isDeleted')
      }
      return (
        <tr
          key={`newRecord_${idx}:${this.props.ts}`}
          className={classes.join(' ')}
        >
          {makeOldFields(idx)}
          {makeNewFields(idx)}
          <td className="action-col">
            <span className="action-icon" onClick={this.removeNewRow(idx)}>⊗</span>
          </td>
        </tr>
      )
    })

    const recordAdder = nbFieldsTotal === 0
      ? null
      : (
        <tr>
          <td
            className="addNewRecordButton"
            colSpan={nbFieldsTotal}
            onClick={this.addNewRecord}
          >
            ⊕
          </td>
        </tr>
      )

    return (
      <tbody>
        {newRecords}
        {recordAdder}
      </tbody>
    )
  }
}

NewRecord.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired,
  newFields: PropTypes.array.isRequired,
  deletedFields: PropTypes.object.isRequired,
  add: PropTypes.array.isRequired
}

module.exports = exports = connect()(NewRecord)