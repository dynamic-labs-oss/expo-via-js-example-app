/**
 * Polyfills for React Native's Hermes engine.
 *
 * Imported at the top of the app entry point before any SDK modules are loaded.
 * WalletConnect's official RN compat layer installs Buffer, crypto.getRandomValues,
 * TextEncoder, URL, and btoa/atob, which the SDK's blockchain code depends on at
 * module evaluation time.
 */
import '@walletconnect/react-native-compat';

/**
 * Missing crypto polyfills.
 */
import { randomUUID } from 'expo-crypto';

if (!global.crypto) {
  // @ts-expect-error — partial Crypto implementation
  global.crypto = {};
}
if (!global.crypto.randomUUID) {
  // @ts-expect-error — partial Crypto implementation
  global.crypto.randomUUID = randomUUID;
}

/**
 * window.location polyfill for the Dynamic WaaS (embedded wallet) client.
 *
 * The WaaS client reads `window.location.origin` to set the `hostOrigin` query
 * param on the WaaS page it loads inside the SDK's native WebView. React Native
 * has no `window.location`, so without this the client throws when an embedded
 * wallet is used.
 */
type MinimalLocation = {
  origin: string;
  href: string;
  protocol: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
};

const globalWithLocation = globalThis as typeof globalThis & {
  location?: MinimalLocation;
};

if (!globalWithLocation.location) {
  // @ts-expect-error — partial Location implementation
  globalWithLocation.location = {
    origin: 'http://localhost:8081',
    href: 'http://localhost:8081/',
    protocol: 'http:',
    host: 'localhost:8081',
    hostname: 'localhost',
    port: '8081',
    pathname: '/',
    search: '',
    hash: '',
  };
}
