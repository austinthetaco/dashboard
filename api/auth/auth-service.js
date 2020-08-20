const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userService = require('../user/user-service');

module.exports = {
    jwtKey: 'SECRETHERE',
    signJWT({email, name, id}) {

        try {
            const jwt = JWT.sign({email, name}, 'SECRETHERE', {
                algorithm: 'HS256',
                expiresIn: 365 * 24 * 60 * 60,
                subject: id,
            });
            return jwt;
        } catch (error) {
            console.log('WHY ARE YOU LIKE THIS', error);
        }
        

       
    },
    async validateJWT(decoded, request) {
        const user = await userService.findById(decoded.sub);
        const credentials = {...decoded};

        credentials.scope = [(user.toJSON().email === "austin.west@gmail.com"? "austin" : "notaustin")];
        credentials.user = user.toJSON();

        return {isValid: !!user, credentials};


    },

    hashPassword(plaintextPassword) {
        return new Promise((res, rej)=> {
            bcrypt.genSalt(10, (err, salt)=> {
                if(err){
                    rej(err);
                }
                bcrypt.hash(plaintextPassword, salt, (err, hash)=>{
                    if(err){
                        rej(err)
                    }
                    res(hash)
                })
            })
        })
    },
    checkPassword(sentPassword, userPassword) {
        return new Promise((resolve, reject)=> {
            bcrypt.compare(sentPassword, userPassword, (err,res)=> {
                if(err) {
                    reject(err)
                } else if (res) {
                    resolve(true);
                } else {
                    resolve(false)
                }
            });
        });
    }
}