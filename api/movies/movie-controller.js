const movieService = require('./movie-service');

module.exports = {
    addToList: async(request, h) => {
        console.log('REQUEST', request.auth.credentials);
        return await movieService.addToWatchlist(request.payload, request.auth.credentials.user.id);
    },
    editList: async(request, h) => {
        console.log('reeeeeee', request.payload)
        return await movieService.editList(request.payload, request.auth.credentials.user.id);
    },
    getWatchlist: async(request) => {
        return movieService.getWatchlist();
    }

}