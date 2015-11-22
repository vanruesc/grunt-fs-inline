module.exports = function(grunt) {

	grunt.initConfig({

		jshint: {
			files: ["Gruntfile.js", "tasks/**/*.js", "<%= nodeunit.tests %>"]
		},

		clean: {
			tests: ["test/inline/a.inlined.js"]
		},

		// Configuration to be run and tested.
		fsinline: {
			task1: {
				src: "test/inline/a.js",
				dest: "test/inline/a.inlined.js"
			},
			task2: {
				src: "test/inline/b.js",
				dest: "test/inline/b.inlined.js"
			}
		},

		nodeunit: {
			tests: ["test/*.test.js"]
		}

	});

	// The plugin task of this module.
	grunt.loadTasks("tasks");

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-nodeunit");

	grunt.registerTask("default", ["jshint", "test"]);
	grunt.registerTask("test", ["clean", "fsinline", "nodeunit"]);

};
