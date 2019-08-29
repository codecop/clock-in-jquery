/* globals describe, it */
"use strict";

var chai = require('chai');
var should = chai.should();
// https://gist.github.com/robballou/9ee108758dc5e0e2d028

//var jsdom = require('jsdom');
//var html = "<html><body></body></html>";
//var doc = jsdom.jsdom(html);
//var window = doc.parentWindow;

const { JSDOM } = require('jsdom');
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

var $ = global.jQuery = require('jquery')(window);

function one() {
    var d = $.Deferred();
    d.resolve(1);
    // d.reject("something bad happened");
    return d.promise();
}

describe("jQuery infrastructure", function() {

    // see https://www.sitepoint.com/introduction-jquery-deferred-objects/

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

});
