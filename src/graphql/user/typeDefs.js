import { gql } from 'apollo-server';

export const userTypeDefs = gql`
  extend type Query {
    user(id: ID!): User!
    users(input: ApiFiltersInput): [User!]!
  }

  extend type Mutation {
    createUser(body: CreateUserInput): User!
    updateUser(userId: ID!, body: UpdateUserInput): User!
    deleteUser(userId: ID!): Boolean
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    userName: String!
    indexRef: Int!
    createdAt: String!
    posts: [Post!]!
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    userName: String!
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
    userName: String
  }
`;
