// MovieCard.tsx

import React, { useEffect, useState } from 'react';
import './MovieCard.css';
import API from '../API';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string;
  isFavorite: boolean;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  console.log(movie);

  const addToFavorites = async (id: number) => {
    try {
      await API.addFavorite({
        movieId: id
      });
    } catch (error) {
      console.error('Error setting data:', error);
    }
  };

  const removeFromFavorites = async (id: number) => {
    try {
      await API.removeFavorite({
        movieId: id
      });
    } catch (error) {
      console.error('Error setting data:', error);
    }
  };

  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = async () => {
    setIsFavorite(!isFavorite);
    if(!isFavorite) {
      await addToFavorites(movie.id);
    } else {
      await removeFromFavorites(movie.id);
    }
  };

  useEffect(() => {
    if(movie.isFavorite) {
      setIsFavorite(true);
    }
  }, [movie.isFavorite]);

  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="movie-poster"
      />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{'Released ' + movie.release_date}</p>
        <button onClick={toggleFavorite} className="favorite-button">
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
