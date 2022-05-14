const withTM = require('next-transpile-modules')(['ui', 'rapid-form'])

module.exports = withTM({
  reactStrictMode: true,
})
