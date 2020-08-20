'use strict';

const Hapi = require('@hapi/hapi');
const objection = require('objection');
const knex = require('./knex');
const authService = require('./auth/auth-service');
const JWTAuth = require('hapi-auth-jwt2');

const init = async () => {

    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
        routes: { cors: {
            origin: ['*'],
            headers: ['Authorization'], 
            exposedHeaders: ['Accept'], 
            additionalExposedHeaders: ['Accept'], 
            maxAge: 60,
            credentials: true 
        }}
    });

    objection.Model.knex(require('./knex'));

    await server.register([JWTAuth])
    
    server.auth.strategy('jwt', 'jwt',{
        key: authService.jwtKey,
        validate: authService.validateJWT,
        verifyOptions: {algorithms: ['HS256']}, 
        errorFunc: (err)=> {return err},
        cookieKey: 'id_token'
    })

    await server.register([
            {
                plugin: require('./movies/movie-routes'),
                routes: {prefix: '/movies'}
            }, {
                plugin: require('./user/user-routes'),
            }
        ])

    
    await server.start();
    console.log('Server running on %s', server.info.uri);
    knex.raw('select 1+1 as result').then(function () {
        console.log('eeeeeyyyyyy');
      });
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();