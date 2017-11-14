;(function () {
  'use strict'

  /* imports */
  var p = require('fun-predicate')
  var object = require('fun-object')
  var funTest = require('fun-test')
  var arrange = require('fun-arrange')
  var array = require('fun-array')
  var scalar = require('fun-scalar')

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
    .map(arrange({ inputs: 0, predicate: 1, contra: 2 }))
    .map(object.ap({
      predicate: p.equal,
      contra: object.get
    }))

  var classify = [
    [[[-1, -1], [0]], 0],
    [[[-1, 1], [0]], 0],
    [[[1, -1], [0]], 1],
    [[[1, 1], [0]], 1],
    [[[-1, -1], [1]], 0],
    [[[-1, 1], [1]], 1],
    [[[1, -1], [1]], 1],
    [[[1, 1], [1]], 1]
  ].map(array.append('classify'))
    .map(arrange({ inputs: 0, predicate: 1, contra: 2 }))
    .map(object.ap({
      predicate: p.equal,
      contra: object.get
    }))

  var measure = [
    [[[-1, -1], [0]], scalar.lte(0.5)],
    [[[-1, 1], [0]], scalar.lte(0.5)],
    [[[1, -1], [0]], scalar.gte(0.5)],
    [[[1, 1], [0]], scalar.gte(0.5)],
    [[[-1, -1], [1]], scalar.lte(0.5)],
    [[[-1, 1], [1]], scalar.gte(0.5)],
    [[[1, -1], [1]], scalar.gte(0.5)],
    [[[1, 1], [1]], scalar.gte(0.5)]
  ].map(array.append('measure'))
    .map(arrange({ inputs: 0, predicate: 1, contra: 2 }))
    .map(object.ap({ contra: object.get }))

  var update = [
    [[1, 1, [-1, -1], [0], 0], array.equal(scalar.equal)([-1, -1])],
    [[1, 1, [1, -1], [0], 0], p.not(array.equal(scalar.equal)([-1, -1]))],
    [[1, 1, [1, -1], [0], 1], array.equal(scalar.equal)([1, -1])],
    [[1, 1, [-1, -1], [0], 1], p.not(array.equal(scalar.equal)([1, -1]))]
  ].map(array.append('update'))
    .map(arrange({ inputs: 0, predicate: 1, contra: 2 }))
    .map(object.ap({ contra: object.get }))

  /* exports */
  module.exports = [
    compute,
    classify,
    measure,
    update
  ].reduce(array.concat, [])
    .map(funTest.sync)
})()

