import { useQuery } from "react-query";
import axios from "axios";


const getMoviesAxios = async (title, user) => {
  console.log('aylamo')
  const instance = axios.create({
    baseURL: 'http://localhost:9000'
  });
  // const { user } = useContext(RootContext);
  if(user){
    instance.defaults.headers.common['Authorization'] = user.id_token;
  }
  const { data } = await instance.get('/movies/watchlist');
  return data;
}
  
export default function useMovies(user) {
  return useQuery(["movies_to_watch", user], getMoviesAxios);
}