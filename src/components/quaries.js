import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    AllAuthors {
      name
      born
      bookCount
    }
  }
`;

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    genres
    author {
      name
      born
    }
    published
  }
`;

// export const ALL_BOOKS = gql`
//   query {
//     allBooks {
//       title
//       genres
//       author {
//         name
//         born
//       }
//       published
//     }
//   }
// `;

export const ALL_BOOKS = gql`
  {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;

export const BOOKS_BY_GENRE = gql`
  query booksByGenre($genre: String!) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const ADD_BOOK = gql`
  mutation newBook(
    $title: String!
    $author: String!
    $published: Int
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
