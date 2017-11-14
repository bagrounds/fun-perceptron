/**
 *
 * @module fun-perceptron
 */
;(function () {
  'use strict'

  /* imports */
  var array = require('fun-array')
  var scalar = require('fun-scalar')
  var vector = require('fun-vector')
  var guarded = require('guarded')
  var predicate = require('fun-predicate')
  var fn = require('fun-function')
  var object = require('fun-object')
  var type = require('fun-type')

  var fst1LessThanSnd = fn.composeAll([
    scalar.equal(-1),
    fn.argsToArray(scalar.sub),
    array.map(array.length)
  ])

  var wAndX = predicate.and(type.vectorOf(2, vector.isVector), fst1LessThanSnd)

  var wxToNumberGuard = guarded(wAndX, type.num)

  var api = {
    compute: compute,
    classify: classify,
    measure: measure,
    update: update
  }

  var guards = {
    compute: wxToNumberGuard,
    classify: wxToNumberGuard,
    measure: wxToNumberGuard
  }

  /* exports */
  module.exports = object.map(fn.curry, object.ap(guards, api))

  /**
   *
   * @function module:fun-perceptron.compute
   *
   * @param {Array} w - weights
   * @param {Array} x - feature vector
   *
   * @return {Number} dot(w, (1, ...x))
   */
  function compute (w, x) {
    return vector.dot(w, array.prepend(1, x))
  }

  /**
   *
   * @function module:fun-perceptron.measure
   *
   * @param {Array} w - weights
   * @param {Array} x - feature vector for an example to classify
   *
   * @return {Number} probability that x is in class 1
   */
  function measure (w, x) {
    return scalar.sigmoid(compute(w, x))
  }

  /**
   *
   * @function module:fun-perceptron.classify
   *
   * @param {Array} w - weights
   * @param {Array} x - feature vector for an example to classify
   *
   * @return {Number} 1 or 0 indicating the class of x
   */
  function classify (w, x) {
    return scalar.threshold(0, compute(w, x))
  }

  /**
   *
   * @function module:fun-perceptron.update
   *
   * @param {Number} rate - learning rate
   * @param {Number} bias - prescaled value to adjust bias by
   * @param {Array} w - weights
   * @param {Array} x - feature vector for an example to classify
   * @param {Number} label - 0 or 1 indicating true class of x
   *
   * @return {Array} w if x was classified as r, w adjusted by x otherwise
   */
  function update (rate, bias, w, x, label) { // eslint-disable-line max-params
    var error = label - classify(w, x)

    return error
      ? vector.sum(w, vector.scale(rate * error, array.prepend(bias, x)))
      : w
  }
})()

