/* globals describe, it */
"use strict";

var assert = require('assert');
var chai = require('chai');
var should = chai.should();

describe('Mocha infrastructure', function() {

    it('should assert plain Node', function() {
        // Node.js’ built-in assert
        assert.equal(2, 1 + 1);
    });

    it('should assert with Chai', function() {
        (1 + 1).should.equal(2);
    });

});
