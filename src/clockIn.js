var endpointUrl = "https://timeservice.com/api/clock-in";

function clockIn(ajax, success, failure) {
    var timestamp = "01.01.2019 12:55";
    var userId = 1123;
    ajax(endpointUrl, {
        timestamp: timestamp,
        userId: userId
    }).done(success)
        .fail(failure);
}

if (typeof window === "undefined") {
    module.exports = {
        clockIn: clockIn
    };
}