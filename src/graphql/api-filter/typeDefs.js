import { gql } from 'apollo-server';

export const apiFiltersTypeDefs = gql`
  input ApiFiltersInput {
    # Cannot be mandatory fields unless you need the user in frontend to send these data
    _sort: String
    _order: ApiFiltersOrder
    _start: Int
    _limit: Int
  }

  enum ApiFiltersOrder {
    ASC
    DESC
  }
`;
