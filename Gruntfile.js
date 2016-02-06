'use strict';
module.exports = function(grunt) {

    var config = {
        paths: {
            src: 'src/main/resources/static/'
        }
    };

    grunt.initConfig({
        config: config,
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            options: {
                livereload: true
            },
            files: ['<%= config.paths.src %>/**/*']
        },
        connect: {
            proxies: [{
                context: '/api',
                host: '127.0.0.1',
                port: 8080,
                rewrite: {
                    '^/api': '/api'
                }
            }],
            server: {
                options: {
                    port: 9000,
                    livereload: true,
                    base: '<%= config.paths.src %>',
                    middleware: function(connect, options, defaultMiddleware) {
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        // Setup the proxy
                        var middlewares = [
                            require('grunt-connect-proxy/lib/utils').proxyRequest
                        ];

                        // Serve static files.
                        options.base.forEach(function(base) {
                            middlewares.push(connect.static(base));
                        });

                        // Make directory browse-able.
                        // var directory = options.directory || options.base[options.base.length - 1];
                        // middlewares.push(connect.directory(directory));

                        return middlewares;
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-connect-proxy');

    grunt.registerTask('serve', ['configureProxies:server', 'connect:server', 'watch']);
    grunt.registerTask('default', ['serve']);

}
