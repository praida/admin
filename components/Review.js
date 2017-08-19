import React from 'react'
import PropTypes from 'prop-types'

import Headers from './Headers'

const Review = (props) => (
  <table className="review">
    <thead>
      <tr>
        {props.fields.map((field, position) => {
          return (
            <th key={position}>
              {field.name}
            </th>
          )
        })}
        {props.newFields.map((field, position) => {
          return (
            <th key={position}>
              {field}
            </th>
          )
        })}
      </tr>
    </thead>
    <tbody>
      {props.add.map((item, idx) => {
        return (
          <tr key={idx} className="review-add">
            {props.fields.map((field, position) => {
              return (
                <td key={position}>
                  {item[field]}
                </td>
              )
            })}
            {props.newFields.map((field, position) => {
              return (
                <td key={position}>
                  {item[field]}
                </td>
              )
            })}
          </tr>
        )
      })}
      {Object.keys(props.edit).map((key, idx) => {
        return (
          <tr key={idx} className="review-edit">
            {props.fields.map((field, position) => {
              return (
                <td key={position}>
                  {props.edit[key][field._id]}
                </td>
              )
            })}
            {props.newFields.map((field, position) => {
              return (
                <td key={position}>
                  {props.edit[key][field._id]}
                </td>
              )
            })}
          </tr>
        )
      })}
      {props.remove.map((item, idx) => {
        return (
          <tr key={idx} className="review-remove">
            {props.fields.map((field, position) => {
              return (
                <td key={position}>
                  {item[field]}
                </td>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  </table>
)

Review.propTypes = {
  fields: PropTypes.array.isRequired,
  newFields: PropTypes.array.isRequired,
  add: PropTypes.array.isRequired,
  edit: PropTypes.object.isRequired,
  remove: PropTypes.array.isRequired,
  reviewing: PropTypes.bool.isRequired
}

module.exports = exports = Review