import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_GAME = gql`
  mutation saveGame($gameToSave: GameInput!) {
    saveGame (gameToSave: $gameToSave) {
      _id
      username
      email
      savedGames {
        name
        background_image
        gameId
      }
    }
  }
`;

export const WISHLIST_GAME = gql`
  mutation wishlist($gameToSave: GameInput!) {
    wishlist (gameToSave: $gameToSave) {
      _id
      username
      email
      wishlistGames {
        name
        background_image
        gameId
      }
    }
  }
`;

export const PLAYED_GAME = gql`
  mutation played($gameToSave: GameInput!) {
    played (gameToSave: $gameToSave) {
      _id
      username
      email
      playedGames {
        name
        background_image
        gameId
      }
    }
  }
`;

export const Delete_GAME = gql`
  mutation deleteGame($gameId: String!) {
    deleteGame (gameId: $gameId) {
      _id
      username
      email
      savedGames {
        name
        background_image
        gameId
      }
    }
  }
`;

export const Delete_WISHLISTGAME = gql`
  mutation deleteWishlistGame($gameId: String!) {
    deleteWishlistGame (gameId: $gameId) {
      _id
      username
      email
      wishlistGames {
        name
        background_image
        gameId
      }
    }
  }
`;

export const Delete_PLAYEDGAME = gql`
  mutation deletePlayedGame($gameId: String!) {
    deletePlayedGame (gameId: $gameId) {
      _id
      username
      email
      playedGames {
        name
        background_image
        gameId
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friends {
        _id
        username
      }
    }
  }
`;

