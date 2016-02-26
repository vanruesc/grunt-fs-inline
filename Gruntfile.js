module.exports = function(grunt) {

	grunt.initConfig({

		date: grunt.template.today("mmm dd yyyy"),
		pkg: grunt.file.readJSON("package.json"),

		banner: "/**\n" +
			" * grunt-fs-inline v<%= pkg.version %> build <%= date %>\n" +
			" * <%= pkg.homepage %>\n" +
			" * Copyright <%= date.slice(-4) %> <%= pkg.author.name %>, <%= pkg.license %>\n" + 
			" */\n",

		jshint: {
			options: {
				jshintrc: true
			},
			files: ["Gruntfile.js", "tasks/**/*.js", "<%= nodeunit.tests %>"]
		},

		clean: {
			tests: ["test/inline/actual"]
		},

		// Configuration to be run and tested.
		fsinline: {
			options: {
				append: "export default a;"
			},
			taskA: {
				src: "test/inline/a.js",
				dest: "./actual"
			},
			taskB: {
				options: {
					append: null
				},
				src: "test/inline/*.glob.js",
				dest: "./actual/b.js"
			},
			taskC: {
				options: {
					append: null
				},
				src: "test/inline/glob/*/*.js",
				dest: "../../actual"
			}
		},

		rollup: {
			options: {
				format: "cjs",
				moduleName: "fsinline",
				banner: "<%= banner %>",
				globals: {
					"async-waterfall": "waterfall",
					"mkdirp": "mkdirp",
					"glob": "glob",
					"brfs": "brfs"
				},
				plugins: [
					require("rollup-plugin-node-resolve")({
						jsnext: true,
						skip: ["async-waterfall", "mkdirp", "glob", "brfs"]
					})
				]
			},
			dist: {
				src: "tasks/fs-inline.js",
				dest: "build/fs-inline.js"
			}
		},

		nodeunit: {
			tests: ["test/*.test.js"]
		}

	});

	// The implemented plugin task.
	grunt.loadTasks("build");

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-nodeunit");
	grunt.loadNpmTasks("grunt-rollup");

	grunt.registerTask("default", ["test"]);
	grunt.registerTask("build", ["jshint", "rollup", "fsinline"]);
	grunt.registerTask("test", ["clean", "build", "nodeunit", "clean"]);

};
