module.exports = function(grunt) {

  grunt.config.set('sass', {
    dev: {
      files: [{
        expand: true,
        cwd: 'sass/',
        src: ['all.scss'],
        dest: '.tmp/public/styles/',
        ext: '.css'
      }]
    }
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
};