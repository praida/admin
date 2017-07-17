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
              {field}
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
      {props.edit.map((item, idx) => {
        return (
          <tr key={idx} className="review-edit">
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
      {props.remove.map((item, idx) => {
        return (
          <tr key={idx} className="review-remove">
            {propx.fields.map((field, position) => {
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
  nbNewFields: PropTypes.number.isRequired,
  newFields: PropTypes.array.isRequired,
  add: PropTypes.array.isRequired,
  edit: PropTypes.array.isRequired,
  remove: PropTypes.array.isRequired,
  reviewing: PropTypes.bool.isRequired
}

module.exports = exports = Review