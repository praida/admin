import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import getColClassName from '../helpers/getColClassName'

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
    const nbFieldsTotal = nbFields + this.props.nbNewFields
    const makeOldFields = (rowNb) => {
      return this.props.fields.map((field, idx) => {
        return (
          <td
            key={field._id}
            className={`oldField ${getColClassName(nbFieldsTotal, idx)}`}
          >
            <input
              type="text"
              defaultValue={this.props.add[rowNb][field._id]}
              onChange={this.changeOldField(rowNb, field)}
            />
          </td>
        )
      })
    }
    const makeNewFields = (rowNb) => {
      const newFields = []
      for (let i = 0; i < this.props.nbNewFields; i += 1) {
        newFields.push(
          <td
            key={`newField_${i}`}
            className={`newField ${getColClassName(nbFieldsTotal, nbFields + i)}`}
          >
            <input
              type="text"
              onChange={this.changeNewField(rowNb, i)}
            />
          </td>
        )
      }
      return newFields
    }

    const newRecords = this.props.add.map((item, idx) => {
      if (item.isDeleted) {
        return null
      }
      return (
        <tr
          key={`newRecord_${idx}`}
          className={`newRecord ${getColClassName(nbFieldsTotal, nbFields + idx)}`}
        >
          {makeOldFields(idx)}
          {makeNewFields(idx)}
          <td className="action-col">
            <span className="action-icon" onClick={this.removeNewRow(idx)}>⊗</span>
          </td>
        </tr>
      )
    })

    return (
      <tbody>
        {newRecords}
        <tr>
          <td
            className="addNewRecordButton"
            colSpan={nbFieldsTotal}
            onClick={this.addNewRecord}
          >
            ⊕
          </td>
        </tr>
      </tbody>
    )
  }
}

NewRecord.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired,
  newFields: PropTypes.array.isRequired,
  nbNewFields: PropTypes.number.isRequired,
  add: PropTypes.array.isRequired
}

module.exports = exports = connect()(NewRecord)