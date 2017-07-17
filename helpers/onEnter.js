module.exports = exports = (fn) => {
  return (event) => {
    return event.keyCode === 13
      ? fn()
      : null
  }
}