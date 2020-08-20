const { Model } = require('objection');
const {v4: uuidv4} = require('uuid');

class User extends Model {
    static get tableName() {
        return 'users';
    };


    $beforeInsert() {
        this.id = uuidv4();
        this.created_at = new Date().toISOString();
    }
    $beforeUpdate(){
        this.updated_at = new Date().toISOString();
    }
}

module.exports = User;