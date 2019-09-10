function clockIn(ajax, success, failure) {
    ajax("https://timeservice.com/api/clock-in", {
        timestamp: "01.01.2019 12:55",
        userId: 1123
    }).done(success)
    .fail(failure);
}

if (typeof window === "undefined") {
    module.exports = {
        clockIn: clockIn
    };
}