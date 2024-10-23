import { gql } from "generated/gql";

export const getTriples = gql(/* GraphQL */ `
query GetTriples($predicateId: numeric!, $objectId: numeric!) {
  triples(
    where: { predicateId: { _eq: $predicateId }, objectId: { _eq: $objectId } }
    order_by: [
      { vault: { positionCount: desc }, counterVault: { positionCount: desc } }
    ]
  ) {
    id
    label
    vault {
      positionCount
    }
    counterVault {
      positionCount
    }
  }
}
`);

export const getTriplesWithMyPosition = gql(/* GraphQL */ `
query GetTriplesWithMyPosition($predicateId: numeric!, $objectId: numeric!, $address: String) {
  triples(
    where: { predicateId: { _eq: $predicateId }, objectId: { _eq: $objectId } }
    order_by: [
      { vault: { positionCount: desc }, counterVault: { positionCount: desc } }
    ]
  ) {
    id
    label
    vault {
      positionCount
      myPosition: positions(
        limit: 1
        where: { accountId: { _eq: $address } }
      ) {
        shares
      }
    }
    counterVault {
      positionCount
      myPosition: positions(
        limit: 1
        where: { accountId: { _eq: $address } }
      ) {
        shares
      }
    }
  }
}
`);
