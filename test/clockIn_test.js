/* globals describe, beforeEach, it */
"use strict";

// see https://gist.github.com/robballou/9ee108758dc5e0e2d028

var { JSDOM } = require('jsdom');
var jquery = require('jquery');
var chai = require('chai');
var should = chai.should();

var window;
var document;
var $;

var clockIn = require('../src/clockIn').clockIn;

function shouldNotBeCalled() {
    should.fail();
}

function resolvedPromise(data) {
    // see https://www.sitepoint.com/introduction-jquery-deferred-objects/
    var d = $.Deferred();
    d.resolve(data);
    return d.promise();
}

function rejectedPromise(data) {
    var d = $.Deferred();
    d.reject(data);
    return d.promise();
}

describe("clockIn", function () {

    var jsdom;

    beforeEach(function () {
        jsdom = new JSDOM('<!doctype html><html><body></body></html>');
        window = jsdom.window;
        document = window.document;

        $ = jquery(window);
        global.$ = $; // populating it in the test via global namespace for module.
    });

    it("should send request with timestamp/user id and report success", function (done) {
        var ajaxHasBeenCalled = false;
        function mockAjax(url, data) {
            ajaxHasBeenCalled = true;

            url.should.be.equal("https://timeservice.com/api/clock-in");
            data.should.deep.equal({
                timestamp: "01.01.2019 12:55",
                userId: 1123
            });

            return resolvedPromise({ statusCode: 200 });
        }

        function success() {
            ajaxHasBeenCalled.should.be.equal(true);
            done();
        }

        clockIn(mockAjax)
            .done(success)
            .fail(shouldNotBeCalled);
    });

    it("should report error 400", function (done) {
        function mockAjax(url, data) {
            return rejectedPromise({ statusCode: 400 });
        }

        function failure(message) {
            message.should.be.equal('Please no, don\'t do this, 400');
            done();
        }

        clockIn(mockAjax)
            .done(shouldNotBeCalled)
            .fail(failure);
    });

});
