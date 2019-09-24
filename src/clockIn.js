/* globals $ */
"use strict";
var endpointUrl = "https://timeservice.com/api/clock-in";

/**
 * @param {(url: string, data: { timestamp: string; userId: number; }) =>
 *          JQuery.Promise<{statusCode: number}, {statusCode: number}, any>} ajax
 * @returns {JQuery.Promise<{statusCode: number}, string, any>}
 */
function clockIn(ajax) {
    var timestamp = "01.01.2019 12:55";
    var userId = 1123;

    // TODO extract payload to local variable

    return $.Deferred(function (deferred) {
        ajax(endpointUrl, {
            timestamp: timestamp,
            userId: userId
        }).done(function (response) {
            deferred.resolve(response);
        }).fail(function (data) {
            deferred.reject('Please no, don\'t do this, ' + data.statusCode);
        });
    }).promise();
}

if (typeof window === "undefined") {
    module.exports = {
        clockIn: clockIn
    };
}
