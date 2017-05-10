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

  var isValidWeightXPair = [
    array.all(vector.isVector),
    predicate.type('([Number], [Number])'),
    fn.applyFrom({
      inputs: array.map(array.length),
      f: fn.k(fn.compose(scalar.equal(-1), scalar.sub))
    })
  ].reduce(predicate.and)

  var wxToNumberGuard = guarded(isValidWeightXPair, predicate.type('Number'))

  /* exports */
  module.exports = {
    compute: fn.curry(wxToNumberGuard(compute)),
    classify: fn.curry(wxToNumberGuard(classify)),
    measure: fn.curry(wxToNumberGuard(measure)),
    update: fn.curry(update)
  }

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

