/* globals describe, beforeEach, it */
"use strict";

// see https://gist.github.com/robballou/9ee108758dc5e0e2d028

var { JSDOM } = require('jsdom');
var jquery = require('jquery');
var chai = require('chai');
var should = chai.should();

var window, document, $;

function one() {
    var d = $.Deferred();
    d.resolve(1);
    // d.reject("something bad happened");
    return d.promise();
}
var two = require('../src/promise').two;

describe("jQuery infrastructure", function() {

    // see https://www.sitepoint.com/introduction-jquery-deferred-objects/

    var jsdom;

    beforeEach(function() {
        jsdom = new JSDOM('<!doctype html><html><body></body></html>');
        window = jsdom.window;
        document = window.document;

        $ = jquery(window);
        global.$ = $; // populating it in the test via global namespace for module.
    });

    it("supports Promise chaining", function(done) {
        one().done(function(result) {
            result.should.equal(1);
            done();
        });
    });

    it("supports Promise finally", function(done) {
        one().done(function(result) {
            result.should.equal(1);
        }).always(function() {
            done();
        });
    });

    it("works for other modules", function(done) {
        two().done(function(result) {
            result.should.equal(2);
            done();
        });
    });

});
