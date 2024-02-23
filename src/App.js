import { useEffect, useState } from "react";
import StarRating from "./StarRating";

const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Logo() {
    return (
        <div className="logo">
            <span role="img">🎫</span>
            <h1>Movie</h1>
        </div>
    );
}

function Search({ query, setQuery }) {
    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    );
}

function NumResults({ movies }) {
    return (
        <p className="num-results">
            Found <strong>{movies?.length}</strong> results
        </p>
    );
}

function NavBar({ children }) {
    return <nav className="nav-bar">{children}</nav>;
}

function MovieList({ movies, onSelectedMovie }) {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <MovieItem
                    key={movie.imdbID}
                    movie={movie}
                    onSelectedMovie={onSelectedMovie}
                />
            ))}
        </ul>
    );
}

function MovieItem({ movie, onSelectedMovie }) {
    return (
        <li key={movie.imdbID} onClick={() => onSelectedMovie(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>📅</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    );
}
function WatchedSummary({ watched }) {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));

    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                </p>
                <p>
                    <span>🎬</span>
                    <span>{avgImdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                </p>
            </div>
        </div>
    );
}

function WatchedList({ watched }) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedListItem key={movie.imdbID} movie={movie} />
            ))}
        </ul>
    );
}

function WatchedListItem({ movie }) {
    return (
        <li key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🎬</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                </p>
            </div>
        </li>
    );
}
function BoxMovies({ children }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? "–" : "+"}
            </button>
            {isOpen && children}
        </div>
    );
}

function MovieDetails({ selectedId, onCloseMovie }) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const {
        Title: title,
        Year: year,
        Poster: poster,
        imdbRating,
        Runtime: runtime,
        Plot: plot,
        Genre: genre,
        Actors: actors,
        Director: director,
        Released: released,
    } = movie;
    console.log(title, year);
    useEffect(() => {
        setIsLoading(true);
        async function getMovieDetails() {
            const response = await fetch(
                `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
            );
            const data = await response.json();
            setMovie(data);
            setIsLoading(false);
        }
        getMovieDetails();
    }, [selectedId]);
    return (
        <div className="details">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>
                            &#x2715;
                        </button>
                        <img src={poster} alt={title} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>
                                <span>📅</span>
                                <span>{released}</span>
                            </p>
                            <p>
                                <span>⌛</span>
                                <span>{runtime}</span>
                            </p>
                            <p>
                                <span>⭐</span>
                                <span>{imdbRating}</span>
                            </p>
                        </div>
                    </header>
                    <section>
                        <h3>Plot</h3>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <h3>Genre</h3>
                        <p>{genre}</p>
                        <h3>Actors</h3>
                        <p>{actors}</p>
                        <h3>Director</h3>
                        <p>{director}</p>
                        <div className="rating">
                            <StarRating max={5} color="#ffa534" size={20} />
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}

function Main({ children }) {
    return <main className="main">{children}</main>;
}

function Loader() {
    return (
        <div className="loader">
            <div className="loading-bar">
                <div className="bar"></div>
            </div>
        </div>
    );
}

function ErrorMessage({ message }) {
    return (
        <div className="error">
            <span>⛔</span> {message}
        </div>
    );
}
const API_KEY = "41b5eb3";

export default function App() {
    const [watched, setWatched] = useState();
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("hitler");
    const [selectedMovieId, setSelectedMovieId] = useState(null);

    function handleSelectedMovieId(id) {
        setSelectedMovieId((selectedId) => (selectedId === id ? null : id));
    }

    function handleCloseMovie() {
        setSelectedMovieId(null);
    }

    function handleAddWatched(movie) {
        r;
    }
    /**
     * useEffect hook that fetches movie data from an API and sets the retrieved data to the state.
     * @returns None
     */
    useEffect(() => {
        async function fetchMovie() {
            try {
                setIsLoading(true);
                setError("");
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
                );

                if (!res.ok) throw new Error("Something went Error");

                const data = await res.json();

                if (data.Response === "False") throw new Error(data.Error);

                setMovies(data.Search);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
        }
        fetchMovie();
    }, [query]);
    return (
        <>
            <NavBar>
                <Logo />
                <Search query={query} setQuery={setQuery} />
                <NumResults movies={movies} />
            </NavBar>
            <Main>
                <BoxMovies>
                    {isLoading && <Loader />}
                    {error && <ErrorMessage message={error} />}
                    {!isLoading && !error && (
                        <MovieList
                            movies={movies}
                            onSelectedMovie={handleSelectedMovieId}
                        />
                    )}
                </BoxMovies>
                <BoxMovies>
                    {selectedMovieId ? (
                        <MovieDetails
                            selectedId={selectedMovieId}
                            onCloseMovie={handleCloseMovie}
                        />
                    ) : (
                        <>
                            <WatchedList watched={watched} />
                            <WatchedSummary watched={watched} />
                        </>
                    )}
                </BoxMovies>
            </Main>
        </>
    );
}
