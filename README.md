# grunt-gnirts

This [Grunt](http://gruntjs.com/) plugin is wrapper of [gnirts](https://github.com/anseki/gnirts).

* [gulp](http://gulpjs.com/) plugin: [gulp-gnirts](https://github.com/anseki/gulp-gnirts)

Obfuscate the string literal in the JavaScript code.

gnirts mangles the string literal more than hexadecimal escape like `"\x66\x6f\x6f"`.  
That hexadecimal escape is found out too easily, and it is decoded too easily. That stands out in the code. The stealers get the secret text (e.g. password) easily by pasting that on the console (e.g. Developer Tools of web browser).

gnirts mangles the string literal by using some codes instead of hexadecimal escape. gnirts might not be able to protect the string from the stealers perfectly, but it forces a troublesome work upon them.

For example, a string that should be hidden is here:

```js
var password = 'open sesame';
```

Add the directives:

```js
var password = /* @mangle */ 'open sesame' /* @/mangle */;
```

And then, pass this code to gnirts. The string literal between `/* @mangle */` and `/* @/mangle */` is obfuscated:

```js
var password = (function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-35-O)}).join('')})(12,150,160,158)+(23).toString(36).toLowerCase()+(16).toString(36).toLowerCase().split('').map(function(O){return String.fromCharCode(O.charCodeAt()+(-71))}).join('')+(function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-33-O)}).join('')})(54,189,202)+(1018).toString(36).toLowerCase()+(function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-3-O)}).join('')})(30,142)+(14).toString(36).toLowerCase();
```

But an above code is no good because a `password` variable can be shown by the debugger (e.g. Developer Tools of web browser).  
Using no variable is better way. And gnirts supports the checking that the string matches.  
For example, check whether an input from user is matched to a string literal:

```js
if (userInput === 'open sesame') {
  console.log('OK, the door will be opened.');
}
```

Add the directives (Note that all of the condition expression is included in the directive):

```js
if (/* @mangle */ userInput === 'open sesame' /* @/mangle */) {
  console.log('OK, the door will be opened.');
}
```

And then, pass this code to gnirts. The condition expression between `/* @mangle */` and `/* @/mangle */` is obfuscated:

```js
if ((userInput).indexOf((function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-41-O)}).join('')})(3,153)+(14).toString(36).toLowerCase(),9)===9&&(new RegExp('^[\\s\\S]{7}'+((function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-18-O)}).join('')})(10,143)+(10).toString(36).toLowerCase()).replace(/([\x00-\x2f\x3a-\x40\x5b-\x5e\x60\x7b-\x7f])/g,function(s,I){return '\\x'+('00'+I.charCodeAt().toString(16)).substr(-2)}))).test(userInput)&&(userInput).indexOf((function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-45-O)}).join('')})(59,205),6)===6&&(new RegExp('^[\\s\\S]{3}'+((function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-46-O)}).join('')})(55,211)+(16).toString(36).toLowerCase().split('').map(function(O){return String.fromCharCode(O.charCodeAt()+(-71))}).join('')+(function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-29-O)}).join('')})(46,190)).replace(/([\x00-\x2f\x3a-\x40\x5b-\x5e\x60\x7b-\x7f])/g,function(s,I){return '\\x'+('00'+I.charCodeAt().toString(16)).substr(-2)}))).test(userInput)&&(userInput).indexOf((function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-45-O)}).join('')})(48,194),2)===2&&(new RegExp('^[\\s\\S]{1}'+((function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-11-O)}).join('')})(34,157)).replace(/([\x00-\x2f\x3a-\x40\x5b-\x5e\x60\x7b-\x7f])/g,function(s,I){return '\\x'+('00'+I.charCodeAt().toString(16)).substr(-2)}))).test(userInput)&&(userInput).indexOf((function(){var O=Array.prototype.slice.call(arguments),l=O.shift();return O.reverse().map(function(c,O){return String.fromCharCode(c-l-37-O)}).join('')})(24,172),0)===0) {
  console.log('OK, the door will be opened.');
}
```

## More Informations

See [gnirts](https://github.com/anseki/gnirts) for the usage of the directive and more informations.

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

See [gnirts](https://github.com/anseki/gnirts) for more informations.
