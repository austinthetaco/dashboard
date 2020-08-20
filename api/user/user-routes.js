const UserController = require('./user-controller');


const movieRoutes = {
	name: 'User  Routes',
	version: '1.0.0',
	register: async function (server, options) {
		
		server.route([
			{
				method: 'post',
				path: '/register',
				handler: UserController.register,
			},
			{
				method: 'post',
				path: '/login',
				handler: UserController.login,
			}
		]);
	}
};

module.exports = movieRoutes;