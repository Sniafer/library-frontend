import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "./quaries";
import { useState } from "react";
import { Button, Group, Paper, Text, Title } from "@mantine/core";

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
      <Title order={1}>Books</Title>
      <Text>
        in genre <span style={{ fontWeight: "bold" }}>{currentGenre}</span>
      </Text>
      {currentGenre === "all genres"
        ? books.map((a) => (
            <Paper
              padding="md"
              shadow="xs"
              withBorder
              style={{ marginTop: "1rem" }}
              key={a.title}
            >
              <Group grow spacing="xl">
                <Group direction="column">
                  <Text color="Gray" size="xs">
                    Title:
                  </Text>
                  <Text size="xl">{a.title}</Text>
                </Group>
                <Group direction="column">
                  <Text color="Gray" size="xs">
                    Author:
                  </Text>
                  <Text size="xl">{a.author.name}</Text>
                </Group>
                <Group direction="column">
                  <Text color="Gray" size="xs">
                    Published:
                  </Text>
                  <Text size="xl">{a.published}</Text>
                </Group>
              </Group>
            </Paper>
          ))
        : filteredBooks.map((a) => (
            <Paper
              padding="md"
              shadow="xs"
              withBorder
              style={{ marginTop: "1rem" }}
              key={a.title}
            >
              <Group grow spacing="xl">
                <Group direction="column">
                  <Text color="Gray" size="xs">
                    Title:
                  </Text>
                  <Text size="xl">{a.title}</Text>
                </Group>
                <Group direction="column">
                  <Text color="Gray" size="xs">
                    Author:
                  </Text>
                  <Text size="xl">{a.author.name}</Text>
                </Group>
                <Group direction="column">
                  <Text color="Gray" size="xs">
                    Published:
                  </Text>
                  <Text size="xl">{a.published}</Text>
                </Group>
              </Group>
            </Paper>
          ))}
      <div style={{ margin: "3rem 0" }}>
        <Title style={{ marginBottom: "1rem" }} order={2}>
          Genres
        </Title>
        {unique.map((genre) => (
          <Button
            style={{ marginRight: "1rem" }}
            key={genre}
            onClick={() => setCurrentGenre(genre)}
          >
            {genre}
          </Button>
        ))}
        <Button color="teal" onClick={() => setCurrentGenre("all genres")}>
          all
        </Button>
      </div>
    </div>
  );
};

export default Books;
