module.exports = function (grunt) {

  'use strict';

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var scriptsSrc = [
    'app/scripts/{,*/}*.js'
  ];

  var tplSrc = ['app/views/**/*.html'];

  var libSrc = [
    'app/lib/angular.js'
  ];

  // Determine the min src for libs based on the convention '.min.js'
  var libSrcMin = [];
  for (var i = 0; i < libSrc.length; i++) {
    libSrcMin[i] = libSrc[i].replace(/.js$/, '.min.js');
  }

  grunt.initConfig({

    clean: ['dist'],
    ngtemplates: {
      'simple-angular': {
        options: {
          base: ''        // $templateCache ID will be relative to this folder
        },
        src: tplSrc,
        dest: 'dist/templates.js'
      }
    },
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: '\n;'
      },
      scripts: {
        src: scriptsSrc.concat('dist/templates.js'),  // Scripts src + compiled templates
        dest: 'dist/scripts.js'
      },
      lib: {
        src: libSrc,
        dest: 'dist/lib.js'
      },
      'lib-min': {
        src: libSrcMin,
        dest: 'dist/lib.js'
      }
    },
    ngmin: {
      dist: {
        files: [
          {
            expand: true,
            src: 'dist/scripts.js',
            dest: 'dist/ngmin'
          }
        ]
      }
    },
    closurecompiler: {
      // Minify application source for prod usage
      minify: {
        files: {
          'dist/scripts.js': 'dist/ngmin/dist/scripts.js'
        },
        options: {
          compilation_level: 'SIMPLE_OPTIMIZATIONS'
        }
      },
      // Concat only option for development
      concat: {
        files: {
          'dist/scripts.js': scriptsSrc
        },
        options: {
          compilation_level: 'WHITESPACE_ONLY',
          create_source_map: 'dist/membercentral.js.map',
          source_map_format: 'V3'
        }
      }

    },
    'append-sourcemapping': {
      main: {
        files: {
          'dist/scripts.js': 'scripts.js.map'
        }
      }
    },
    copy: {
      sources: {
        files: [
          {src: scriptsSrc, dest: 'dist/'}
        ]
      }

    },
    stylus: {
      compile: {
        options: {
          //firebug: 'false'
        },
        files: {
          'dist/screen.css': 'styles/screen.styl'
        }
      }
    },

    watch: {
      'js-scripts': {
        files: scriptsSrc.concat(tplSrc),
        //tasks: ['closurecompiler:concat','append-sourcemapping','copy:sources'],
        tasks: ['js-scripts'],
        options: {
          nocase: true
        }
      },
      'js-lib': {
        files: libSrc,
        tasks: ['js-lib'],
        options: {
          nocase: true
        }
      },
      css: {
        files: ['styles/**/*.styl'],
        tasks: ['css']
      },
      static: {
        files: ['app/*.html', 'app/views/**/*.html']
      },
      options: {
        livereload: true
      }
    },

    connect: {
      server: {
        options: {
          port: 9001,
          base: 'app'
        }
      }
    },

    open: {
      server: {
        url: 'http://localhost:<%= connect.server.options.port %>'
      }
    },

    karma: {
      unit: {
        configFile: 'test/unit/karma.conf.js',
        singleRun: true
      },
      tdd: {
        configFile: 'test/unit/karma.conf.js',
        singleRun: false,
        autoWatch: true
      },
      intg: {
        configFile: 'test/e2e/karma-e2e.conf.js',
        singleRun: true,
        proxies: {
          '/': 'http://localhost:<%= connect.server.options.port %>/'
        }
      }

    }

  });

  /** TASKS **/

  grunt.registerTask('js-scripts', ['ngtemplates', 'concat:scripts']);
  grunt.registerTask('js-scripts-minify', ['ngmin', 'closurecompiler:minify']);
  grunt.registerTask('js-lib', ['concat:lib']);
  grunt.registerTask('js-lib-minify', ['concat:lib-min']);

  grunt.registerTask('js', ['js-scripts', 'js-scripts-minify', 'js-lib-minify' ]);

  grunt.registerTask('css', ['stylus']);

  grunt.registerTask('compile', ['js', 'css']);

  grunt.registerTask('server', ['connect']);

  grunt.registerTask('default', ['clean', 'compile']);


};