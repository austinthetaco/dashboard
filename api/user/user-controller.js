const userService = require('./user-service');
const authService = require('../auth/auth-service');


module.exports = {
    register: async (request, h) => {

        console.log('888888', request);
        const existingUser = await userService.findByEmail(request.payload.email);
        console.log(existingUser)

        if(existingUser){
            return `get riggity wrecked ${existingUser.name}`
        }
        const user = await userService.add({
            email: request.payload.email,
            password: request.payload.password,
            name: request.payload.name,
        });

        const jwt = authService.signJWT(user.toJSON());

        h.state('id_token', jwt, {isSameSite: 'lax', isHttpOnly: false, isSecure: false, path: '/'})

        return {
            id_token: jwt,
            name: user.name,
            email: user.email
        }
    },
    login: async (request, h) => {
        const user = await userService.findByEmail(request.payload.email);
        if(!user) {
            return `you don't even exist bruh`;
        }

        const isCorrectPassword = await authService.checkPassword(request.payload.password, user.password);

        if(!isCorrectPassword) {
            return `wrong password bruh`;
        }

        const jwt = authService.signJWT(user.toJSON());
        
        h.state('id_token', jwt, {isSameSite: 'lax', isHttpOnly: false, isSecure: false, path: '/'})

        return {
            id_token: jwt,
            name: user.name,
            email: user.email,
            id: user.id,
        }
    }

}