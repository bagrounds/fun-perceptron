;(function () {
  'use strict'

  /* imports */
  var predicate = require('fun-predicate')
  var object = require('fun-object')
  var funTest = require('fun-test')
  var arrange = require('fun-arrange')
  var array = require('fun-array')

  var compute = [
    [[[0, 0], [0]], 0],
    [[[0, 1], [0]], 0],
    [[[1, 0], [0]], 1],
    [[[1, 1], [0]], 1],
    [[[0, 0], [1]], 0],
    [[[0, 1], [1]], 1],
    [[[1, 0], [1]], 1],
    [[[1, 1], [1]], 2]
  ].map(array.append('compute'))

  /* exports */
  module.exports = [
    compute
  ].reduce(array.concat, [])
    .map(arrange({ inputs: 0, predicate: 1, contra: 2 }))
    .map(object.ap({
      predicate: predicate.equal,
      contra: object.get
    }))
    .map(funTest.sync)
})()

