# Dynamic JavaScript SDK — Expo / React Native example app

A minimal Expo + React Native reference app that uses the [Dynamic](https://www.dynamic.xyz/) headless JavaScript SDK (`@dynamic-labs-sdk/*`) for authentication, embedded wallets, and message signing.

## Requirements

- Node.js **18.18+**
- A Dynamic project and **Environment ID** from the [Dynamic dashboard](https://app.dynamic.xyz/)
- Expo SDK 54 compatible environment (this app uses a **development build** because it depends on native modules; Expo Go is not supported)

## Quick start

```bash
npm install
cp .env.example .env
```

Edit `.env` and set `EXPO_PUBLIC_DYNAMIC_ENVIRONMENT_ID` to your Environment ID. If you want to use WaaS embedded wallets, also set `EXPO_PUBLIC_DYNAMIC_UNIVERSAL_LINK` to a domain you control and add it in your Dynamic dashboard.

Prebuild the native projects:

```bash
npx expo prebuild --clean
```

Run on iOS or Android:

```bash
npm run ios
# or
npm run android
```

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `EXPO_PUBLIC_DYNAMIC_ENVIRONMENT_ID` | Yes | Your Dynamic Environment ID |
| `EXPO_PUBLIC_DYNAMIC_UNIVERSAL_LINK` | No* | HTTPS origin used by WaaS iframe and deep links. Required for embedded wallet creation/signing. |
| `EXPO_PUBLIC_DYNAMIC_API_BASE_URL` | No | Override the Dynamic API base URL. Defaults to production. |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run start` | Start the Expo dev server (development build) |
| `npm run ios` | Build and run on iOS simulator/device |
| `npm run android` | Build and run on Android emulator/device |
| `npm run web` | Run the app in a web browser |
| `npm run lint` | Run ESLint |
| `npm run prebuild` | Regenerate native iOS/Android projects |

## What this app demonstrates

- Initializing a `DynamicClient` with the headless JS SDK.
- Email OTP authentication (`sendEmailOTP` / `verifyOTP`).
- Reading reactive SDK state in React Native.
- Creating an EVM embedded wallet with WaaS.
- Signing a message with the embedded wallet.
- Logging out.

## Documentation

- [Dynamic docs](https://docs.dynamic.xyz/)
- JavaScript SDK packages are published under the `@dynamic-labs-sdk` scope on npm.

## License

MIT — see [LICENSE](./LICENSE).
