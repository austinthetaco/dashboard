import React, { useContext, useState, useEffect, useMemo } from 'react';
import {useMutation, useQuery} from 'react-query';
import {DebounceInput} from 'react-debounce-input';
import axios from 'axios';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import {RootContext} from '../RootContext';
import {sortableContainer, sortableElement, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import useMovies from '../hooks/useMovies';

import MovieSearch from './MovieSearch'

export default withRouter(({match: {url}}) => {
  console.log(url)
  return (
  <div>
    <Switch>
        <Route path={`${url}/movie-search`}>
            <MovieSearch url={url}/>
        </Route>
        <Route path="/">
            <MoviesHome url={url}/>
        </Route>
    </Switch>
  </div>
  )
})





const MoviesHome = ({url}) => {
  const [searchValue, setSearchValue] = useState('');
  const [moviesToWatch, setMoviesToWatch] = useState([]);
  const SortableItem = sortableElement(({movie}) => {
    console.log('whaaaaa', movie)
    return (
    <li style={{width: "300px"}}>
      <div style={{display: 'inline-flex'}}>
      <img style={{height: '17vw', maxHeight: '300px'}} src={movie.poster}/>
      <div>
        <h3>
          {movie.title} + potates
        </h3>
        <p>{movie.Year}</p>
      </div>
      </div>
    </li>)
  });
  const SortableContainer = sortableContainer(({children}) => {
    return <ul>{children}</ul>;
  });
  const instance = axios.create({
    baseURL: 'http://localhost:9000'
  });
  const { user } = useContext(RootContext);
  if(user){
    instance.defaults.headers.common['Authorization'] = user.id_token;
  }

  const [mutate] = useMutation((data)=>{return instance.post('/movies/watchlist', data)})

  const [callMutation] = useMutation((data)=>{return instance.put('/movies/watchlist', data)})



 
  
 

  const handleAddMovie = (movie) => {
    axios.get(`http://www.omdbapi.com/?apikey=no&i=${movie.imdbID}`).then(res => {
      var key, keys = Object.keys(res.data);
      var n = keys.length;
      var newobj={}
      while (n--) {
        key = keys[n];
        newobj[key.toLowerCase()] = res.data[key];
      }
      newobj.sort_order = moviesToWatch.length;
      mutate(newobj);

    })
  }


  


  // const {isLoading, data: watchListData} = useQuery('movies_to_watch',()=> {return instance.get('/movies/watchlist')}, {enabled: !!user})

  const { data: watchListData } = useMovies(user);
  // watchListData && watchListData.forEach((movie)=>{
  //   setMoviesToWatch(movie.id);
  // })

 


  useEffect(()=>{
    if(watchListData && watchListData.length > 0 && moviesToWatch.length === 0) {
      let array = [];
      watchListData.forEach(movie => array.push(movie.id))
      setMoviesToWatch(array);
    }
  }, [user, watchListData])


  const sortedMovies = useMemo(()=>{
    return moviesToWatch.map((id, index) => {
      let movie = watchListData.find(d => d.id === id)
      movie.sort_order = index;
      movie.user = user.id;
      return movie;
    })
  }, [moviesToWatch, watchListData]);


  useEffect(()=>{
    callMutation(sortedMovies);
  }, [sortedMovies])

  const handleMovieSort = (sort) => {
    setMoviesToWatch(arrayMove(moviesToWatch, sort.oldIndex, sort.newIndex))
    
  }
  
  const {data: searchResultData, isError } = useQuery(['searchOMDB', {searchValue}], ()=> {return axios.get(`http://www.omdbapi.com/?apikey=apikey&s=${JSON.stringify(searchValue)}`)}, {enabled: searchValue.length > 0, staleTime: 50000})

  return (
  <>
  {user ? (
      <div>
        <DebounceInput
        minLength={2}
        debounceTimeout={300}
        onChange={event => setSearchValue(event.target.value)} />
      </div>
    ) : 
      <p>
        Login to search for a movie
      </p>
  }

  {searchResultData && !searchResultData.data.Error ? <div>
  {searchResultData.data.Search.map((movie, i) => {
    return (<div key={i}>
        <div style={{display: 'inline-flex'}}>
        <img style={{height: '17vw', maxHeight: '300px'}} src={movie.Poster}/>
        <div>
          <h3>
            {movie.Title}
          </h3>
          <p>{movie.Year}</p>
          <button onClick={handleAddMovie.bind(this, movie)}>ADD</button>
        </div>
        </div>
      </div>)
  })}
  </div>: (searchResultData && searchResultData.data.Error ? <h2>{searchResultData.data.Error}</h2> : null )}

  {sortedMovies && sortedMovies.length > 0 ?
    <SortableContainer onSortEnd={handleMovieSort}>
      {sortedMovies.map((movie, i)=> {
        console.log('movierrrr', movie)
        return <SortableItem key={i} index={i} movie={movie} />
      })}

    </SortableContainer> 
  
  : null}
  

  <p>
  Yeah it's a movie wanna cry about it? <Link to={`${url}/movie-search`}>look for somethin</Link>
  </p>
  </>
  )
};