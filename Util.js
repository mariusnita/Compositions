'use strict';

/* Prototype clone function for JS inheritance:
 * Subclass.prototype = clone(Superclass.prototype);
 */
function clone(obj) {
    if (typeof obj !== 'undefined') {
	clone.prototype = Object(obj);
	return new clone;
    } else {
        return undefined;
    }
}

/* Use: "{0}, {1}".format('Hello', 'world'); */
if (typeof String.prototype.format !== 'function') {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/\{(\w+)\}/g, function(match, number) {
            return typeof args[number] !== 'undefined'
                ? args[number]
                : match;
        });
    };
}

/* Use: "{greeting}, {subject}".namedFormat({greeting: 'Hello', subject: 'World'}); */
if (typeof String.prototype.namedFormat !== 'function') {
    String.prototype.namedFormat = function(dict) {
        return this.replace(/\{(\w+)\}/g, function(match, key) {
            return typeof dict[key] !== 'undefined'
                ? dict[key]
                : match;
        });
    };
}

if (typeof String.prototype.startsWith !== 'function') {
    String.prototype.startsWith = function(str) {
        return this.lastIndexOf(str, 0) === 0;
    };
}
