var waterfall = require("async-waterfall");
var mkdirp = require("mkdirp");
var glob = require("glob");
var brfs = require("brfs");
var path = require("path");
var fs = require("fs");

module.exports = function(grunt) {

	grunt.registerMultiTask("fsinline", "Use the brfs transform without browserify.", function() {

		var options = this.options({
			brfs: null,
			glob: null,
			append: null
		});

		var done = this.async();
		var f = this.data;
		var rs, ts, ws;

		waterfall([

			function check(next) {

				next((f.dest !== null) ? null : new Error("No destination specified."));

			},

			function fetch(next) {

				glob(f.src, options.glob, function(error, files) {

					if(!error && files.length === 0) {

						error = new Error("No source files found for path: \"" + f.src + "\"");

					}

					next(error, files);

				});

			},

			function resolve(files, next) {

				var i = 0;
				var l = files.length;
				var destinations = [];
				var hasExtension = (path.extname(f.dest).length > 0);

				(function proceed(error) {

					if(error || i === l) {

						next(error, files, destinations);

					} else {

						// Resolve dest relative to src.
						destinations.push(path.resolve(path.dirname(files[i]), hasExtension ? path.dirname(f.dest) : f.dest));

						// Use the basename of dest only if it's clearly a filename.
						destinations[i] = path.join(destinations[i], hasExtension ? path.basename(f.dest) : path.basename(files[i]));

						// Create directories if necessary.
						mkdirp(path.dirname(destinations[i++]), proceed);

					}

				}());

			},

			function inline(files, destinations, next) {

				var i = 0;
				var l = files.length;

				(function proceed(error) {

					if(error || i === l) {

						next(error, destinations);

					} else {

						rs = fs.createReadStream(files[i]);
						ts = brfs(files[i], options.brfs);
						ws = fs.createWriteStream(destinations[i++]);
						rs.pipe(ts).pipe(ws).on("finish", proceed);

					}

				}());

			},

			function append(destinations, next) {

				var i = 0;
				var l = destinations.length;

				if(options.append !== null && options.append.length > 0) {

					(function proceed(error) {

						if(error || i === l) {

							next(error);

						} else {

							fs.appendFile(destinations[i++], options.append, proceed);

						}

					}());

				} else {

					next();

				}

			}

		], done);

	});

};
