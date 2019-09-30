module.exports = function(config) {
  config.set({
    mutator: "javascript",
    packageManager: "npm",
    reporters: ["html", "clear-text", "progress"],
    testRunner: "mocha",
    mochaOptions: {
      files: ['test/**/*.js'],
    },
    transpilers: [],
    testFramework: "mocha",
    coverageAnalysis: "perTest"
  });
};
