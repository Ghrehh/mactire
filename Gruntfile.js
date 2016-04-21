module.exports = function(grunt) {

  grunt.initConfig({
    includes: {
      
      dist1: {
        src: ['source/pages/*.html'], // Source files
        dest: 'build', // Destination directory
        flatten: true,
        cwd: '.',
        options: {
          silent: false,
        }
      },
      dist2: {
        src: ['source/pages/news/*.html'], // Source files
        dest: 'build/news/', // Destination directory
        flatten: true,
        cwd: '.',
        options: {
          silent: false,
        }
      }
    },
    sass: {                              // Task
        dist: {                            // Target
          options: {                       // Target options
            style: 'compressed'
          },
          files: {                         // Dictionary of files
            'build/css/main.css': 'source/style/main.scss'       // 'destination': 'source'
          }
        }
      },
    browserify: {
      dist: {
        files: {
          'build/scripts/main.js': ['source/scripts/**/*.js']
        }
      }
    },
    watch: {
        scripts: {
            files: ["./source/**/*"],
            tasks: ["includes:dist1", "style", "script"]
         }
    }
  });

  grunt.loadNpmTasks('grunt-includes');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('build', ['includes']);
  grunt.registerTask('style', ['sass']);
  grunt.registerTask('script', ['browserify']);
  grunt.registerTask('default', ['watch']);
  

};