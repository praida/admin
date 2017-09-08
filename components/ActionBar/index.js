import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import api from '../../api'

import Message from '../Message/'

import './styles.scss'

class ActionBar extends React.Component {
  constructor (props) {
    super(props)

    this.undoAll = this.undoAll.bind(this)
    this.reviewChanges = this.reviewChanges.bind(this)
    this.save = this.save.bind(this)
    this.dismissError = this.dismissError.bind(this)
  }
  undoAll () {
    return this.props.dispatch({
      type: 'undoAll'
    })
  }

  undoAllButton () {
    return (
      <button className="btn undoBtn destructiveBtn" onClick={this.undoAll}>Undo</button>
    )
  }

  diffSummary () {
    const more = this.props.add.length
    const diff = Object.keys(this.props.edit).length
    const less = this.props.remove.length
    const nbNewFields = this.props.newFields.length
    return (
      <ul className="diffSummary">
        {nbNewFields > 0 ? (<li>Creating {nbNewFields} new fields</li>) : null}
        {more > 0 ? (<li>Adding {more} new records</li>) : null}
        {diff > 0 ? (<li>Modifying {diff} records</li>) : null}
        {less > 0 ? (<li>Deleting {less} records</li>) : null}
      </ul>
    )
  }

  reviewChanges () {
    this.props.dispatch({
      type: 'reviewChanges',
      newFields: this.props.newFields,
      add: this.props.add,
      edit: this.props.edit,
      remove: this.props.remove
    })
  }

  reviewChangesButton () {
    return (
      <button onClick={this.reviewChanges}>Review Changes</button>
    )
  }

  save () {
    const add = this.props.add.filter(item => !item.isDeleted)
    const newFields = this.props.newFields.filter(item => item !== '')
    api.saveChanges(this.props.dispatch, {
      add: add,
      edit: this.props.edit,
      remove: this.props.remove,
      newFields,
      editedFields: this.props.editedFields,
      deletedFields: this.props.deletedFields,
    })
      .then(() => {
        return Promise.all([
          api.getFields(this.props.dispatch),
          api.getRecords(this.props.dispatch)
        ])
      })
  }

  saveButton () {
    return (
      <button className="btn saveBtn primaryBtn" onClick={this.save}>Save</button>
    )
  }

  dismissError () {
    this.props.dispatch({
      type: 'dismissSaveError'
    })
    return false
  }

  render () {
    const dirty = this.props.add.length > 0
      || this.props.edit.length > 0
      || this.props.remove.length > 0
    const classes = [
      'action-bar'
    ]
    if (dirty) {
      classes.push('dirty')
    }
    const error = this.props.saveError
      ? <Message className="messagePanel" level="error" onDismiss={this.dismissError}>
          <p>{this.props.saveError}</p>
        </Message>
      : null
    return (
      <div className={classes.join(' ')}>
        {this.undoAllButton()}
        {error}
        {/*this.diffSummary()*/}
        {/*this.reviewChangesButton()*/}
        {this.saveButton()}
      </div>
    )
  }
}

ActionBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  newFields: PropTypes.array.isRequired,
  editedFields: PropTypes.object.isRequired,
  deletedFields: PropTypes.object.isRequired,
  add: PropTypes.array.isRequired,
  edit: PropTypes.object.isRequired,
  remove: PropTypes.array.isRequired,
  reviewing: PropTypes.bool.isRequired,
  saveError: PropTypes.object
}

module.exports = exports = connect()(ActionBar)