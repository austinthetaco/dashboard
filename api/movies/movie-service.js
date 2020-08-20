const MoviesToWatch = require('./MoviesToWatch');

module.exports = {
    async addToWatchlist({actors, director, genre, imdbid, plot, poster, ratings, title, year, sort_order}, id){
        
        let movier;
        try {
            movier = await MoviesToWatch.query().upsertGraphAndFetch({actors, director, genre, omdb_id: imdbid, plot, poster, ratings: {data: ratings}, title, year, sort_order, user: id}).debug();
        } catch (e) {console.log(e)}
        return movier;
    },
    async editList(data) {
        
        let movier;
        try{
            movier =  await MoviesToWatch.query().upsertGraphAndFetch(data, {insertMissing: true, relate: true, unrelate: true}).debug()
        } catch(e) {console.log(e)}
        return movier;
    },
    async getWatchlist(){
        return MoviesToWatch.query();
    }
}