const client = new stitch.StitchClient('praida-admin-ayrgw')
const db = client.service('mongodb', 'mongodb-atlas').db('praida')

module.exports = exports = {
  save: (changes) => {
    return client.login()
      .then(() => {
        return db.collection('records').insertMany(changes.add)
      })
  }
}
