import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const CastPage = () => {
  const [query, setQuery] = useState('');
  const [actorInfo, setActorInfo] = useState([]);
  const [commonCredits, setCommonCredits] = useState([]);

  const getCredits = (id) => {
    const url = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=f7d8053162528c8cf06e6a45f4799108`;
    return axios
      .get(url)
      .then((res) => res.data.cast)
      .catch((err) => console.log(err));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const url =
      'https://api.themoviedb.org/3/search/person?api_key=f7d8053162528c8cf06e6a45f4799108&query=' +
      query;
    axios
      .get(url)
      .then((res) => {
        const id = res.data.results[0].id;
        const name = res.data.results[0].name;
        const profile_path = res.data.results[0].profile_path
          ? 'https://image.tmdb.org/t/p/w500/' + res.data.results[0].profile_path
          : 'https://www.placecage.com/200/300'; // Placeholder image if profile_path is not available

        return getCredits(id)
          .then((credits) => {
            const actor = {
              id,
              name,
              profile_path,
              credits,
            };
            setActorInfo([...actorInfo, actor]);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
    setQuery('');
  };

  const getCommonCredits = () => {
    const allCredits = actorInfo.map((actor) => actor.credits);
    const commonCredits = allCredits.reduce((prev, current) => {
      return prev.filter((credit) => current.some((item) => item.id === credit.id));
    });
    console.log(commonCredits);
    setCommonCredits(commonCredits);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label className="SearchPage-label">Search Actor:</label>
        <input
          type="text"
          required
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="SearchPage-input"
        />
        <button type="submit">Submit</button>
      </form>
      <div className="container">
        <div className="row">
          {actorInfo.map((item, index) => (
            <div key={index} className="col-6 col-md-4 col-lg-2 mb-4">
              <div className="card" style={{ width: '100%' }}>
                <img src={item.profile_path} className="card-img-top" alt={item.name} />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {actorInfo.length > 0 && (
        <button type="button" onClick={getCommonCredits}>
          Get Common Credits
        </button>
      )}
      <div className="container">
        <div className="row">
          {commonCredits.map((item, index) => (
            <div key={index} className="col-6 col-md-4 col-lg-2 mb-4">
              <div className="card" style={{ width: '100%' }}>
                <img
                  src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                  className="card-img-top"
                  alt={item.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
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

export default CastPage;
