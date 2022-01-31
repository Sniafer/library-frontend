import { useLazyQuery } from "@apollo/client";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { BOOKS_BY_GENRE } from "./quaries";

const Recommend = ({ show, user }) => {
  const [books, setBooks] = useState([]);
  const [allBooks, result] = useLazyQuery(BOOKS_BY_GENRE);

  useEffect(() => {
    if (user) {
      allBooks({ variables: { genre: user.favoriteGenre } });
    }
  }, [user]); // eslint-disable-line

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [result]);

  if (!show) {
    return null;
  }

  if (result.loading) return "Loading...";

  return (
    <div>
      <h2>recommendations</h2>
      {user.favoriteGenre && (
        <p>
          books in your favorite genre <span>{user.favoriteGenre}</span>
        </p>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
