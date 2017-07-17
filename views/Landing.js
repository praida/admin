import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Credentials from '../components/Credentials'
import RecordBrowser from '../components/RecordBrowser'
import Review from '../components/Review'
import ActionBar from '../components/ActionBar'

const Landing = (props) => {
  return (
    <div>
      <Credentials />
      <RecordBrowser
        advancedSearch={props.advancedSearch}
        fields={props.fields}
        nbNewFields={props.nbNewFields}
        newFields={props.newFields}
        results={props.results}
        add={props.add}
        edit={props.edit}
        remove={props.remove}
        reviewing={props.reviewing}
      />
      <Review
        fields={props.fields}
        nbNewFields={props.nbNewFields}
        newFields={props.newFields}
        add={props.add}
        edit={props.edit}
        remove={props.remove}
        reviewing={props.reviewing}
      />
      <ActionBar
        nbNewFields={props.nbNewFields}
        newFields={props.newFields}
        add={props.add}
        edit={props.edit}
        remove={props.remove}
        reviewing={props.reviewing}
      />
    </div>
  )
}

Landing.propTypes = {
  user: PropTypes.string.isRequired,
  pass: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  nbNewFields: PropTypes.number.isRequired,
  newFields: PropTypes.array.isRequired,
  results: PropTypes.array.isRequired,
  advancedSearch: PropTypes.bool.isRequired,
  add: PropTypes.array.isRequired,
  edit: PropTypes.array.isRequired,
  remove: PropTypes.array.isRequired,
  reviewing: PropTypes.bool.isRequired
}

function mapStateToProps (state) {
  return {
    user: state.app.user,
    pass: state.app.pass,
    fields: state.app.fields,
    nbNewFields: state.app.nbNewFields,
    newFields: state.app.newFields,
    results: state.app.results,
    advancedSearch: state.app.advancedSearch,
    add: state.app.add,
    edit: state.app.edit,
    remove: state.app.remove,
    reviewing: state.app.reviewing
  }
}

export default connect(mapStateToProps)(Landing)
