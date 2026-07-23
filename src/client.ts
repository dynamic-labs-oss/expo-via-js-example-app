import './polyfills';

import { createDynamicClient } from '@dynamic-labs-sdk/client';
import { addEvmExtension } from '@dynamic-labs-sdk/evm';

const environmentId = process.env.EXPO_PUBLIC_DYNAMIC_ENVIRONMENT_ID;
const apiBaseUrl = process.env.EXPO_PUBLIC_DYNAMIC_API_BASE_URL;
const universalLink =
  process.env.EXPO_PUBLIC_DYNAMIC_UNIVERSAL_LINK ?? 'https://example.com';

if (!environmentId) {
  throw new Error(
    'EXPO_PUBLIC_DYNAMIC_ENVIRONMENT_ID is required. Copy .env.example to .env and set your Dynamic Environment ID.'
  );
}

const coreConfig = apiBaseUrl ? { apiBaseUrl } : undefined;

export const client = createDynamicClient({
  coreConfig,
  environmentId,
  logLevel: 'debug',
  metadata: {
    name: 'Expo via JS Example',
    nativeLink: 'expoviajs://',
    universalLink,
  },
});

addEvmExtension(client);
