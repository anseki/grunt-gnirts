'use strict';

let mangleThrow;
const expect = require('chai').expect,
  sinon = require('sinon'),
  proxyquire = require('proxyquire').noPreserveCache(),
  ERR_MSG = 'ERR_MSG',
  gnirts = {
    mangle: sinon.spy(content => {
      if (mangleThrow) { throw new Error(ERR_MSG); }
      return `${content}<mangle>`;
    }),
    '@global': true
  },
  grunt = proxyquire('./init-grunt.js', {gnirts}),
  path = require('path'),

  FIXTURES_DIR_PATH = path.resolve(__dirname, 'fixtures'),
  CONTENTS = ['content-1.html', 'content-2.html']
    .map(fileName => require('fs').readFileSync(
      path.join(FIXTURES_DIR_PATH, fileName), {encoding: 'utf8'}))
    .join(grunt.util.linefeed),
  RES_METHOD = `${CONTENTS}<mangle>`,
  OUTPUT_PATH = 'path/to/output',
  LIB_NAME = 'gnirts';

function resetAll() {
  gnirts.mangle.resetHistory();
  grunt.file.write.resetHistory();
}

function runTask(done, options, files) {
  let error;
  grunt.initConfig({
    [LIB_NAME]: {
      test: {
        options,
        files: files || [{
          src: `${FIXTURES_DIR_PATH}/*.html`,
          dest: OUTPUT_PATH
        }]
      }
    }
  });
  grunt.task.options({done: () => { done(error); }});
  grunt.task.options({error: err => { error = err; }});
  grunt.task.run('default');
  grunt.task.start({asyncDone: true});
}

grunt.registerTask('default', [`${LIB_NAME}:test`]);
sinon.stub(grunt.file, 'write');

describe('implements a basic flow as file based plugin', () => {

  it('should accept contents from all source files', done => {
    mangleThrow = false;
    resetAll();
    runTask(
      () => {
        expect(gnirts.mangle.calledOnceWithExactly(CONTENTS)).to.be.true;
        expect(grunt.file.write.calledOnceWithExactly(OUTPUT_PATH, RES_METHOD)).to.be.true;

        done();
      }
    );
  });

  it('should skip process if no file is input', done => {
    mangleThrow = false;
    resetAll();
    runTask(
      () => {
        expect(gnirts.mangle.notCalled).to.be.true;
        expect(grunt.file.write.notCalled).to.be.true;

        done();
      },
      null,
      [{
        src: `${FIXTURES_DIR_PATH}/*.txt`,
        dest: OUTPUT_PATH
      }]
    );
  });

});

describe('mangle()', () => {

  it('should return processed value by method', done => {
    mangleThrow = false;
    resetAll();
    runTask(
      () => {
        expect(gnirts.mangle.calledOnceWithExactly(CONTENTS)).to.be.true;
        expect(grunt.file.write.calledOnceWithExactly(OUTPUT_PATH, RES_METHOD)).to.be.true;

        done();
      }
    );
  });

  it('should throw an error if mangle failed', done => {
    mangleThrow = false;
    resetAll();
    runTask(
      error => {
        expect(gnirts.mangle.calledOnceWithExactly(CONTENTS)).to.be.true;
        expect(grunt.file.write.calledOnceWithExactly(OUTPUT_PATH, RES_METHOD)).to.be.true;
        expect(error).to.be.undefined;

        // Throws
        mangleThrow = true;
        resetAll();
        runTask(
          error => {
            expect(gnirts.mangle.calledOnceWithExactly(CONTENTS)).to.be.true;
            expect(grunt.file.write.notCalled).to.be.true;
            // expect(error instanceof Error).to.be.true;
            // expect(error).to.be.an('error', ERR_MSG);
            // These above don't work well...
            // https://github.com/chaijs/chai/issues/930
            expect(error.toString()).to.equal(`Error: ${ERR_MSG}`);

            done();
          }
        );
      }
    );
  });

});
