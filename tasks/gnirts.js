/*
 * grunt-gnirts
 * https://github.com/anseki/grunt-gnirts
 *
 * Copyright (c) 2018 anseki
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var gnirts = require('gnirts');

  grunt.registerMultiTask('gnirts', 'Obfuscate the string literal in the JavaScript code.', function() {
    this.files.forEach(function(f) { // eslint-disable-line no-invalid-this
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        return grunt.file.read(filepath);
      }).join(grunt.util.linefeed);

      src = gnirts.mangle(src);

      // Write the destination file.
      grunt.file.write(f.dest, src);
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
