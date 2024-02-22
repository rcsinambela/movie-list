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
    {
        imdbID: "tt1216475",
        Title: "Cars 2",
        Year: "2011",
        Poster: "https://m.media-amazon.com/images/M/MV5BMTUzNTc3MTU3M15BMl5BanBnXkFtZTcwMzIxNTc3NA@@._V1_FMjpg_UX1000_.jpg",
    },
    {
        imdbID: "tt1790864",
        Title: "The Maze Runner",
        Year: "2014",
        Poster: "https://m.media-amazon.com/images/M/MV5BMjUyNTA3MTAyM15BMl5BanBnXkFtZTgwOTEyMTkyMjE@._V1_FMjpg_UX1000_.jpg",
    },
    {
        imdbID: "tt8589698",
        Title: "Maze Runner: The Death Cure",
        Year: "2018",
        Poster: "https://m.media-amazon.com/images/M/MV5BMGNhZWRkMDQtMzU2Ni00MTE2LThhZjgtMTFlNTZhMDQ1YzI4XkEyXkFqcGdeQXVyNzU3Nzk4MDQ@._V1_FMjpg_UX1000_.jpg",
    },
    // {
    //     imdbID: "tt4046784",
    //     Title: "Maze Runner: The Scorch Trials",
    //     Year: "2015",
    //     Poster: "https://m.media-amazon.com/images/M/MV5BMjE3MDU2NzQyMl5BMl5BanBnXkFtZTgwMzQxMDQ3NTE@._V1_FMjpg_UX1000_.jpg",
    // },
    // {
    //     imdbID: "tt2560140",
    //     Title: "Attack on Titan",
    //     Year: "2013",
    //     Poster: "https://m.media-amazon.com/images/M/MV5BNDFjYTIxMjctYTQ2ZC00OGQ4LWE3OGYtNDdiMzNiNDZlMDAwXkEyXkFqcGdeQXVyNzI3NjY3NjQ@._V1_FMjpg_UX1000_.jpg",
    // },
    // {
    //     imdbID: "tt21209876",
    //     Title: "Ore dake Level Up na Ken",
    //     Year: "2024",
    //     Poster: "https://m.media-amazon.com/images/M/MV5BODJkZTM3MWYtOTkxNS00YWUxLTg5NjAtOTk4ZWM5MTBmMzAyXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg",
    // },
    // {
    //     imdbID: "tt12409194",
    //     Title: "Battle Through the Heavens",
    //     Year: "2017",
    //     Poster: "https://m.media-amazon.com/images/M/MV5BOThhZjM4NjctZTVkMy00MjBkLTkwNGUtNzFkMTZjZTUwYzE2XkEyXkFqcGdeQXVyNTY4MjkyOTk@._V1_FMjpg_UX1000_.jpg",
    // },
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
function BoxMovies({ element }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? "–" : "+"}
            </button>
            {isOpen && element}
        </div>
    );
}

function Main({ children }) {
    return <main className="main">{children}</main>;
}
export default function App() {
    const [watched, setWatched] = useState(tempWatchedData);
    const [movies, setMovies] = useState(tempMovieData);
    return (
        <>
            <NavBar>
                <Logo />
                <Search />
                <NumResults movies={movies} />
            </NavBar>
            <Main>
                <BoxMovies element={<MovieList movies={movies} />} />
                <BoxMovies
                    element={
                        <>
                            <WatchedList watched={watched} />
                            <WatchedSummary watched={watched} />
                        </>
                    }
                />
            </Main>
        </>
    );
}
