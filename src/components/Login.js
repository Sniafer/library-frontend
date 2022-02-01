import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "./quaries";
import { Button, TextInput } from "@mantine/core";

const Login = ({ setToken, token, show, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
      setPage("authors");
    }
  }, [result.data]); // eslint-disable-line

  if (!show) {
    return null;
  }
  if (result.loading) {
    return <div>loading...</div>;
  }

  const submit = async (event) => {
    event.preventDefault();

    login({ variables: { username, password } });
  };

  return (
    <div>
      {!token ? (
        <form onSubmit={submit}>
          <div>
            <TextInput
              label="Username"
              required
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <TextInput
              label="Password"
              required
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <Button color="cyan" style={{ marginTop: "1rem" }} type="submit">
            Login
          </Button>
        </form>
      ) : (
        <h3>Logged-in</h3>
      )}
    </div>
  );
};

export default Login;
