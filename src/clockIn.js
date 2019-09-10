function clockIn(mockAjax, success, failure) {
    success();
}

if (typeof window === "undefined") {
    module.exports = {
        clockIn: clockIn
    };
}