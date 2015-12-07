module.exports = function(grunt) {

	grunt.initConfig({

		jshint: {
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
				dest: "test/inline/actual/a.js"
			},
			taskB: {
				options: {
					append: "export default b;"
				},
				src: "test/inline/b.js",
				dest: "test/inline/actual/b.js"
			}
		},

		nodeunit: {
			tests: ["test/*.test.js"]
		}

	});

	// The implemented plugin task.
	grunt.loadTasks("tasks");

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-nodeunit");

	grunt.registerTask("default", ["jshint", "test"]);
	grunt.registerTask("test", ["clean", "fsinline", "nodeunit", "clean"]);

};
