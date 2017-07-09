import React from 'react'
import PropTypes from 'prop-types'

import getColClassName from '../helpers/getColClassName'

class NewRecord extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    const nbFields = this.props.fields.length
    const fields = this.props.fields.map((field, idx) => {
      return <td key={field} className={getColClassName(nbFields, idx)}></td>
    })
    return (
      <tbody>
        <tr>
          {fields}
        </tr>
      </tbody>
    )
  }
}

NewRecord.propTypes = {
  fields: PropTypes.array,
}

module.exports = exports = NewRecord