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
    var timeoutMs = 200; // TODO: configure for PROD
    var data = prepareClockIn(moment);

    return $.Deferred(function (deferred) {
        timeoutPromiseAfter(timeoutMs, deferred);
        if (gps) {
            gps().done(function (coordinates) {
                data.gps = coordinates;
                submitClockIn(ajax, data, deferred);
            });
        } else {
            submitClockIn(ajax, data, deferred);
        }
    }).promise();
}

function prepareClockIn(moment) {
    var userId = 1123; // TODO: Get it from somewhere
    var data = {
        timestamp: moment(),
        userId: userId
    };
    return data;
}

function timeoutPromiseAfter(timeoutMs, promise) {
    setTimeout(function () {
        //if (!promise.isResolved()) { // Supported in later versions of jQuery
        promise.reject('TIMEOUT!!!');
        //}
    }, timeoutMs);
}

function submitClockIn(ajax, payload, promise) {
    ajax(endpointUrl, payload).done(function (response) {
        promise.resolve(response);
    }).fail(function (data) {
        promise.reject('Please no, don\'t do this, ' + data.statusCode);
    });
}

if (typeof window === "undefined") {
    module.exports = {
        clockIn: clockIn
    };
}