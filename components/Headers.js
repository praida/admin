import React from 'react'
import PropTypes from 'prop-types'

import getColClassName from '../helpers/getColClassName'
class Headers extends React.Component {
  render () {
    const nbFields = this.props.fields.length
    return (
      <tr>
        {this.props.fields.map((field, idx) => {
          return (<th key={field} className={getColClassName(nbFields, idx)}>{field}</th>)
        })}
      </tr>
    )
  }
}

Headers.propTypes = {
  fields: PropTypes.array,
}

module.exports = exports = Headers