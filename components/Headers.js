import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import getColClassName from '../helpers/getColClassName'

class Headers extends React.Component {
  constructor (props) {
    super(props)

    this.addCol = this.addCol.bind(this)
    this.changeNewField = this.changeNewField.bind(this)
  }
  addCol () {
    this.props.dispatch({
      type: 'addCol'
    })
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
    const newFields = []
    for (let i = 0; i < this.props.nbNewFields; i += 1) {
      newFields.push(
        <th key={`newField_${i}`}>
          <input type="text" onChange={this.changeNewField(i)} />
        </th>
      )
    }
    return (
      <tr>
        {this.props.fields.map((field, idx) => {
          return (
            <th key={field} className={getColClassName(nbFieldsTotal, idx)}>
              <input type="text" value={field} />
            </th>
          )
        })}
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