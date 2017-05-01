;(function () {
  'use strict'

  /* imports */
  var predicate = require('fun-predicate')
  var object = require('fun-object')
  var funTest = require('fun-test')
  var arrange = require('fun-arrange')
  var array = require('fun-array')

  var classify = [
    [[[0, 0], [0]], false, 'classify'],
    [[[0, 1], [0]], false, 'classify'],
    [[[1, 0], [0]], true, 'classify'],
    [[[1, 1], [0]], true, 'classify'],
    [[[0, 0], [1]], false, 'classify'],
    [[[0, 1], [1]], true, 'classify'],
    [[[1, 0], [1]], true, 'classify'],
    [[[1, 1], [1]], true, 'classify']
  ]

  /* exports */
  module.exports = [
    classify
  ].reduce(array.concat, [])
    .map(arrange({ inputs: 0, predicate: 1, contra: 2 }))
    .map(object.ap({
      predicate: predicate.equal,
      contra: object.get
    }))
    .map(funTest.sync)
})()
