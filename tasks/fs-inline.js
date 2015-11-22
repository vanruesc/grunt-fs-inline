var fs = require("fs");
var brfs = require("brfs");

module.exports = function(grunt) {

	grunt.registerMultiTask("fsinline", "Use the brfs transform without browserify.", function() {

		var next = this.async();
		var fPath, rs, ws;
		var f = this.data;

		fPath = f.src;

		if(!grunt.file.exists(fPath)) {

			next(new Error("Source file \"" + fPath + "\" not found."));

		} else {

			rs = fs.createReadStream(fPath);
			tr = brfs(fPath);
			ws = fs.createWriteStream(f.dest);
			rs.pipe(tr).pipe(ws).on("finish", next);

		}

	});

};
