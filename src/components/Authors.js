import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "./quaries";
import {
  Button,
  Group,
  Input,
  Paper,
  Select,
  Text,
  Title,
} from "@mantine/core";

const Authors = (props) => {
  const [born, setBorn] = useState("");
  const [name, setName] = useState("");

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error);
    },
  });

  const result = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }
  if (result.loading) {
    return <div>loading...</div>;
  }
  const authors = result.data.AllAuthors;

  const submit = (event) => {
    event.preventDefault();
    const bornToInt = parseInt(born);
    updateAuthor({
      variables: { name, born: bornToInt },
    });
  };

  const selectData = authors.map((author) => {
    return { value: author.name, label: author.name };
  });

  return (
    <div>
      <Title order={1}>Authors</Title>
      <div>
        {authors.map((a) => (
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
                  Name:
                </Text>
                <Text size="xl">{a.name}</Text>
              </Group>
              <Group direction="column">
                <Text color="Gray" size="xs">
                  Born:
                </Text>
                <Text size="xl">{a.born}</Text>
              </Group>
              <Group direction="column">
                <Text color="Gray" size="xs">
                  Books:
                </Text>
                <Text size="xl">{a.bookCount}</Text>
              </Group>
            </Group>
          </Paper>
        ))}
      </div>
      {props.token && (
        <div style={{ marginTop: "3rem", marginBottom: "3rem" }}>
          <Title order={2}>Set birthyear</Title>
          <form style={{ marginTop: "1rem" }} onSubmit={submit}>
            <Group>
              <Select
                placeholder="Select..."
                onChange={setName}
                data={selectData}
              />
              <Input
                name="born"
                placeholder="Birth date"
                type="number"
                onChange={({ target }) => setBorn(target.value)}
              />
              <Button type="submit" color="teal" style={{ marginLeft: "1rem" }}>
                Update author
              </Button>
            </Group>
          </form>
        </div>
      )}
    </div>
  );
};

export default Authors;
