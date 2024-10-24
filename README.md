# teller-connect-react

[React](https://facebook.github.io/react/) hook and component for integrating
with [Teller Connect](http://teller.io/docs/guides/connect)

### Compatibility

React 18.2+

### Install

With `npm`:

```
npm install --save teller-connect-react
```

With `yarn`

```
yarn add teller-connect-react
```

## Documentation

Please refer to the [Teller Connect Guide](http://teller.io/docs/guides/connect)
to learn more about Teller Connect 

## Examples

See the [examples folder](examples) for complete source code examples using both the `useTellerConnect` hook and the `<TellerConnect />` component.

## Using React hooks

Hooks are the recommended method of integrating with Teller Connect in React.

ℹ️ See a how to use the `userTellerConnect` hook in hook source code example ([examples/hooks.tsx](examples/hooks.tsx))

```tsx
import { useTellerConnect } from 'teller-connect-react';

// ...

const { open, ready } = useTellerConnect({
  applicationId: "YOUR_APPLICATION_ID",
  onSuccess: (authorization) => {
    // Save your access token here
  },
});

return (
  <button onClick={() => open()} disabled={!ready}>
    Connect a bank account
  </button>
);
```

### Available configuration options

ℹ️ See [src/types/index.ts][types] for exported types.

The [Teller Connect Guide](http://teller.io/docs/guides/connect) remains the canonical reference of Teller Connect's capabilities and supported configurations.

### Presenting Teller Connect without user interaction

To present Teller Connect without any user interaction, e.g. immediately when your view is rendered
you can use an effect.

```tsx
import { useTellerConnect } from 'teller-connect-react';

// ...

const { open, ready } = useTellerConnect(config);

// Present Teller Connect immediately on load
React.useEffect(() => {
  if (ready) {
    open();
  }
}, [ready, open]);

return <></>;
```
## Using the pre-built component instead of the useTellerConnect hook

Although the `useTellerConnect` hook is the recommended integration method
a pre-built component is made available if you're unable to use hooks in
your application.

ℹ️ See the example at [examples/component.tsx](examples/component.tsx)

```tsx
import { TellerConnect } from "teller-connect-react";

const App extends React.Component {
  // ...
  render() {
    return (
      <TellerConnect
        className="CustomButton"
        style={{ padding: '20px', fontSize: '16px', cursor: 'pointer' }}
        applicationId={this.state.applicationId}
        onSuccess={this.onSuccess}
        onEvent={this.onEvent}
        onExit={this.onExit}
      >
        Link your bank account
      </TellerConnect>
    );
  }
}
```

## Typescript support

TypeScript definitions for `teller-connect-react` are built into the npm package.

[types]: https://github.com/tellerhq/teller-connect-react/blob/master/src/types/index.ts
