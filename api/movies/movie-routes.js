const movieController = require('./movie-controller');

const movieRoutes = {
	name: 'Movie Routes',
	version: '1.0.0',
	register: async function (server, options) {
		
		server.route([
			{
				method: 'GET',
				path: '/',
				handler: function (request, h) {
				return 'hello, world';
				}
			}, 
			{
				method: 'POST',
				path: '/watchlist',
				handler: movieController.addToList,
				config: {
					auth: {
						strategies: ['jwt'],
						scope: ['austin']
					}
				},
			},
			{
				method: 'PUT',
				path: '/watchlist',
				handler: movieController.editList,
				config: {
					auth: {
						strategies: ['jwt'],
						scope: ['austin']
					}
				},
			},
			{
				method: 'GET',
				path: '/watchlist',
				handler: movieController.getWatchlist,
			}
		]);
	}
};

module.exports = movieRoutes;