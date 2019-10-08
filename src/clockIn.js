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
        var data = prepareClockIn();

        timeoutPromiseAfter();
        
        if (gps) {
            submitClockInWithGPS();
        } else {
            submitClockInWithoutGPS();
        }

        function prepareClockIn() {
            var userId = 1123; // TODO: Get it from somewhere
            var data = {
                timestamp: moment(),
                userId: userId
            };
            return data;
        }

        function timeoutPromiseAfter() {
            setTimeout(function () {
                //if (!promise.isResolved()) { // Supported in later versions of jQuery
                deferred.reject('TIMEOUT!!!');
                //}
            }, timeoutMs);
        }

        function submitClockInWithGPS() {
            gps().done(function (coordinates) {
                data.gps = coordinates;
                submitClockIn().done(successWithMessage('OK, with GPS'));
            }).fail(function () {
                submitClockIn().done(successWithMessage('OK, no GPS'));
            });
        }

        function submitClockInWithoutGPS() {
            submitClockIn().done(successWithMessage('OK'));
        }

        function submitClockIn() {
            return ajax(endpointUrl, data).fail(function (responseData) {
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
