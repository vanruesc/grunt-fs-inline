# grunt-fs-inline 
[![Build status](https://travis-ci.org/vanruesc/grunt-fs-inline.svg?branch=master)](https://travis-ci.org/vanruesc/grunt-fs-inline) 
[![GitHub version](https://badge.fury.io/gh/vanruesc%2Fgrunt-fs-inline.svg)](https://badge.fury.io/gh/vanruesc%2Fgrunt-fs-inline) 
[![npm version](https://badge.fury.io/js/grunt-fs-inline.svg)](https://badge.fury.io/js/grunt-fs-inline) 
[![Dependencies](https://david-dm.org/vanruesc/grunt-fs-inline.svg?branch=master)](https://david-dm.org/vanruesc/grunt-fs-inline)

This grunt plugin enables you to use [brfs](https://github.com/substack/brfs) without browserify. It's useful if you want to 
inline external files like shader code in your JavaScript files.


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
Specify a source path ```src``` and a destination path ```dest```. __The destination is always relative to the source path.__ Directories 
will be created if they don't exist. If you don't specify a clear file name with a file extension in ```dest```, then the name of the source 
file will be used instead.

```js
fsinline: {
  taskA: {
    src: "src/foo.js",
    dest: "./foo.inlined.js"
  },
  taskB: {
    src: "src/foo.js",
    dest: "../other/dir"
  },
  ...
}
```


### Glob
You may use [glob patterns](https://github.com/isaacs/node-glob#glob-primer) in order to inline a bunch of files at once. 

```js
fsinline: {
  task: {
    src: "src/**/foo.js",
    dest: "./bar"
  }
}
```

The above configuration will create the sub directory __bar__ wherever files with the name __foo.js__ are found in __src__. The inlined version 
of the source file will be written to a new file with the _same name_ in the created directory, because ```dest``` doesn't clearly specify a file name.


### Options
In addition to the underlying [brfs](https://github.com/substack/brfs#var-tr--brfsfile-opts) and [glob](https://github.com/isaacs/node-glob#options) 
options, you may also append an arbitrary text to the inlined files.

```js
fsinline: {
  options: {
    // Global options.
    brfs: { ... },
    glob: { ... },
    append: "export default foo;"
  },
  taskA: {
    options: {
      // Local options.
      brfs: null,
      glob: null,
      append: null
    },
    src: "src/a.js",
    dest: "src/a.inlined.js"
  }
}
```


## Contributing
Maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.


## License
[Zlib](https://github.com/vanruesc/grunt-fs-inline/blob/master/LICENSE)
