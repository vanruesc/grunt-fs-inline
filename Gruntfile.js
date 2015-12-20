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

		nodeunit: {
			tests: ["test/*.test.js"]
		}

	});

	// The implemented plugin task.
	grunt.loadTasks("tasks");

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-nodeunit");

	grunt.registerTask("default", ["test"]);
	grunt.registerTask("test", ["clean", "jshint", "fsinline", "nodeunit", "clean"]);

};
