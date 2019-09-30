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
    var userId = 1123; // TODO: Get it from somewhere
    var timeoutMs = 200; // TODO: configure for PROD


    // TODO extract payload to local variable

    return $.Deferred(function (deferred) {
        setTimeout(function () {
            //if (!deferred.isResolved()) { // Supported in later versions of jQuery
            deferred.reject('TIMEOUT!!!');
            //}
        }, timeoutMs);

        var result = {
            timestamp: moment(),
            userId: userId
        };

        // TODO: 1) remove duplications
        if (gps) {
            gps().done(function (coordinates) {
                result.gps = coordinates;
                ajax(endpointUrl, result).done(function (response) {
                    deferred.resolve(response);
                }).fail(function (data) {
                    deferred.reject('Please no, don\'t do this, ' + data.statusCode); // TODO coverage
                });
            });
        } else {
            ajax(endpointUrl, result).done(function (response) {
                deferred.resolve(response);
            }).fail(function (data) {
                deferred.reject('Please no, don\'t do this, ' + data.statusCode);
            });
        }
    }).promise();
}

if (typeof window === "undefined") {
    module.exports = {
        clockIn: clockIn
    };
}
