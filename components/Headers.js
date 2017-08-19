import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import getColClassName from '../helpers/getColClassName'

import '../styles/headers.css'

class Headers extends React.Component {
  constructor (props) {
    super(props)

    // this.state = {
    //   lastNbNewFields: this.props.newFields.length
    // }

    this.addCol = this.addCol.bind(this)
    this.changeOldField = this.changeOldField.bind(this)
    this.changeNewField = this.changeNewField.bind(this)
  }
  // componentDidUpdate () {
  //   if (this.props.newFields.length > this.state.lastNbNewFields) {
  //     this.state.lastNewCol.focus()
  //   }
  //   this.state.lastNbNewFields = this.props.newFields.length
  // }
  addCol () {
    this.props.dispatch({
      type: 'addCol'
    })
  }
  changeOldField (field) {
    return (event) => {
      this.props.dispatch({
        type: 'editField',
        field,
        value: event.target.value
      })
    }
  }
  changeNewField (idx) {
    return (event) => {
      this.props.dispatch({
        type: 'changeNewField',
        idx,
        value: event.target.value
      })
    }
  }
  render () {
    const nbFields = this.props.fields.length
    const nbFieldsTotal = nbFields + this.props.newFields.length
    const oldFields = this.props.fields.map((field, idx) => {
      const classes = ['oldField', getColClassName(nbFieldsTotal, idx)]
      let value = field.name
      const edited = this.props.editedFields[field._id]
      const deleted = this.props.deletedFields[field._id]
      if (edited) {
        value = edited.name
        if (!deleted) {
          classes.push('edited')
        }
      }
      if (deleted) {
        classes.push('deleted')
      }
      return (
        <th
          key={`${field._id}:${this.props.ts}`}
          className={classes.join(' ')}
        >
          <input
            type="text"
            defaultValue={value}
            placeholder="Delete"
            onChange={this.changeOldField(field)}
          />
        </th>
      )
    })
    const newFields = this.props.newFields.map((newField, idx) => {
      const classes = ['newField', getColClassName(nbFieldsTotal, nbFields + idx)]
      return (
        <th
          key={`newField_${idx}`}
          className={classes.join(' ')}
        >
          <input
            type="text"
            defaultValue={newField}
            onChange={this.changeNewField(idx)}
            // ref={(element) => {
            //   this.state.lastNewCol = element
            // }}
          />
        </th>
      )
    })
    return (
      <tr className="headers">
        {oldFields}
        {newFields}
        <td className="action-col">
          <span className="action-icon" onClick={this.addCol}>⊕</span>
        </td>
      </tr>
    )
  }
}

Headers.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ts: PropTypes.number.isRequired,
  fields: PropTypes.array.isRequired,
  editedFields: PropTypes.object.isRequired,
  newFields: PropTypes.array.isRequired,
  deletedFields: PropTypes.object.isRequired,
}

module.exports = exports = connect()(Headers)