var dirname = require("path").dirname;
var mkdirp = require("mkdirp");
var brfs = require("brfs");
var fs = require("fs");

module.exports = function(grunt) {

	grunt.registerMultiTask("fsinline", "Use the brfs transform without browserify.", function() {

		var options = this.options({
			brfs: null,
			append: ""
		});

		var next = this.async();
		var f = this.data;
		var rs, ts, ws;

		if(!grunt.file.exists(f.src)) {

			next(new Error("Source file \"" + f.src + "\" not found."));

		} else {

			mkdirp(dirname(f.dest), function(error) {

				if(error) {

					next(error);

				} else {

					rs = fs.createReadStream(f.src);
					ts = brfs(f.src, options.brfs);
					ws = fs.createWriteStream(f.dest, {flags: "a"});
					rs.pipe(ts).pipe(ws).on("finish", function() {

						fs.appendFile(f.dest, options.append, next);

					});

				}

			});

		}

	});

};
