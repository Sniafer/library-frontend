import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "./quaries";
import { useState } from "react";

const Books = (props) => {
  const [currentGenre, setCurrentGenre] = useState("all genres");

  const result = useQuery(ALL_BOOKS);
  if (!props.show) {
    return null;
  }
  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

  const genres = books.map((book) => book.genres).flat();

  const unique = [...new Set(genres)];

  const filteredBooks = books.filter((book) =>
    book.genres.includes(currentGenre)
  );

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <span style={{ fontWeight: "bold" }}>{currentGenre}</span>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {currentGenre === "all genres"
            ? books.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))
            : filteredBooks.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
        </tbody>
      </table>
      <div>
        <h3>genres</h3>
        {unique.map((genre) => (
          <button key={genre} onClick={() => setCurrentGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setCurrentGenre("all genres")}>all</button>
      </div>
    </div>
  );
};

export default Books;
