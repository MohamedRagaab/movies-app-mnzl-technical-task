// MovieCard.tsx

import React, { useState } from 'react';
import './MovieCard.css';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

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
