"use strict";
var endpointUrl = "https://timeservice.com/api/clock-in";

function clockIn(ajax, success, failure) {
    var timestamp = "01.01.2019 12:55";
    var userId = 1123;

    // TODO extract payload to local variable
    // TODO extract failure callback to dedicated/module function
    // TODO setup VSCode to see warning about any type -> add annotations
    // TODO we are in world of Promise, we are not using callbacks but returning the Promise!
    var deferred = $.Deferred();

    ajax(endpointUrl, {
        timestamp: timestamp,
        userId: userId
    }).done(function (response) {
        deferred.resolve(response);
    }).fail(function (data) {
        // failure('Please no, don\'t do this, ' + data.statusCode);
        //return 'Please no, don\'t do this, ' + data.statusCode;
        deferred.reject('Please no, don\'t do this, ' + data.statusCode);
    });
    return deferred.promise();
}

if (typeof window === "undefined") {
    module.exports = {
        clockIn: clockIn
    };
}
