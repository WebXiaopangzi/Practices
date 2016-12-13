module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');


    grunt.initConfig({
        uglify:{
            my_target:{
                files:{
                    'views/js/main.min.js':['views/js/main.js'],
                }
            }
        },

        cssmin:{
            target:{
                files:{
                    'views/css/bootstrap-grid.min.css':['views/css/bootstrap-grid.css'],
                    'css/style.min.css':['css/style.css']
                }
            }
        }

    });


    grunt.registerTask('default',[
        'uglify',
        'cssmin'
        ]);
};