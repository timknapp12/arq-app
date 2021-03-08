import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation AddUser($usernameIn: String!, $passwordIn: String!) {
    addUser(input: { usernameIn: $usernameIn, passwordIn: $passwordIn }) {
      user {
        userId
        birthDate
        companyName
        emailAddress
      }
    }
  }
`;
