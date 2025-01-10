/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  query GetTriplesWithMyPosition($predicateId: numeric!, $subjectId: numeric!, $address: String) {\n    triples(\n      where: {predicate_id: {_eq: $predicateId}, subject_id: {_eq: $subjectId}}\n      order_by: [{vault: {position_count: desc}, counter_vault: {position_count: desc}}]\n    ) {\n      id\n      object {\n        label\n        value {\n          thing {\n            name\n            description\n          }\n        }\n      }\n      vault {\n        id\n        position_count\n        positions(limit: 10, where: {account_id: {_neq: $address}}) {\n          account_id\n          account {\n            image\n            label\n          }\n        }\n        myPosition: positions(limit: 1, where: {account_id: {_eq: $address}}) {\n          shares\n          account_id\n          account {\n            image\n            label\n          }\n        }\n      }\n      counter_vault {\n        id\n        position_count\n        positions(limit: 10, where: {account_id: {_neq: $address}}) {\n          account_id\n          account {\n            image\n            label\n          }\n        }\n        myPosition: positions(limit: 1, where: {account_id: {_eq: $address}}) {\n          shares\n          account_id\n          account {\n            image\n            label\n          }\n        }\n      }\n    }\n  }\n": types.GetTriplesWithMyPositionDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetTriplesWithMyPosition($predicateId: numeric!, $subjectId: numeric!, $address: String) {\n    triples(\n      where: {predicate_id: {_eq: $predicateId}, subject_id: {_eq: $subjectId}}\n      order_by: [{vault: {position_count: desc}, counter_vault: {position_count: desc}}]\n    ) {\n      id\n      object {\n        label\n        value {\n          thing {\n            name\n            description\n          }\n        }\n      }\n      vault {\n        id\n        position_count\n        positions(limit: 10, where: {account_id: {_neq: $address}}) {\n          account_id\n          account {\n            image\n            label\n          }\n        }\n        myPosition: positions(limit: 1, where: {account_id: {_eq: $address}}) {\n          shares\n          account_id\n          account {\n            image\n            label\n          }\n        }\n      }\n      counter_vault {\n        id\n        position_count\n        positions(limit: 10, where: {account_id: {_neq: $address}}) {\n          account_id\n          account {\n            image\n            label\n          }\n        }\n        myPosition: positions(limit: 1, where: {account_id: {_eq: $address}}) {\n          shares\n          account_id\n          account {\n            image\n            label\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTriplesWithMyPosition($predicateId: numeric!, $subjectId: numeric!, $address: String) {\n    triples(\n      where: {predicate_id: {_eq: $predicateId}, subject_id: {_eq: $subjectId}}\n      order_by: [{vault: {position_count: desc}, counter_vault: {position_count: desc}}]\n    ) {\n      id\n      object {\n        label\n        value {\n          thing {\n            name\n            description\n          }\n        }\n      }\n      vault {\n        id\n        position_count\n        positions(limit: 10, where: {account_id: {_neq: $address}}) {\n          account_id\n          account {\n            image\n            label\n          }\n        }\n        myPosition: positions(limit: 1, where: {account_id: {_eq: $address}}) {\n          shares\n          account_id\n          account {\n            image\n            label\n          }\n        }\n      }\n      counter_vault {\n        id\n        position_count\n        positions(limit: 10, where: {account_id: {_neq: $address}}) {\n          account_id\n          account {\n            image\n            label\n          }\n        }\n        myPosition: positions(limit: 1, where: {account_id: {_eq: $address}}) {\n          shares\n          account_id\n          account {\n            image\n            label\n          }\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;