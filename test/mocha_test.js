/* globals describe, it */
"use strict";

var chai = require('chai');
chai.should();

describe('Mocha infrastructure', function() {

    it('should assert with Chai', function() {
        (1 + 1).should.equal(2);
    });

});
