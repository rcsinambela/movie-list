import { useState } from "react";

const tempMovieData = [
    {
        imdbID: "tt15398776",
        Title: "Oppenheimer",
        Year: "2013",
        Poster: "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg",
    },
    {
        imdbID: "tt1517268",
        Title: "Barbie",
        Year: "2023",
        Poster: "https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
    },
    {
        imdbID: "tt8589698",
        Title: "Teenage Mutant Ninja Turtles: Mutant Mayhem",
        Year: "2023",
        Poster: "https://m.media-amazon.com/images/M/MV5BYzE4MTllZTktMTIyZS00Yzg1LTg1YzAtMWQwZTZkNjNkODNjXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg",
    },
];

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

function Search() {
    const [query, setQuery] = useState("");

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

function NumResults() {
    return (
        <p className="num-results">
            Found <strong>x</strong> results
        </p>
    );
}

function NavBar() {
    return (
        <nav className="nav-bar">
            <Logo />
            <Search />
            <NumResults />
        </nav>
    );
}

function MovieList() {
    const [isOpen1, setIsOpen1] = useState(true);
    const [movies, setMovies] = useState(tempMovieData);

    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen1((open) => !open)}
            >
                {isOpen1 ? "–" : "+"}
            </button>
            {isOpen1 && (
                <ul className="list">
                    {movies?.map((movie) => (
                        <li key={movie.imdbID}>
                            <img
                                src={movie.Poster}
                                alt={`${movie.Title} poster`}
                            />
                            <h3>{movie.Title}</h3>
                            <div>
                                <p>
                                    <span>📅</span>
                                    <span>{movie.Year}</span>
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function WatchedList() {
    const [isOpen2, setIsOpen2] = useState(true);
    const [watched, setWatched] = useState(tempWatchedData);

    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));
    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen2((open) => !open)}
            >
                {isOpen2 ? "–" : "+"}
            </button>
            {isOpen2 && (
                <>
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

                    <ul className="list">
                        {watched.map((movie) => (
                            <li key={movie.imdbID}>
                                <img
                                    src={movie.Poster}
                                    alt={`${movie.Title} poster`}
                                />
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
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

function Main() {
    return (
        <main className="main">
            <MovieList />
            <WatchedList />
        </main>
    );
}
export default function App() {
    return (
        <>
            <NavBar />
            <Main />
        </>
    );
}
