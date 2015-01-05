module.exports = function(grunt) {
  'use strict';

  var BANNER = '/*!\n' +
               ' * <%= pkg.name %> v<%= pkg.version %>\n' +
               ' * <%= pkg.description %>\n' +
               ' * Copyright 2014, <%= pkg.author %>\n' +
               ' * Released under the <%= pkg.license %> license\n' +
               ' */\n';

  grunt.loadNpmTasks('grunt-jsxhint');
  grunt.loadNpmTasks('grunt-lesslint');
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-banner');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    react: {
      options: {
        harmony: true
      },
      files: {
        expand: true,
        cwd: 'src',
        src: ['**/*.jsx'],
        dest: 'lib',
        ext: '.js'
      }
    },

    usebanner: {
      npm: {
        options: {
          position: 'top',
          banner: BANNER
        },
        files: {
          src: [
            'lib/**/*.js'
          ]
        }
      }
    },

    browserify: {
      options: {
        browserifyOptions: {
          debug: true,
          standalone: 'ReactDTPicker'
        }
      },

      bower: {
        src: 'lib/index.js',
        dest: 'dist/react-dtpicker.js'
      }
    },

    uglify: {
      options: {
        banner: BANNER
      },
      bower: {
        files: {
          'dist/react-dtpicker.min.js': [
            'dist/react-dtpicker.js'
          ]
        }
      }
    },

    less: {
      bower: {
        options: {
          banner: BANNER
        },
        files: {
          'dist/react-dtpicker.css': 'less/index.less'
        }
      }
    },

    cssmin: {
      bower: {
        files: {
          'dist/react-dtpicker.min.css': [
            'dist/react-dtpicker.css'
          ]
        }
      }
    },

    watch: {
      npm: {
        files: [
          'src/**/*.jsx'
        ],
        tasks: [
          'react'
        ]
      },
      bower: {
        files: [
          'lib/**/*.js'
        ],
        tasks: [
          'browserify:bower'
        ]
      },
      bowercss: {
        files: [
          'less/**/*.less'
        ],
        tasks: [
          'less:bower'
        ]
      }
    },

    clean: {
      bower: [
        'dist'
      ],
      npm: [
        'lib'
      ]
    },

    jshint: {
      options: {
        esnext: true,
        force: true,
        bitwise: true,
        camelcase: true,
        curly: true,
        eqeqeq: true,
        es3: true,
        forin: true,
        freeze: true,
        immed: true,
        indent: 2,
        latedef: true,
        newcap: false,
        noarg: true,
        noempty: true,
        nonbsp: true,
        nonew: true,
        quotmark: false,
        undef: true,
        unused: true,
        strict: true,
        maxcomplexity: 10,
        maxlen: 80
      },

      project: {
        src: [
          'Gruntfile.js'
        ],
        options: {
          node: true
        }
      },

      source: {
        src: [
          'src/**/*.jsx'
        ],
        options: {
          node: true
        }
      },

      test: {
        src: [
          'tests/**/*-test.js'
        ],
        options: {
          node: true,
          jasmine: true,
          globals: {
            xdescribe: true,
            xit: true
          }
        }
      }
    },

    lesslint: {
      src: [
        'less/**/*.less'
      ],
      options: {
        csslint: {
          'adjoining-classes': false,
          'box-sizing': false,
          'fallback-colors': false,
          'bulletproof-font-face': false
        }
      }        
    },

    jsonlint: {
      project: {
        src: [
          'bower.json',
          'package.json'
        ]
      }
    }
  });


  grunt.registerTask('build', [
    'clean:npm',
    'react',
    'usebanner:npm',
    'clean:bower',
    'browserify:bower',
    'uglify:bower',
    'less:bower',
    'cssmin:bower'
  ]);

  grunt.registerTask('lint', [
    'jsonlint',
    'jshint',
    'lesslint'
  ]);

  grunt.registerTask('dev', [
    'build',
    'watch'
  ]);

  grunt.registerTask('default', ['build', 'lint']);
};

