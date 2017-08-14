import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import getColClassName from '../helpers/getColClassName'

import '../styles/headers.css'

class Headers extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      lastNbNewFields: this.props.nbNewFields
    }

    this.addCol = this.addCol.bind(this)
    this.changeOldField = this.changeOldField.bind(this)
    this.changeNewField = this.changeNewField.bind(this)
  }
  componentDidUpdate () {
    if (this.props.nbNewFields > this.state.lastNbNewFields) {
      this.state.lastNewCol.focus()
    }
    this.state.lastNbNewFields = this.props.nbNewFields
  }
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
    const nbFieldsTotal = nbFields + this.props.nbNewFields
    const oldFields = this.props.fields.map((field, idx) => {
      return (
        <th
          key={field._id}
          className={`oldField ${getColClassName(nbFieldsTotal, idx)}`}
        >
          <input
            type="text"
            defaultValue={field.name}
            placeholder="Delete"
            onChange={this.changeOldField(field)}
          />
        </th>
      )
    })
    const newFields = []
    for (let i = 0; i < this.props.nbNewFields; i += 1) {
      newFields.push(
        <th
          key={`newField_${i}`}
          className={`newField ${getColClassName(nbFieldsTotal, nbFields + i)}`}
        >
          <input
            type="text"
            onChange={this.changeNewField(i)}
            ref={(element) => {
              this.state.lastNewCol = element
            }}
          />
        </th>
      )
    }
    return (
      <tr>
        {oldFields}
        {newFields}
        <td className="action-col">
          <span className="action-icon" onClick={this.addCol}>+</span>
        </td>
      </tr>
    )
  }
}

Headers.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired,
  nbNewFields: PropTypes.number.isRequired
}

module.exports = exports = connect()(Headers)