import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const ActorPage = () => {
  const [query, setQuery] = useState('');
  const [actorId, setActorId] = useState('');
  const [actorName, setActorName] = useState('');
  const [credits, setCredits] = useState([]);

  const getCredits = () => {
    const url =
      'https://api.themoviedb.org/3/person/' +
      actorId +
      '/movie_credits?api_key=f7d8053162528c8cf06e6a45f4799108';

    axios
      .get(url)
      .then((res) => {
        console.log(res.data.cast);
        setCredits(res.data.cast);
      })
      .catch((err2) => {
        console.log(err2);
      });
  };

  useEffect(() => {
    if (actorId) {
      getCredits();
    }
  }, [actorId]);

  const handleSearch = (e) => {
    e.preventDefault();
    const url =
      'https://api.themoviedb.org/3/search/person?api_key=f7d8053162528c8cf06e6a45f4799108&query=' +
      query;
    axios
      .get(url)
      .then((res) => {
        setActorId(res.data.results[0].id);
        setActorName(res.data.results[0].name);
      })
      .catch((err) => {
        console.log(err);
      });
    setQuery('');
  };

  return (
    <div className="ActorPage">
      <h2>Actor Search</h2>
      <form onSubmit={handleSearch}>
        <label className="SearchPage-label">Search Actor:</label>
        <input
          type="text"
          required
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="ActorPage-input"
        />
        <button type="submit">Search Actor</button>
      </form>

      {actorName && <h1>{actorName} Movies</h1>}

      <div className="container">
        <div className="row">
          {credits.map((item, index) => (
            <div key={index} className="col-6 col-md-4 col-lg-2 mb-4">
              <div className="card" style={{ width: '100%' }}>
                <img
                  src={'https://image.tmdb.org/t/p/original/' + item.poster_path}
                  className="card-img-top"
                  alt={item.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.character}</p>
                  <p className="card-text">{item.release_date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActorPage;
