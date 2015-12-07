# grunt-fs-inline 
[![Build status](https://travis-ci.org/vanruesc/grunt-fs-inline.svg?branch=master)](https://travis-ci.org/vanruesc/grunt-fs-inline) 
[![GitHub version](https://badge.fury.io/gh/vanruesc%2Fgrunt-fs-inline.svg)](http://badge.fury.io/gh/vanruesc%2Fgrunt-fs-inline) 
[![npm version](https://badge.fury.io/js/grunt-fs-inline.svg)](http://badge.fury.io/js/grunt-fs-inline) 
[![Dependencies](https://david-dm.org/vanruesc/grunt-fs-inline.svg?branch=master)](https://david-dm.org/vanruesc/grunt-fs-inline)

This plugin enables you to use [brfs](https://github.com/substack/brfs) without browserify. It's useful if you just want to 
inline external files like glsl shader code in some of your JavaScript files.


## Getting Started

This plugin requires Grunt >= 0.4.0

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) 
guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. 
Once you're familiar with that process, you may install this plugin with this command:

```sh
npm install grunt-fs-inline --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks("grunt-fs-inline");
```


## Usage
Directories will be created if they don't exist.

```js
fsinline: {
  taskA: {
    src: "src/a.js",
    dest: "src/a.inlined.js"
  },
  taskB: {
    src: "src/b.js",
    dest: "src/sub/dir/b.inlined.js"
  },
  ...
}
```


### Options
Besides the [brfs specific options](https://github.com/substack/brfs#var-tr--brfsfile-opts), you may also provide 
strings that should be appended to the inlined files.

```js
fsinline: {
  options: {
    // Global options.
    brfs: {
      n: 5,
      foo: function(x) { return x * 100; },
      obj: {x: {y: 666}}
    }
  },
  taskA: {
    options: {
      // Local options.
      brfs: { ... },
      append: "/** my footer or code snippet **/"
    },
    src: "src/*/a.js",
    dest: "**/a.inlined.js"
  }
}
```


## Contributing
Maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.


## License
[Zlib](https://github.com/vanruesc/stay/blob/master/LICENSE)
