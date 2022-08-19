# grunt-gnirts

[![npm](https://img.shields.io/npm/v/grunt-gnirts.svg)](https://www.npmjs.com/package/grunt-gnirts) [![GitHub issues](https://img.shields.io/github/issues/anseki/grunt-gnirts.svg)](https://github.com/anseki/grunt-gnirts/issues) [![David](https://img.shields.io/david/anseki/grunt-gnirts.svg)](package.json) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

This [Grunt](http://gruntjs.com/) plugin is wrapper of [gnirts](https://github.com/anseki/gnirts).

* [gulp](http://gulpjs.com/) plugin: [gulp-gnirts](https://github.com/anseki/gulp-gnirts)
* [webpack](https://webpack.js.org/) loader: [gnirts-loader](https://github.com/anseki/gnirts-loader)

Obfuscate string literals in JavaScript code.  
See [gnirts](https://github.com/anseki/gnirts) for more information about gnirts.

## Getting Started

This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-gnirts --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-gnirts');
```

## Usage

In your project's Gruntfile, add a section named `gnirts` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  gnirts: {
    deploy: {
      expand: true,
      cwd: 'develop/',
      src: '**/*.js',
      dest: 'public_html/'
    }
  }
});
```
