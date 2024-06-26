import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import './HomePage.css';
import API from '../API';

const apiKey = '0a0a30f49d11b31d1786e9d75b730d98';
const baseUrl = 'https://api.themoviedb.org/3';
interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string;
  isFavorite: boolean;
}

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [language, setLanguage] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchFavoritesIds = async () => {
    try {
      const favoritesIds = await API.getFavoritesIds();
      const ids = favoritesIds.data.data.map((f: any) => {
        return f.movieId;
      });

      return ids;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchMovies = async (url: string) => {
    try {
      const response = await axios.get<{ results: Movie[]; total_pages: number }>(url);
      const ids = await fetchFavoritesIds();
      const formattedMovies = response.data.results.map((m: Movie) => {
        const favoriteId = ids.find((id: any) => id == m.id);
        m.isFavorite = favoriteId ? true : false;
        return m;
      });
      setMovies(formattedMovies);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const discoverUrl = `${baseUrl}/discover/movie?include_video=false&include_adult=false&&page=${currentPage}&api_key=${apiKey}`;
    fetchMovies(discoverUrl);
  }, [currentPage]);

  useEffect(() => {
    if (searchQuery && searchQuery !== '') {
      const searchUrl = `${baseUrl}/search/movie?api_key=${apiKey}&page=${currentPage}${searchQuery ? `&query=${searchQuery}` : ''}${language ? `&language=${language}` : ''}${year ? `&year=${year}` : ''}&include_adult=false`;
      fetchMovies(searchUrl);
    } else {
      const discoverUrl = `${baseUrl}/discover/movie?include_video=false&include_adult=false&&page=${currentPage}${language ? `&language=${language}` : ''}${year ? `&year=${year}` : ''}&api_key=${apiKey}`;
      fetchMovies(discoverUrl);
    }
  }, [searchQuery, language, currentPage, year]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setCurrentPage(1); // Reset page to 1 when performing a new search
  };

  const handlePagination = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleClear = () => {
    setSearchQuery('');
    setLanguage('');
    setYear('');
  };

  const renderPagination = () => {
    const paginationRange: (number | string)[] = [];
    const totalNumbers = 5;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      paginationRange.push(1);

      if (startPage > 2) {
        paginationRange.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        paginationRange.push(i);
      }

      if (endPage < totalPages - 1) {
        paginationRange.push('...');
      }

      paginationRange.push(totalPages);
    } else {
      for (let i = 1; i <= totalPages; i++) {
        paginationRange.push(i);
      }
    }

    return paginationRange.map((page, index) =>
      page === '...' ? (
        <span key={index}>...</span>
      ) : (
        <button
          key={index}
          onClick={() => handlePagination(page as number)}
          className={page === currentPage ? 'active' : ''}
        >
          {page}
        </button>
      )
    );
  };

  return (
    <div className="home-page">
      <div className="search-header">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="">All Languages</option>
          <option value="en-US">English</option>
          <option value="ar">Arabic</option>
          <option value="fr">French</option>
        </select>
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button type="button" onClick={handleClear}>Clear</button>
      </form>
      </div>

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => handlePagination(currentPage - 1)} disabled={currentPage === 1}>
          &lt;
        </button>
        {renderPagination()}
        <button onClick={() => handlePagination(currentPage + 1)} disabled={currentPage === totalPages}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default HomePage;
