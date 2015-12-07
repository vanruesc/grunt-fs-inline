var grunt = require("grunt");

exports.fsinline = {

  setUp: function(done) {

    done();

  },

  "compare actual with expected": function(test) {

    test.expect(2);

    var actual = grunt.file.read("test/inline/actual/a.js");
    var expected = grunt.file.read("test/expected/a");
    test.equal(actual, expected, "should inline external files correctly.");

    actual = grunt.file.read("test/inline/actual/b.js");
    expected = grunt.file.read("test/expected/b");
    test.equal(actual, expected, "should inline external files correctly.");

    test.done();

  },

};
