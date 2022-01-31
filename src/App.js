import React, { useState } from "react";
import { useApolloClient, useQuery } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import Login from "./components/Login";
import NewBook from "./components/NewBook";
import { useEffect } from "react";
import Recommend from "./components/Recommend";
import { USER } from "./components/quaries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  const { data, loading } = useQuery(USER);

  useEffect(() => {
    const token = localStorage.getItem("library-user-token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (loading) return "Loading...";

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && (
          <>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={logout}>logout</button>
          </>
        )}
        {!token && <button onClick={() => setPage("login")}>login</button>}
      </div>

      <Authors token={token} show={page === "authors"} />

      <Recommend show={page === "recommend"} user={data.me} />

      <Login
        setToken={setToken}
        token={token}
        show={page === "login"}
        setPage={setPage}
      />

      <Books show={page === "books"} token={token} />

      <NewBook show={page === "add"} user={data.me} />
    </div>
  );
};

export default App;
