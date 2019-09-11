var endpointUrl = "https://timeservice.com/api/clock-in";

function clockIn(ajax, success, failure) {
    var timestamp = "01.01.2019 12:55";
    var userId = 1123;

    // TODO: extract payload to local variable
    // TODO extract failure callback to dedicated/module function

    ajax(endpointUrl, {
        timestamp: timestamp,
        userId: userId
    }).done(success)
        .fail(function(data) {
            failure('Please no, don\'t do this, ' + data.statusCode);
        });
}

if (typeof window === "undefined") {
    module.exports = {
        clockIn: clockIn
    };
}
