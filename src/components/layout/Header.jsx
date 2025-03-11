import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiFilmSpool } from "react-icons/gi";
import axiosTmdbApi from "../../utils/axios";
import SearchResults from "../common/SearchResults";
import SearchInput from "../common/SearchBar";
import { RxHamburgerMenu } from "react-icons/rx";
import { useAuthStore } from "../../stores/authStore";
import { IoLogOutOutline } from "react-icons/io5";

const Header = () => {
  const { user, logout } = useAuthStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const fetchMoviesBySearch = async () => {
    if (searchQuery.trim() === "" || searchQuery.length < 3) {
      setMovies([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axiosTmdbApi.get(`/search/movie?query=${searchQuery}`);
      setMovies(response.data.results.slice(0, 8));
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMoviesBySearch();
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const resetSearch = () => {
    setMovies([]);
    setSearchQuery("");
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Link to="/" className="flex items-center gap-3">
              <GiFilmSpool size={40} color="yellow" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Moovie Verse</span>
            </Link>
            {user && <IoLogOutOutline onClick={logout} color="yellow" size={25} className="cursor-pointer ml-3" />}
          </div>
          <div className="flex md:order-2">
            {/* Десктоп поиск */}
            <SearchInput value={searchQuery} onChange={handleSearchChange} className="hidden md:block" />

            {/* Кнопка бургер-меню */}
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <RxHamburgerMenu size={25} color="yellow" />
            </button>
          </div>

          {/* Мобильное меню */}
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              isMenuOpen ? "block" : "hidden"
            }`}
            id="navbar-search"
          >
            {/* Поиск для мобильных */}
            {isMenuOpen && <SearchInput value={searchQuery} onChange={handleSearchChange} className="mt-3 md:hidden" />}

            {/* Навигационное меню */}
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-gray-900 rounded-sm md:bg-transparent hover:md:text-yellow-400 md:p-0 md:dark:text-yellow-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/movies"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500 md:p-0 md:dark:hover:text-yellow-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500 md:p-0 md:dark:hover:text-yellow-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Wishlist
                </Link>
              </li>
              {!user && (
                <li>
                  <Link
                    to="/login"
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500 md:p-0 md:dark:hover:text-yellow-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {/* Search results */}
      {movies.length > 0 && (
        <div className="w-full md:absolute top-15 md:w-[300px] max-h-[400px] overflow-y-auto z-50 right-3 shadow-lg">
          <SearchResults resetSearch={resetSearch} movies={movies} />
        </div>
      )}
    </header>
  );
};

export default Header;
