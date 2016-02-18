/* Copyright 2015 Realm Inc - All Rights Reserved
 * Proprietary and Confidential
 */

'use strict';

var Realm = require('realm');

var prototype = exports.prototype = {};

exports.extend = function(object) {
    object.__proto__ = prototype;
    return object;
};

Object.defineProperties(prototype, {
    afterEach: {
        value: function() {
            Realm.clearTestState();
        }
    }
});