import React from 'react'
import PropTypes from 'prop-types'

import getColClassName from '../helpers/getColClassName'

class NewRecord extends React.Component {
  fields () {
    return this.props.fields.map((field, idx) => {
      return (
        <td key={field} className={getColClassName(nbFields, idx)}>
          <input type="text" />
        </td>
      )
    })
  }
  render () {
    const nbFields = this.props.fields.length
    return (
      <tbody>
        <tr>
          {this.fields}
        </tr>
      </tbody>
    )
  }
}

NewRecord.propTypes = {
  fields: PropTypes.array.isRequired,
  newFields: PropTypes.array.isRequired
}

module.exports = exports = NewRecord