import React, { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS, BOOKS_BY_GENRE } from "./quaries";
import { Button, Container, Text, TextInput } from "@mantine/core";

const NewBook = ({ show, user, updateCacheWith }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [allBooks] = useLazyQuery(BOOKS_BY_GENRE);

  const [newBook] = useMutation(ADD_BOOK, {
    onError: (error) => {
      console.log(error);
    },
    update: (store, response) => {
      allBooks({ variables: { genre: user.favoriteGenre } });
      updateCacheWith(response.data.addBook);
    },
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  });

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();
    const publishedToInt = parseInt(published);
    newBook({
      variables: { title, author, published: publishedToInt, genres },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <TextInput
          label="Title"
          description="Book title"
          required
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <TextInput
          label="Author"
          description="Author name"
          required
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <TextInput
          label="Published"
          description="Publish date"
          type="number"
          value={published}
          onChange={({ target }) => setPublished(target.value)}
        />
        <TextInput
          label="Genres"
          description="Genre type"
          value={genre}
          onChange={({ target }) => setGenre(target.value)}
        />
        <Button
          color="lime"
          style={{ margin: "1rem 0" }}
          onClick={addGenre}
          type="button"
        >
          Add genre
        </Button>
        <Text>Genres: {genres.join(" ")}</Text>
        <Button color="teal" style={{ margin: "1rem 0" }} type="submit">
          Create book
        </Button>
      </form>
    </div>
  );
};

export default NewBook;
