import React from 'react'

import ActionBar from '../components/ActionBar'

import RecordBrowser from '../components/RecordBrowser'

const host = process.env.PRAIDA_ADMIN_DB_HOST || 'BOOM'
const user = process.env.PRAIDA_ADMIN_DB_USER || 'Boom'
const pass = process.env.PRAIDA_ADMIN_DB_PASS || '800M'

const state = {
  fields: [
    'name',
    'address',
    'phone'
  ],
  results: [{
    _id: 1,
    name: 'Shawn',
    phone: '514-903-9082',
    address: '557A Gounod'
  }, {
    _id: 2,
    name: 'Maryse',
    phone: '514-123-1234',
    address: '4598 Jeanne Mance'
  }],
  changes: {
    add: [{
      name: 'Jacinthe',
      address: '4598 Jeanne-Mance',
      phone: '514-098-7654'
    }],
    edit: [],
    remove: []
  }
}

const Landing = () => {
  return (
    <div>
      <RecordBrowser
        fields={state.fields}
        results={state.results}
        add={state.changes.add}
        edit={state.changes.edit}
        remove={state.changes.remove}
      />
      <ActionBar
        add={state.changes.add}
        edit={state.changes.edit}
        remove={state.changes.remove}
      />
    </div>
  )
}

export default Landing
