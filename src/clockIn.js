/* globals $ */
"use strict";
var endpointUrl = "https://timeservice.com/api/clock-in";

function clockIn(ajax) {
    var timestamp = "01.01.2019 12:55";
    var userId = 1123;

    // TODO extract payload to local variable
    // TODO extract failure callback to dedicated/module function
    // TODO setup VSCode to see warning about any type -> add annotations

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
