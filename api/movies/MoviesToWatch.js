const { Model } = require('objection');
const {v4: uuidv4} = require('uuid');

class MoviesToWatch extends Model {
    static get tableName() {
        return 'movies_to_watch';
    };

    static get relationMappings() {
        return {
            users: {
                relation: Model.HasOneRelation,
                modelClass: require('../user/User'),
                join: {from: 'movies_to_watch.user', to: 'users.id'}
            }
        }
    };


    $beforeInsert() {
        this.id = uuidv4();
        this.created_at = new Date().toISOString();
    }
    $beforeUpdate(){
        this.updated_at = new Date().toISOString();
    }
}

module.exports = MoviesToWatch;