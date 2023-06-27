import { gql } from '@apollo/client';

export const GET_FILM = gql`
  query Film {
    allFilms {
      films {
        id
        title
        director
        releaseDate
      }
    }
  }
`;

export const GET_FILM_BY_ID = gql`
  query filmById($filmId: ID) {
    film(id: $filmId) {
      title
      openingCrawl
    }
  }
`;
