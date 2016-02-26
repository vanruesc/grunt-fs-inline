/**
 * grunt-fs-inline v0.1.5 build Feb 26 2016
 * https://github.com/vanruesc/grunt-fs-inline
 * Copyright 2016 Raoul van Rüschen, Zlib
 */

'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var waterfall = _interopDefault(require('async-waterfall'));
var mkdirp = _interopDefault(require('mkdirp'));
var glob = _interopDefault(require('glob'));
var brfs = _interopDefault(require('brfs'));
var path = _interopDefault(require('path'));
var fs = _interopDefault(require('fs'));

function fsInline(grunt) {

	grunt.registerMultiTask("fsinline", "Use the brfs transform without browserify.", function() {

		let options = this.options({
			brfs: null,
			glob: null,
			append: null
		});

		let done = this.async();
		let f = this.data;
		let rs, ts, ws;

		waterfall([

			function check(next) {

				next((f.dest !== null && f.dest.length > 0) ? null : new Error("No destination specified."));

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

				let i = 0;
				let l = files.length;
				let destinations = [];
				let hasExtension = (path.extname(f.dest).length > 0);

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

				let i = 0;
				let l = files.length;

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

				let i = 0;
				let l = destinations.length;

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

}

module.exports = fsInline;