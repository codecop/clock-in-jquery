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
    var currentMoment;

    function mockMoment() {
        return currentMoment;
    }
    function givenMomentIs(newMoment) {
        currentMoment = newMoment;
    }

    beforeEach(function () {
        jsdom = new JSDOM('<!doctype html><html><body></body></html>');
        window = jsdom.window;
        document = window.document;

        $ = jquery(window);
        global.$ = $; // populating it in the test via global namespace for module.

        currentMoment = "01.05.2019 12:55";
    });

    describe("simple", function () {

        it("should send request with timestamp/user id and report success", function (done) {
            givenMomentIs("01.02.2019 12:55");
            var ajaxHasBeenCalled = false;
            function mockAjax(url, data) {
                ajaxHasBeenCalled = true;

                url.should.be.equal("https://timeservice.com/api/clock-in");
                data.should.deep.equal({
                    timestamp: "01.02.2019 12:55",
                    userId: 1123
                });

                return resolvedPromise({ statusCode: 200 });
            }

            function success(message) {
                ajaxHasBeenCalled.should.be.equal(true);
                message.should.be.equal('OK');
                done();
            }

            clockIn(mockAjax, mockMoment)
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

            clockIn(mockAjax, mockMoment)
                .done(shouldNotBeCalled)
                .fail(failure);
        });

        it("should report timeout", function (done) {
            function mockAjax(url, data) {
                return $.Deferred().promise();
            }

            function shouldTimeout(message) {
                message.should.be.equal('TIMEOUT!!!');
                done();
            }

            clockIn(mockAjax, mockMoment)
                .done(shouldNotBeCalled)
                .fail(shouldTimeout);
        });
    });

    describe("optional GPS", function () {

        it("should send request with GPS and report OK", function (done) {
            givenMomentIs("01.02.2019 12:55");

            function mockGPS() {
                return resolvedPromise({
                    x: 100,
                    y: 200
                });
            }

            function mockAjax(url, data) {
                url.should.be.equal("https://timeservice.com/api/clock-in");
                data.should.deep.equal({
                    timestamp: "01.02.2019 12:55",
                    userId: 1123,
                    gps: {
                        x: 100,
                        y: 200
                    }
                });

                return resolvedPromise({ statusCode: 200 });
            }

            function success(message) {
                message.should.be.equal('OK, with GPS');
                done();
            }

            clockIn(mockAjax, mockMoment, mockGPS)
                .done(success)
                .fail(shouldNotBeCalled);
        });

        it("should send request with failed GPS and report OK, no GPS", function (done) {
            givenMomentIs("01.02.2019 12:55");

            function failedGPS() {
                return rejectedPromise("GPS is not available");
            }

            function mockAjax(url, data) {
                return resolvedPromise({ statusCode: 200 });
            }

            function success(message) {
                message.should.be.equal('OK, no GPS');
                done();
            }

            clockIn(mockAjax, mockMoment, failedGPS)
                .done(success)
                .fail(shouldNotBeCalled);
        });

        // TODO: GPS OK, request failed -> ... existing message

        // TODO: GPS not working, request failed -> ... existing message


    });
});
