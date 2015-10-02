////////////////////////////////////////////////////////////////////////////
//
// Copyright 2015 Realm Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
////////////////////////////////////////////////////////////////////////////

'use strict';

var TestUtil = {
    realmPathForFile: function(str) {
        var path = Realm.defaultPath;
        return path.substring(0, path.lastIndexOf("/") + 1) + str;
    },
};
exports.TestUtil = TestUtil;

var TestCase = {
    assertEqual: function(val1, val2, errorMessage) {
        if (val1 !== val2) {
            var message = "'" + val1 + "' does not equal expected value '" + val2 + "'";
            if (errorMessage) {
                message = errorMessage + "\n" + message;
            }
            throw new TestFailureError(message);
        }
    },

    assertNotEqual: function(val1, val2, errorMessage) {
        if (val1 === val2) {
            var message = "'" + val1 + "' equals '" + val2 + "'";
            if (errorMessage) {
                message = errorMessage + "\n" + message;
            }
            throw new TestFailureError(message);
        }
    },

    assertEqualWithTolerance: function(val1, val2, tolerance, errorMessage) {
        if (val1 < val2 - tolerance || val1 > val2 + tolerance) {
            var message = "'" + val1 + "' does not equal '" + val2 + "' with tolerance '" + tolerance + "'";
            if (errorMessage) {
                message = errorMessage + "\n" + message;
            }
            throw new TestFailureError(message);
        }
    },

    assertThrows: function(func, errorMessage) {
        var caught = false;
        try {
            func();
        }
        catch (e) {
            caught = true;
        }

        if (!caught) {
            throw new TestFailureError(errorMessage || 'Expected exception not thrown');
        };
    },

    assertTrue: function(condition, errorMessage) {
        if (!condition) {
            throw new TestFailureError(errorMessage || 'Condition expected to be true');
        };
    },
}
exports.TestCase = TestCase;

function TestFailureError(message) {
    var error;
    try {
        throw new Error(message);
    } catch (e) {
        error = e;
    }

    // This regular expression will match stack trace lines provided by JavaScriptCore.
    // Example: someMethod@file:///path/to/file.js:10:24
    var regex = /^(?:.*?@)?([^\[\(].+?):(\d+)(?::(\d+))?/;

    // Remove the top two stack frames and use information from the third, if possible.
    var stack = error.stack && error.stack.split('\n');
    var match = stack[2] && stack[2].match(regex);
    if (match) {
        this.sourceURL = match[1];
        this.line = +match[2];
        this.column = +match[3];
        this.stack = stack.slice(2).join('\n');
    }

    this.__proto__ = error;
}
exports.TestFailureError = TestFailureError;

