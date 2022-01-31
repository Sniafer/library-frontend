import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "./quaries";

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

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token && (
        <div>
          <h2>set birthyear</h2>
          <form onSubmit={submit}>
            <select
              defaultValue="default"
              name="name"
              onChange={({ target }) => setName(target.value)}
            >
              <option value="default" disabled hidden>
                Select...
              </option>
              {authors.map((author) => (
                <option key={author.name} value={author.name}>
                  {author.name}
                </option>
              ))}
            </select>
            <input
              name="born"
              type="number"
              onChange={({ target }) => setBorn(target.value)}
            />
            <button>update author</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Authors;
