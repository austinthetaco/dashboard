const User = require('./User');
const bcrypt = require('bcrypt');
const authService = require('../auth/auth-service');



module.exports = {
    async add({name, email, password}){
        const hashedPassword = await authService.hashPassword(password);
        let user2;
        try {
            user2 = await User.query().insert({name, email, password: hashedPassword}).returning('*');
            console.log('jobsdone')
        } catch (error) {
            console.log('hello?', error)
        }
        return user2;
    },

    async findByEmail(email) {
        console.log('email??', email)
        return User.query().where({email}).first();
    },
    async findById(id) {
        return User.query().where({id}).first();
    }
}