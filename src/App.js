import React, { useState, useEffect } from "react";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";

import { useNotifications } from "@mantine/notifications";

import Authors from "./components/Authors";
import Books from "./components/Books";
import Login from "./components/Login";
import NewBook from "./components/NewBook";
import Recommend from "./components/Recommend";
import { ALL_BOOKS, BOOK_ADDED, USER } from "./components/quaries";
import { Button, Container, Group } from "@mantine/core";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  const { loading, data, refetch } = useQuery(USER);

  useEffect(() => {
    const token = localStorage.getItem("library-user-token");
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [token]); // eslint-disable-line

  const notifications = useNotifications();

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      notifications.showNotification({
        title: "New book added",
        message: addedBook.title + " by " + addedBook.author.name,
        autoClose: 5000,
      });
      updateCacheWith(addedBook);
    },
  });

  if (loading) return "Loading...";

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };

  return (
    <div>
      <Group>
        <Button onClick={() => setPage("authors")}>Authors</Button>
        <Button onClick={() => setPage("books")}>Books</Button>
        {token && (
          <>
            <Button onClick={() => setPage("recommend")}>Recommend</Button>
            <Button color="teal" onClick={() => setPage("add")}>
              Add book
            </Button>
            <Button color="red" onClick={logout}>
              Logout
            </Button>
          </>
        )}
        {!token && (
          <Button color="cyan" onClick={() => setPage("login")}>
            Login
          </Button>
        )}
      </Group>
      <Container size={"100%"} style={{ marginTop: "3rem" }}>
        <Authors token={token} show={page === "authors"} />

        <Recommend show={page === "recommend"} user={data.me} />

        <Login
          setToken={setToken}
          token={token}
          show={page === "login"}
          setPage={setPage}
        />

        <Books show={page === "books"} token={token} />

        <NewBook
          show={page === "add"}
          user={data.me}
          updateCacheWith={updateCacheWith}
        />
      </Container>
    </div>
  );
};

export default App;
