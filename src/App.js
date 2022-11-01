import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [moviesList, updateMoviesList] = useState([]);
  const [isLoading, setIsLoad] = useState(false);

  const fetchMovies = () => {
    setIsLoad(true);
    // promise
    fetch('https://swapi.dev/api/films/').then(response => {
      return response.json(); // buildIn method for the reposnse object // returns a Promise - transforming from json to data takes time
    }).then(data => {
      const moviesWithCustomKeys = data.results.map(item => {
        return {
          id: item.episode_id,
          title:  item.title,
          releaseDate:  item.release_date,
          openingText:  item.opening_crawl,
        }
      });
      // updateMoviesList(data.results);
      setIsLoad(false);
      updateMoviesList(moviesWithCustomKeys);
    });
  };

  // ASYNC + AWAIT:
  // async function fetchMovies() {
  //   const response = await fetch('https://swapi.dev/api/films/');
  //   const data = await response.json();
  //   updateMoviesList(data.results);
  // }

  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && moviesList.length > 0 && <MoviesList movies={moviesList} />}
        {!isLoading && moviesList.length === 0 && <p>No items to display</p>}
        {isLoading &&  <p>Loading ... </p>}
      </section>
    </React.Fragment>
  );
}

export default App;
