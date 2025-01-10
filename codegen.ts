import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://dev.base-sepolia.intuition-api.com/v1/graphql',
  documents: ['./**/*.{ts,tsx}'],
  generates: {
    './generated/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;
