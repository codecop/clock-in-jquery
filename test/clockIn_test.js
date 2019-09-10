/* globals describe, beforeEach, it */
"use strict";

// see https://gist.github.com/robballou/9ee108758dc5e0e2d028

var { JSDOM } = require('jsdom');
var jquery = require('jquery');
var chai = require('chai');
var should = chai.should();

var window, document, $;

var clockIn = require('../src/clockIn').clockIn;

describe("clockIn()", function () {

    // see https://www.sitepoint.com/introduction-jquery-deferred-objects/

    var jsdom;

    beforeEach(function () {
        jsdom = new JSDOM('<!doctype html><html><body></body></html>');
        window = jsdom.window;
        document = window.document;

        $ = jquery(window);
        global.$ = $; // populating it in the test via global namespace for module.
    });

    it("clockIn should send request with timestamp and user id and report success", function (done) {
        var ajaxHasBeenCalled = false;
        var mockAjax = function (url, data) {
            ajaxHasBeenCalled = true;
            url.should.be.equal("https://timeservice.com/api/clock-in");
            data.should.deep.equal({
                timestamp: "01.01.2019 12:55",
                userId: 1123
            });
            
            var d = $.Deferred();
            d.resolve({
                statusCode: 200
            });
            return d.promise();
        }
        var success = function () {
            ajaxHasBeenCalled.should.be.equal(true);
            done();
        }

        var failure = function () {
            true.should.be.equal(false);
        }

        clockIn(mockAjax, success, failure);
    });
});
