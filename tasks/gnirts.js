/*
 * grunt-gnirts
 * https://github.com/anseki/grunt-gnirts
 *
 * Copyright (c) 2024 anseki
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var gnirts = require('gnirts');

  grunt.registerMultiTask('gnirts', 'Obfuscate the string literal in the JavaScript code.', function() {
    this.files.forEach(function(f) {
      // Concat specified files.
      var srcFiles = f.src.filter(function(filepath) {
          // Warn on and remove invalid source files (if nonull was set).
          if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
          }
          return true;
        }),
        content = srcFiles.length
          ? srcFiles.map(function(filepath) { return grunt.file.read(filepath); })
            .join(grunt.util.linefeed) :
          null;

      if (content == null) { return; }

      content = gnirts.mangle(content);

      // Write the destination file.
      grunt.file.write(f.dest, content);
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
