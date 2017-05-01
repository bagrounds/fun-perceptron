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
    update: curry.options(update, ['w', 'x', 'dy', 'rate'])
  }

  /**
   *
   * @function module:fun-perceptron.classify
   *
   * @param {Array} w - weights
   * @param {Array} x - feature vector for an example to classify
   *
   * @return {Boolean} if the datum is in class 1
   */
  function classify (w, x) {
    return vector.dot(w, array.prepend(1, x)) > 0
  }

  /**
   *
   * @function module:fun-perceptron.update
   *
   * @param {Object} o - options
   * @param {Array} o.w - weights
   * @param {Array} o.x - feature vector for an example to classify
   * @param {Number} o.rate - learning rate
   * @param {Array} o.dy - error
   *
   * @return {Array} w * (rate * dy) * x
   */
  function update (o) {
    return vector.sum(o.w, vector.scale(o.rate * o.dy, array.prepend(1, o.x)))
  }
})()

