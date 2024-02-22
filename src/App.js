import { useEffect, useState } from "react";

const tempWatchedData = [
    {
        imdbID: "tt15398776",
        Title: "Oppenheimer",
        Year: "2013",
        Poster: "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg",
        runtime: 180,
        imdbRating: 8.6,
        userRating: 10,
    },
    {
        imdbID: "tt1517268",
        Title: "Barbie",
        Year: "2023",
        Poster: "https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
        runtime: 114,
        imdbRating: 7.2,
        userRating: 8,
    },
];

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

function MovieList({ movies }) {
    return (
        <ul className="list">
            {movies?.map((movie) => (
                <MovieItem key={movie.imdbID} movie={movie} />
            ))}
        </ul>
    );
}

function MovieItem({ movie }) {
    return (
        <li key={movie.imdbID}>
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
    const [watched, setWatched] = useState(tempWatchedData);
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("hitler");
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
                    {!isLoading && !error && <MovieList movies={movies} />}
                </BoxMovies>
                <BoxMovies>
                    <WatchedList watched={watched} />
                    <WatchedSummary watched={watched} />
                </BoxMovies>
            </Main>
        </>
    );
}
