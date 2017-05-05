/**
 *
 * @module fun-perceptron
 */
;(function () {
  'use strict'

  /* imports */
  var curry = require('fun-curry')
  var array = require('fun-array')
  var vector = require('fun-vector')

  /* exports */
  module.exports = {
    classify: curry(classify),
    update: curry(update)
  }

  /**
   *
   * @function module:fun-perceptron.classify
   *
   * @param {Array} w - weights
   * @param {Array} x - feature vector for an example to classify
   *
   * @return {Number} 1 or 0 indicating the classification of x
   */
  function classify (w, x) {
    return vector.dot(w, array.prepend(1, x)) > 0 ? 1 : 0
  }

  /**
   *
   * @function module:fun-perceptron.update
   *
   * @param {Array} w - weights
   * @param {Array} x - feature vector for an example to classify
   * @param {Number} r - required output class (label) for this example (0 or 1)
   *
   * @return {Array} w if x was classified as r, w adjusted by x otherwise
   */
  function update (w, x, r) {
    return vector.sum(w, vector.scale(r - classify(w, x), array.prepend(1, x)))
  }
})()

