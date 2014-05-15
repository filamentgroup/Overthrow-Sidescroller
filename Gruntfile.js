/*global module:false*/
module.exports = function(grunt) {
  var core;

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - <%= pkg.description %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; Licensed <%= pkg.license %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      core: {
        src: core = ['src/lib/overthrow.min.js', 'src/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.core.js'
      },
      all: {
        src: core.concat([
          'src/extensions/<%= pkg.name %>.append.js',
          'src/extensions/<%= pkg.name %>.goto.js',
          'src/extensions/<%= pkg.name %>.disable-nav.js',
          'src/extensions/<%= pkg.name %>.skip.js'
        ]),
        dest: 'dist/<%= pkg.name %>.all.js'
      }
    },
    qunit: {
      files: ['test/*.html']
    },
    uglify: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      core: {
        src: ['dist/<%= pkg.name %>.core.js'],
        dest: 'dist/<%= pkg.name %>.core.min.js'
      },
      all: {
        src: ['dist/<%= pkg.name %>.all.js'],
        dest: 'dist/<%= pkg.name %>.all.min.js'
      }
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task.
  grunt.registerTask('default', ['concat', 'uglify']);

};
