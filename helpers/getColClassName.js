module.exports = exports = (nbFields, idx) => {
  return idx === 0
    ? 'first-col'
    : (idx === nbFields - 1)
      ? 'last-col'
      : 'mid-col'
}