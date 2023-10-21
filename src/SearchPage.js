import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [movieId, setMovieId] = useState('');
  const [cast, setCast] = useState([]);

  const getCast = () => {
    const getCasturl =
      'https://api.themoviedb.org/3/movie/' +
      movieId +
      '/credits?api_key=f7d8053162528c8cf06e6a45f4799108';
    axios
      .get(getCasturl)
      .then((result) => {
        console.log(result.data.cast);
        setCast(result.data.cast);
      })
      .catch((err2) => {
        console.log(err2);
      });
  };

  useEffect(() => {
    if (movieId) {
      getCast();
    }
  }, [movieId]);

  const handleSearch = (e) => {
    e.preventDefault();
    const url =
      'https://api.themoviedb.org/3/search/movie?api_key=f7d8053162528c8cf06e6a45f4799108&query=' +
      query;
    axios
      .get(url)
      .then((res) => {
        setMovieId(res.data.results[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
    setQuery('');
  };

  return (
    <div className="SearchPage">
      <header>
        <h1>Search Page</h1>
      </header>
      <form onSubmit={handleSearch}>
        <label className="SearchPage-label">Search Movie:</label>
        <input
          type="text"
          required
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="SearchPage-input"
        />
        <button type="submit" onClick={handleSearch}>
          Search Movie
        </button>
      </form>
      {movieId && <p>{movieId}</p>}
      <h1>Cast</h1>
      <div className="container">
        <div className="row">
          {cast.map((item, index) => (
            <div key={index} className="col-6 col-md-4 col-lg-2 mb-4">
              <div className="card" style={{ width: '100%' }}>
                <img
                  src={'https://image.tmdb.org/t/p/original/' + item.profile_path}
                  className="card-img-top"
                  alt={item.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.character}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
