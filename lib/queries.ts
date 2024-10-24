import {gql} from 'generated/gql';

export const getTriplesWithMyPosition = gql(/* GraphQL */ `
  query GetTriplesWithMyPosition($predicateId: numeric!, $subjectId: numeric!, $address: String) {
    triples(
      where: {predicateId: {_eq: $predicateId}, subjectId: {_eq: $subjectId}}
      order_by: [{vault: {positionCount: desc}, counterVault: {positionCount: desc}}]
    ) {
      id
      label
      object {
        label
        value {
          thing {
            name
            description
          }
        }
      }
      vault {
        id
        positionCount
        positions(limit: 10, where: {accountId: {_neq: $address}}) {
          accountId
          account {
            image
            label
          }
        }
        myPosition: positions(limit: 1, where: {accountId: {_eq: $address}}) {
          shares
          accountId
          account {
            image
            label
          }
        }
      }
      counterVault {
        id
        positionCount
        positions(limit: 10, where: {accountId: {_neq: $address}}) {
          accountId
          account {
            image
            label
          }
        }
        myPosition: positions(limit: 1, where: {accountId: {_eq: $address}}) {
          shares
          accountId
          account {
            image
            label
          }
        }
      }
    }
  }
`);
