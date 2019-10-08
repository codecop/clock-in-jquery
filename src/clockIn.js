/* globals $ */
"use strict";
var endpointUrl = "https://timeservice.com/api/clock-in";

/**
 * @param {(url: string, data: { timestamp: string; userId: number; }) =>
 *          JQuery.Promise<{statusCode: number}, {statusCode: number}, any>} ajax
 * @param {() => string} moment
 * @param {() => JQuery.Promise<{ x: number, y: number}, string, any>=} gps
 * @returns {JQuery.Promise<{statusCode: number}, string, any>}
 */
function clockIn(ajax, moment, gps) {
    return $.Deferred(function (deferred) {

        var timeoutMs = 200; // TODO: configure for PROD
        var payload = preparePayload();

        rejectPromiseAfterTimedOut();

        if (gps) {
            submitClockInWithGPS();
        } else {
            submitClockInWithoutGPS();
        }

        function preparePayload() {
            return {
                timestamp: moment(),
                userId: 1123 // TODO: Get it from somewhere
            };
        }

        function rejectPromiseAfterTimedOut() {
            setTimeout(function () {
                //if (!promise.isResolved()) { // Supported in later versions of jQuery
                deferred.reject('TIMEOUT!!!');
                //}
            }, timeoutMs);
        }

        function submitClockInWithGPS() {
            if (!gps) {
                throw new Error('GPS must be set!');
            }
            gps().done(function (coordinates) {
                payload.gps = coordinates;
                submitClockIn().done(successWithMessage('OK, with GPS'));
            }).fail(function () {
                submitClockIn().done(successWithMessage('OK, no GPS'));
            });
        }

        function submitClockInWithoutGPS() {
            submitClockIn().done(successWithMessage('OK'));
        }

        function submitClockIn() {
            return ajax(endpointUrl, payload).fail(function (responseData) {
                deferred.reject('Please no, don\'t do this, ' + responseData.statusCode);
            });
        }

        function successWithMessage(message) {
            return function () {
                deferred.resolve(message);
            };
        }
    }).promise();
}

if (typeof window === "undefined") {
    module.exports = {
        clockIn: clockIn
    };
}
