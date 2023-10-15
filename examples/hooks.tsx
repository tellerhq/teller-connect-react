import React, { useCallback, useState } from 'react';

import {
  useTellerConnect,
  TellerConnectOnSuccess,
  TellerConnectOnEvent,
  TellerConnectOnExit,
  TellerConnectOptions,
} from 'teller-connect-react';

const TellerConnect = () => {
  const appId = 'your_app_id';
  const onSuccess = useCallback<TellerConnectOnSuccess>((authorization) => {
    // send public_token to your server
    // https://teller.io/docs/api/tokens/#token-exchange-flow
    console.log(authorization);
  }, []);
  const onEvent = useCallback<TellerConnectOnEvent>((name, data) => {
    console.log(name, data);
  }, []);
  const onExit = useCallback<TellerConnectOnExit>(() => {
    console.log("TellerConnect was dismissed by user");
  }, []);

  const config: TellerConnectOptions = {
    appId,
    onSuccess,
    onEvent,
    onExit,
  };

  const {
    open,
    ready,
  } = useTellerConnect(config);

  return (
    <button onClick={() => open()} disabled={!ready}>
      Connect a bank account
    </button>
  );
};

export default TellerConnect;
