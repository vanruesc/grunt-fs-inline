var dirname = require("path").dirname;
var mkdirp = require("mkdirp");
var brfs = require("brfs");
var fs = require("fs");

module.exports = function(grunt) {

	grunt.registerMultiTask("fsinline", "Use the brfs transform without browserify.", function() {

		var next = this.async();
		var f = this.data;
		var rs, ws;

		if(!grunt.file.exists(f.src)) {

			next(new Error("Source file \"" + f.src + "\" not found."));

		} else {

			mkdirp(dirname(f.dest), function(error) {

				if(error) {

					next(error);

				} else {

					rs = fs.createReadStream(f.src);
					tr = brfs(f.src);
					ws = fs.createWriteStream(f.dest);
					rs.pipe(tr).pipe(ws).on("finish", next);

				}

			});

		}

	});

};
