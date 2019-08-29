function two() {
    var d = $.Deferred();
    d.resolve(2);
    return d.promise();
}

if (typeof window === "undefined") {
    module.exports = {
        two: two
    };
}
