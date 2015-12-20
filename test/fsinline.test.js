var grunt = require("grunt");

exports.fsinline = {

  setUp: function(done) {

    done();

  },

  "compare actual with expected": function(test) {

    test.expect(4);

    var actual = grunt.file.read("test/inline/actual/a.js");
    var expected = grunt.file.read("test/expected/a");
    test.equal(actual, expected, "should use the source file's name and inline correctly.");

    actual = grunt.file.read("test/inline/actual/b.js");
    expected = grunt.file.read("test/expected/b");
    test.equal(actual, expected, "should find and inline one file and use the given destination file name.");

    actual = grunt.file.read("test/inline/actual/c.js");
    expected = grunt.file.read("test/expected/c");
    test.equal(actual, expected, "should find and inline files in sub directories and resolve the destination path correctly.");

    actual = grunt.file.read("test/inline/actual/d.js");
    expected = grunt.file.read("test/expected/d");
    test.equal(actual, expected, "should find and inline files in sub directories and resolve the destination path correctly.");

    test.done();

  }

};
