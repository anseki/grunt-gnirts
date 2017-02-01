# grunt-gnirts

[![npm](https://img.shields.io/npm/v/grunt-gnirts.svg)](https://www.npmjs.com/package/grunt-gnirts) [![GitHub issues](https://img.shields.io/github/issues/anseki/grunt-gnirts.svg)](https://github.com/anseki/grunt-gnirts/issues) [![David](https://img.shields.io/david/anseki/grunt-gnirts.svg)](package.json) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE-MIT)

This [Grunt](http://gruntjs.com/) plugin is wrapper of [gnirts](https://github.com/anseki/gnirts).

* [gulp](http://gulpjs.com/) plugin: [gulp-gnirts](https://github.com/anseki/gulp-gnirts)

Obfuscate the string literal in the JavaScript code.

gnirts mangles the string literal more than hexadecimal escape like `"\x66\x6f\x6f"`.  
That hexadecimal escape is found out too easily, and it is decoded too easily. That stands out in the code. The stealers get the secret text (e.g. password) easily by pasting that on the console (e.g. Developer Tools of web browser).

gnirts mangles the string literal by using some codes instead of hexadecimal escape. gnirts might not be able to protect the string from the stealers perfectly, but it forces a troublesome work upon them. (See [Note](#note).)

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
var password = (function(){var m=Array.prototype.slice.call(arguments),i=m.shift();return m.reverse().map(function(j,a){return String.fromCharCode(j-i-55-a)}).join('')})(32,190,200,198)+(23).toString(36).toLowerCase()+(16).toString(36).toLowerCase().split('').map(function(Q){return String.fromCharCode(Q.charCodeAt()+(-71))}).join('')+(1022).toString(36).toLowerCase()+(function(){var m=Array.prototype.slice.call(arguments),Q=m.shift();return m.reverse().map(function(N,c){return String.fromCharCode(N-Q-16-c)}).join('')})(8,135,122,139)+(14).toString(36).toLowerCase();
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
if ((userInput).indexOf((function(){var l=Array.prototype.slice.call(arguments),O=l.shift();return l.reverse().map(function(P,g){return String.fromCharCode(P-O-3-g)}).join('')})(1,105),10)===10&&(new RegExp('^[\\s\\S]{9}'+(22).toString(36).toLowerCase())).test(userInput)&&(userInput).indexOf((function(){var J=Array.prototype.slice.call(arguments),z=J.shift();return J.reverse().map(function(H,d){return String.fromCharCode(H-z-47-d)}).join('')})(1,148,165,150,163),5)===5&&(new RegExp('^[\\s\\S]{2}'+(527).toString(36).toLowerCase()+(18).toString(36).toLowerCase().split('').map(function(w){return String.fromCharCode(w.charCodeAt()+(-13))}).join('')+(42840).toString(36).toLowerCase())).test(userInput)&&(userInput).indexOf((function(){var H=Array.prototype.slice.call(arguments),Y=H.shift();return H.reverse().map(function(u,U){return String.fromCharCode(u-Y-12-U)}).join('')})(59,184,182),0)===0) {
  console.log('OK, the door will be opened.');
}
```

## More Information

See [gnirts](https://github.com/anseki/gnirts) for the usage of the directive and more information.

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

See [gnirts](https://github.com/anseki/gnirts) for more information.

## Note

This mangling is not the cryptography to keep the data secure. It is used to avoid the hacking, the stealing something or the reverse engineering for such as the hybrid applications or the web applications. If your program uses the sensitive information such as the user's accounts, you should consider the standard secure system such as the cryptography by key pair.
