# grunt-gnirts

This [Grunt](http://gruntjs.com/) plugin is wrapper of [gnirts](https://github.com/anseki/gnirts).

* [gulp](http://gulpjs.com/) plugin: [gulp-gnirts](https://github.com/anseki/gulp-gnirts)

Obfuscate the string literal in the JavaScript code.

gnirts mangles the string literal more than hexadecimal escape like `"\x66\x6f\x6f"`.  
That hexadecimal escape is found out too easily, and it is decoded too easily. That stands out in the code. The stealers get the secret text (e.g. password) easily by pasting that on the console (e.g. Developer Tools of web browser).  
gnirts might not be able to protect the string from the stealers perfectly, but it force a troublesome work upon them.

For example, a string that should be hidden is here:

```js
var password = 'open the sesame';
```

Add the directives:

```js
var password = /* @mangle */ 'open the sesame' /* @/mangle */;
```

And then, pass this code to gnirts. The string literal between `/* @mangle */` and `/* @/mangle */` is obfuscated:

```js
var password = (function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-30-O)}).join('')})(12,155,145,155,153)+(16).toString(36).toLowerCase().split('').map(function(O){return String.fromCharCode(O.charCodeAt()+(-71))}).join('')+(38210).toString(36).toLowerCase()+(16).toString(36).toLowerCase().split('').map(function(O){return String.fromCharCode(O.charCodeAt()+(-71))}).join('')+(function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-37-O)}).join('')})(41,191,178,195,180,193)+(14).toString(36).toLowerCase();
```

But an above code is no good because a `password` variable can be shown by the debugger (e.g. Developer Tools of web browser).  
Using no variable is better way.  
For example, check whether an input from user is matched to a string literal:

```js
if (userInput === 'open the sesame') {
  console.log('OK, the door will be opened.');
}
```

Add the directives (Note that all of the condition expression is included in the directive):

```js
if (/* @mangle */ userInput === 'open the sesame' /* @/mangle */) {
  console.log('OK, the door will be opened.');
}
```

And then, pass this code to gnirts. The condition expression between `/* @mangle */` and `/* @/mangle */` is obfuscated:

```js
if ((new RegExp('^[\\s\\S]{10}'+((function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-62-O)}).join('')})(8,171)+(28).toString(36).toLowerCase()+(function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-26-O)}).join('')})(9,132)+(22).toString(36).toLowerCase()+(function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-8-O)}).join('')})(19,128)).replace(/(\W)/g,'\\$1'))).test(userInput)&&(userInput).indexOf((function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-18-O)}).join('')})(13,135)+(14).toString(36).toLowerCase()+(function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-2-O)}).join('')})(25,59)+(28).toString(36).toLowerCase())===6&&(new RegExp('^[\\s\\S]{5}'+((function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-3-O)}).join('')})(52,171)).replace(/(\W)/g,'\\$1'))).test(userInput)&&(userInput).indexOf((function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-55-O)}).join('')})(44,209)+(16).toString(36).toLowerCase().split('').map(function(O){return String.fromCharCode(O.charCodeAt()+(-71))}).join(''))===3&&(new RegExp('^[\\s\\S]{2}'+((function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-45-O)}).join('')})(7,153)).replace(/(\W)/g,'\\$1'))).test(userInput)&&(userInput).indexOf((function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-33-O)}).join('')})(25,169)+(25).toString(36).toLowerCase())===0) {
  console.log('OK, the door will be opened.');
}
```

## More Informations
See [gnirts](https://github.com/anseki/gnirts).

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

## The "gnirts" task

### Overview
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

See [gnirts](https://github.com/anseki/gnirts) for options and more information.
