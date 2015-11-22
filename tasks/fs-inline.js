var fs = require("fs");
var brfs = require("brfs");

module.exports = function(grunt) {

	grunt.registerMultiTask("fsinline", "Use the brfs transform without browserify.", function() {

		var next = this.async();
		var fPath, rs, ws;
		var f = this.data;

		rs = fs.createReadStream(f.src);
		fPath = f.src;

		if(!grunt.file.exists(fPath)) {

			grunt.log.warn("Source file \"" + filepath + "\" not found.");

		}

		tr = brfs(fPath);
		ws = fs.createWriteStream(f.dest);
		rs.pipe(tr).pipe(ws).on("finish", next);

	});

};
