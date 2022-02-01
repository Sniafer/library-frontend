import { useLazyQuery } from "@apollo/client";
import { Group, Paper, Text, Title } from "@mantine/core";
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

  if (user)
    return (
      <div>
        <Title order={1}>Recommendations</Title>
        {user.favoriteGenre && (
          <Text>
            books in your favorite genre{" "}
            <span style={{ fontWeight: "bold" }}>{user.favoriteGenre}</span>
          </Text>
        )}
        {/* <table>
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
        </table> */}
        {books.map((a) => (
          <Paper
            padding="md"
            shadow="xs"
            withBorder
            style={{ marginTop: "1rem" }}
            key={a.name}
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
      </div>
    );
};

export default Recommend;
